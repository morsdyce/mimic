import { Mock, DEFAULT_RESPONSE } from 'api/models/mock'
import { Group } from 'api/models/group'
import forEach from 'lodash/forEach';
import cloneDeep from 'lodash/cloneDeep';
import reduce from 'lodash/reduce';
import get from 'lodash/get';
import find from 'lodash/find';
import min from 'lodash/min';

class SwaggerTransformer {
  static typeDefault(param) {
    switch (param.type) {
      case 'array':
        return [this.typeDefault(param.items)];
      case 'integer':
      case 'number':
        return 0;
      case 'boolean':
        return true;
      default:
        return 'string';
    }
  }

  schemaParams(schema) {
    if ('items' in schema) {
      return [this.schemaParams(schema.items)];
    } else if ('additionalProperties' in schema) {
      return [this.schemaParams(schema.additionalProperties)];
    } else if ('$ref' in schema) {
      return this.recursivelyGetSchema(schema)
    } else if ('type' in schema) {
      return SwaggerTransformer.typeDefault(schema);
    }
    throw new Error('invalid JSON schema');
  }

  recursivelyGetSchema(schema) {
    const ref = schema.$ref;
    const properties = get(this.data, ref.split('/').slice(1)).properties;

    forEach(properties, (value, prop) => {
      if (typeof (value) === 'object') {
        if (typeof (value) === 'object' && '$ref' in value) {
          properties[prop] = this.schemaParams(value)
        } else {
          properties[prop] = value.example ||
          SwaggerTransformer.typeDefault(value)
        }

      }
    })
    return properties;
  }

  // Swagger supports multiple group association per method,
  // but Mimic only supports 1, so for now just pick one of them
  findGroupId(tags) {
    return find(this.groups, group => group.name === tags[0]).id
  }

  transform(data) {

    const {host, paths, tags} = this.data = data;

    this.groups = reduce(tags, (groupsSoFar, tag) => {
      groupsSoFar.push(new Group(tag));
      return groupsSoFar;
    }, []);

    this.mocks = []
    forEach(paths, (pathProps, path) => {
      forEach(pathProps, (methodProps, method) => {
        const {parameters} = methodProps;
        let params = [];

        forEach(parameters, (param) => {
          if ('schema' in param) {
            params = this.schemaParams(param.schema);
          } else {
            params.push({
              [param.name]: this.schemaParams(param)
            })
          }

        })


        const url = host + path;
        const smallestStatus = min(Object.keys(methodProps.responses));

        forEach(methodProps.responses, (resp, status) => {
          this.mocks.push(
            new Mock({
              active: status === smallestStatus,
              groupId: this.findGroupId(methodProps.tags),
              method: method.toUpperCase(),
              url,
              headers: resp.headers,
              params,
              response: Object.assign(cloneDeep(DEFAULT_RESPONSE), {
                status,
                body: ('schema' in resp) ? this.schemaParams(resp.schema) : resp.description
              }),
              name: methodProps.operationId + status,
              origin: url,
            }))

        }
        )
      })
    })
    return {
      groups: this.groups,
      mocks: this.mocks,
      version: 2.0
    }
  }
}

class Transformer {
  constructor(source) {
    if (source === 'swagger') {
      this.transformer = new SwaggerTransformer();
    } else {
      throw new Error('format not supported')
    }
  }

  toMimic(data) {
    return this.transformer.transform(data)
  }
}

export default Transformer;

function transformFormData(body) {
  return body.entries.map(([type, content]) => content.name).toString();
}

export function normalizeFormData(request) {
  if (request.body instanceof FormData) {
    return {
      ...request,
      body: transformFormData(request.body)
    };
  }

  if (request.params instanceof FormData) {
    return {
      ...request,
      params: transformFormData(request.params)
    };
  }

  return request;
}

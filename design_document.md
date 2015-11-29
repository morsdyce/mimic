- [Purpose](#purpose)
- [Installation Guidelines](#installation-guidelines)
- [Browser Support](#browser-support)
- [Feature Breakdown](#feature-breakdown)
	- [Tracking XHR Requests](#tracking-xhr-requests)
	- [Add Mock Rule](#add-mock-rule)
	- [Selecting an active mock rule](#selecting-an-active-mock-rule)
	- [Edit a mock rule](#edit-a-mock-rule)
	- [Grouping rules with mock sets](#grouping-rules-with-mock-sets)
	- [Setting the active mock set](#setting-the-active-mock-set)
	- [Export](#export)
	- [Import](#import)
    - [Nice to have](#nice-to-have)
	    - [Automatic recording of rules](#automatic-recording-of-rules)
	    - [Change history](#change-history)
      - [Unit and E2E test helpers](#unit-and-e2e-test-helpers)

## Purpose

A library to mock XHR requests on demand by configuration via a user interface or programmatically via an api in
order to streamline development of frontend applications regardless of the application framework being used.


## Installation guidelines
The library should have only a single point of entry in which it will include all of its resources such as
javascript, stylesheets and additional assets.

As well as zero configuration setup.

## Browser Support
The library should work in the following browsers:

- IE 9+
- Edge
- Chrome/Chrome Mobile
- Firefox
- Safari/Safari Mobile
- Opera


# Feature Breakdown

## Tracking XHR Requests

Keep track of XHR requests of the installed application and create an api to list all XHR requests that were tracked.
Whenever an XHR request occures in the application shredderjs should capture it and save the following details:

1. Method
1. URL
1. Response Data
1. Status Code


## Add Mock Rule

A user should be able to add an XHR request which shredderjs will override.
Initially the following parameters will be provided:

1. URL
1. Method
1. Status Code
1. Delay
1. Response Data
1. Response Headers
1. Request Parameters
1. Active

In addition an Id field will also be generated with GUID identifier in order to prevent conflicts between rules.

Whenever an XHR is requested with the correct parameters (URL, Method, Parameters) it should catch the request and return a fake response
with the given parameters (Status Code, Delay, Response Data).

A user can add multiple mocks for the same URL aslong as the mock key is different.

The mock key should be composed from the following parameters:
1. Method
1. URL
1. Parameter keys

When a mock is created it should be set to active by default.

## Selecting an active mock rule

If there is more than 1 mock per URL and method the user should be able to set the currently active mock.
In this case only the active mock should run and there could only be 1 active mock per URL/method combination.

## Edit a mock rule

A user should be able to apply changes to an existing mock by providing the mock id and an override object.
If the object does not contain a field the current value should be retained.

## Grouping rules with mock sets

A given mock can be associated to a set of mocks that are related to a certain use case.
A user should be able to:

1. Name the mock set (scenario)
1. Add a mock to the mock set by mock id
1. Remove a mock from the mock set by mock id
1. List all mocks that are registered in the mock set
1. Enable or disable the mock set

In addition an Id field will also be generated with GUID identifier in order to prevent conflicts between rules.

Only 1 mock set can be active at a time, if you enable a mock set all other mock sets should be disabled automatically.


## Setting the active mock set

A user should be able to activate an existing mock set, if there is already an active mock set it should disable
the active mock set and enable the new mock set.

When a mock set is set to active all mock rules should be set to disabled and only the rules referenced in the mock set
should be set to active.

## Export

A user should have the ability to export all the current configured data into a JSON formatted file in order to share configurations.
Export should serialize the mock rules and the mock sets separatly, mock sets will only contain a reference to a rule and not the entire rule data.

An initial structure might look like this:
```
{
  version: 1,
  scenarios: [
    {
      id: '218efaac-66a3-90bc-110f-b87182ce27fa',
      name: 'My awesome scenario',
      enabled: true,
      rules: [
        {
          id: '033ec4b7-1851-4fd2-84a0-2a6f55e1474f',
          active: true,
          request: {
            method: 'GET',
            url: 'http://www.google.com',
            parameters: {},
            headers: {},
          },
          response: {
            statusCode: 200,
            delay: 0,
            body: 'Woop woop',
            headers: {}
          }
        },
        {
          id: 'ae44f1d7-e8d3-4e8e-b01a-7e622be9f2a9',
          active: false,
          request: {
            method: 'POST',
            url: 'http://www.google.com/search',
            parameters: {
              token: 'some post query'
            },
            headers: {}
          },
          response: {
            statusCode: 200,
            delay: 0,
            body: 'Gotcha',
            headers: {}
          }
        }
      ]
    }
  ]
}
```

A user may export via 2 different methods:

1. File based, download a JSON file to send to a user or commit to a repo
1. GitHub Gist based, create an online gist with the mock data and show the user a link to the mock

## Import

A user should be able to import existing configurations from other users via 3 methods

1. Paste the configuration in the UI import editor
2. Upload a downloaded JSON file
3. Provide a GitHub Gist link

If the imported configuration contains conflicts between the currently saved rules and the imported rules
the user should be asked if he wants to override the rules/sets and display which rules/sets are being overriden.

# Nice to have

## Automatic recording of rules

A user should have the ability to start a recording session that will save all the server responses as they returned as
new mock rules.

In the start of a recording a user should be given an option to record as a new scenario, add to an existing scenario
or record unassociated rules.

Bonus option: The recording should be able to persist via page refreshes

## Change history

A user should be able to see the history of changes of each rule/set and opt to restore to that point in time.

## Unit and E2E test helpers

A user could use special test helpers to load configurations from local files/urls and define the active rules or rule set.

# Post Release Features

## Dynamic mocks

A user should have the ability to use a templating language defined by Shredder to allow using Parameters/Headers/Random generated data in mocked responses.

As well as defining conditional blocks to change responses

for example:

```
{
  id: ${ random.id() }
  user: ${params.name},
  <if condition="params.name === 'joe'>
    role: "admin"
  </if>
  <else>
    role: "user"
  </else>
}
```

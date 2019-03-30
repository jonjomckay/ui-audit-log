Audit Log
=========

This is a set of components that create a searchable, filterable audit log from a tenant's metrics events.

## Requirements

* Engine running locally, using the `CORE-4574` branch
* Metrics running locally, using the `CORE-5171` branch

## Running

1. Configure a user token in `.env.local` (based on the provided `.env.dist`)
1. `yarn install`
1. `yarn start`

## License

This is released under the MIT License, and intended to be integrated into the Flow tooling in the future.

# Haystack Seed

This repo stores demo data and can push it to a Haystack API.

It was used to populate a Haxall server for my Grafana Haystack Plugin presentation at Haystack Connect 2023.

## Usage

First start up a Haystack API. If you don't already have one, [here is a docker image](https://hub.docker.com/repository/docker/needleinajaystack/haxall/general) that can start a local Haxall instance.

To provide credentials, create a `.env` folder in this directory that sets the `HAYSTACK_URL`, 
`HAYSTACK_USERNAME`, and `HAYSTACK_PASSWORD` environment variables. For example:

```
HAYSTACK_URL=http://localhost:8080/api/
HAYSTACK_USERNAME=su
HAYSTACK_PASSWORD=su
```

Next, edit the `haystack-seed.go` file to perform the operations you'd like in the `main` 
function, and run it:

```bash
go run haystack-seed.go
```

A CLI is on the list of priorities!

## Data

- `folio`: These are trio files that may be imported into the Folio database
  - `alpha.trio`: This was sourced from the
[Project Haystack Examples page](https://project-haystack.org/example/alpha)
- `his`: These are zinc files that may be imported into the history database

## Haxall History Storage

History in Haxall is stored using a circular in-memory buffer. Some important things to note
about this approach:

1. History data is purged when the Haxall process is stopped
2. There is a high-limit on history storage, after which historical data is 
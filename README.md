# GTFS Checker

## Description

The tool verifies translated names in the chosen language for the specified environment.
If the test is successful, you will send a success message in the Slack channel.
If the test fails, you will send a failure message and also attach a JSON file containing the incorrect results.

## Requirements

1. ENV file or pass a parameter to the flag `--auth=xxxxxxxxx` instead of using the file.
2. NODE version v20.12.2 or higher (`node -v`).

## Installation

run npm i to install a package and any packages that it depends on.

Run the command `npm i` in the destination folder\
to install a package and any packages that it depends on.

```
npm i or npm install
```

## Parameters

### Required fields

The environment in which we will conduct the test is listed below:\
dev | stg | prod\
e.g. `node gtfs --env=dev`

### Optional fields

-h or --help\
If the flag is added, you will receive a list of parameters that can be passed to the command as described below.\
e.g. `node gtfs -h` or `node gtfs --help`

--auth\
If a local file doesn't contain an authorization,\
you need to add a field to the command in the following format:\
e.g. `node gtfs --env=dev --auth=xxxxx`. \
Please replace 'xxxxx' with your unique authorization number.

--service\
This parameter can be passed to test a single service\
If only one service is selected, a message with the results will not be sent to Slack.\
(When you pass -h or --help to a command, a list of services represented by numbers is displayed)\
e.g. `node gtfs --env=dev --service=0`.

## Usage

```
# print gtfs command line options
node gtfs -h
```

```
# basic use on the dev
node gtfs --env=dev
```

```
# using with authorization on the dev
node gtfs --env=dev --auth=xxxxx
```

```
# using a single service on the dev
node gtfs --env=dev --service=1
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

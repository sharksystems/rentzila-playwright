# rentzila-playwright

## Summary

This repository contains automated tests for the Rentzila website. The tests are written using the Playwright framework on TypeScript.

## Requirements

- Node.js v20.0 or higher (LTS recommended)

## Steps to Install

1. Clone the repository or go to Code > Download ZIP
   
2. Set up environment and install dependencies:
   
 ```
 npm install
 ```
3. Set up .env file. The structure of the file is specified in the ```.env.example``` file. For the actual credentials you can contact me.

## Running tests

```npm run test```

Running in the trace viewer or in headed mode:

```npm run test:ui```

```npm run test:headed```

Note: The tests are configured to run on Chrome only due to the website having issues on other browsers.
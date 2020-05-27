# npm-typescript-version-provider
Injects the version from packages.json as a property into a typescript class.

## Installation

``yarn install @progresso/npm-typescript-version-provider``

## Usage

### Prepare a typescript class that contains a version line in this format:

 ``public get version(): string { return '1.0.0'; }``

Examle:

    export class AppService {
      public get version(): string { return '1.0.0'; }
    }

### Add a script entry to your ``package.json`` file:

 ``"inject-version": npm-typescript-version-provider <path-to-your-class-file> <incremental-options>"``

 Example:

    "scripts": {
      ...
      "inject-version": "npm-typescript-version-provider /src/services/appService.ts increment"
      ...
    }

This example extracts the version from the package.json file and increments the build number by either appending ``+0`` to the version core or by incrementing the build number (see https://semver.org/ for more info on Semantic Versioning).
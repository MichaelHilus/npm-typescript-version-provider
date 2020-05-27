import * as fs from 'fs';

import { PathCreator } from './pathCreator';
import { ArgsHandler } from './argsHandler';
import { VersionLoader } from './versionLoader';
import { VersionInjector } from './versionInjector';
import { VersionSaver } from './versionSaver';
import { VersionIncrementor } from './versionIncrementor';

function provide() {
    const argsHandler = new ArgsHandler(process.argv);
    const validationResult = argsHandler.validate();
    if (!validationResult.isValid) {
        console.log(validationResult.errorMessage);
        return;
    }

    const classPath = new PathCreator().getAbsolutePath(argsHandler.args[0]);
    const shouldIncrement = argsHandler.args[1] === 'increment';

    if (!fs.existsSync(classPath)) {
        console.log(`Error: file ${classPath} was not found. Please create a typescript class first.`);
        return;
    }

    const version = new VersionLoader().version;

    const versionInjector = new VersionInjector(version, classPath, shouldIncrement);
    versionInjector.inject();

    if (shouldIncrement) {
        new VersionSaver(new VersionIncrementor(version).increment()).save();
    }
}

provide();
import * as fs from 'fs';

import { PathCreator } from './pathCreator';

export class VersionLoader {
    private _path: string;

    constructor() {
       this._path = new PathCreator().getAbsolutePath('/package.json');
    }

    public get version(): string {
        const content = fs.readFileSync(this._path, 'utf8');
        const config = JSON.parse(content) as { version: string };

        return config.version;
    }
}
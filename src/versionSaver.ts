import * as fs from 'fs';
import * as os from 'os';

import { PathCreator } from './pathCreator';

export class VersionSaver {
    private _path: string;

    constructor(private _version: string) {
       this._path = new PathCreator().getAbsolutePath('/package.json');
    }

    private get _line() {
        return `${os.EOL}  "version": "${this._version}",`;
    }

    public save(): void {
        const content = fs.readFileSync(this._path, 'utf-8');
        const modifiedContent = this.replaceVersionLine(content);
        fs.writeFileSync(this._path, modifiedContent);
    }

    private replaceVersionLine(content: string): string {
        const existingIndex = content.indexOf('"version": ');

        if (existingIndex < 0) {
            throw Error('there is no version property in your package.json');
        }

        const lineStart = content.substring(0, existingIndex).lastIndexOf(os.EOL);
        const lineEnd = existingIndex + content.substring(existingIndex).indexOf(os.EOL);
        const newContent = content.substring(0, lineStart) + this._line + content.substring(lineEnd);

        return newContent;
    }
}
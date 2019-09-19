import * as fs from 'fs';

export class VersionInjector {
    constructor( private _version: string, private _classPath: string) {
    }

    private get _line() {
        return `\n  public get version(): string { return '${this._version}'; }`;
    }

    public inject(): void {
        const content = fs.readFileSync(this._classPath, 'utf-8');

        let modifiedContent: string;
        modifiedContent = this.replaceLine(content);
        if (modifiedContent == null) {
            modifiedContent = this.insertLine(content);
        }

        fs.writeFileSync(this._classPath, modifiedContent);
    }

    private replaceLine(content: string): string {
        const existingIndex = content.indexOf('get version()');

        if (existingIndex < 0) {
            return null;
        }

        const lineStart = content.substring(0, existingIndex).lastIndexOf('\n');
        const lineEnd = existingIndex + content.substring(existingIndex).indexOf('\n');
        const newContent = content.substring(0, lineStart) + this._line + content.substring(lineEnd);

        return newContent;
    }

    private insertLine(content: string): string {
        const lastBraceIndex = content.lastIndexOf('}');
        const newContent = content.substring(0, lastBraceIndex) + this._line + '\n' + content.substring(lastBraceIndex);

        return newContent;
    }
}
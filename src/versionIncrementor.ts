
export class VersionIncrementor {
    constructor(private _version: string) {
    }

    public increment(): string {
        const version = this._version;

        if (!version.includes('+')) {
            return this.performInitialization();
        }

        return this.performIncrementation();
    }

    private performInitialization(): string {
        return `${this._version}+0`
    }

    private performIncrementation(): string {
        const components = this._version.split('+');
        let versionNumber = Number(components[1]);
        versionNumber++;

        if (Number.isNaN(versionNumber)) {
            versionNumber = 0;
        }

        return `${components[0]}+${versionNumber}`;
    }
}
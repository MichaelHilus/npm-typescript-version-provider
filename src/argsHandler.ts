
interface ValidationResult { isValid: boolean, errorMessage?: string }

export class ArgsHandler {
    private _args: string[];

    constructor(args: string[]) {
        this._args = args.slice(2);
    }

    public get args(): string[] {
        return this._args;
    }

    public validate(): ValidationResult {
        const result: ValidationResult = {
            isValid: true
        }

        if (this._args.length < 2) {
            result.isValid = false;
            result.errorMessage = 'Error: too few arguments. Specify target injection class and whether the version should be incremented.\nExample: npm-typescript-version-provider /src/services/app-info.ts increment';
        }

        return result;
    }
}
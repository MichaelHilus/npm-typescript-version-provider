import { join } from 'path';

export class PathCreator {
    private basePath: string;
    constructor() {
        this.basePath = process.cwd();
    }

    getAbsolutePath(relativePath: string): string {
        return join(this.basePath, relativePath);
    }
}
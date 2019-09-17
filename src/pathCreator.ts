import { join } from 'path';

export function createAbsolutePath(relativePath: string): string {
    const basePath = process.cwd();

    return join(basePath, relativePath);
}
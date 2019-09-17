import { createAbsolutePath } from './pathCreator';

class Provider {
    public get message(): string {
        return 'This is typescript.';
    }
}

console.log(new Provider().message);
console.log(`path: ${createAbsolutePath('/src/services/info-service.ts')}`)
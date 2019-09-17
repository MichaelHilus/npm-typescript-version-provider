
class Provider {
    public get message(): string {
        return 'This is typescript.';
    }
}

console.log(new Provider().message);
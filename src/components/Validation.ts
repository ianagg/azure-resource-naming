export class Validation {
    public resourceId: string | undefined;
    public joinChar: string;
    public regex: string | undefined;
    public minLength: number;
    public maxLength: number;
    public startChar: string | undefined;
    public endChar: string | undefined;
    public errors: string[];

    constructor() {
        this.minLength = 0;
        this.maxLength = 500;
        this.errors = [];
        this.joinChar = '';
    }
}
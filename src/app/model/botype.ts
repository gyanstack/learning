export class BOType {
    public id: number;
    public type: string;
    public isRuleDefined: string;
    public isSelected: boolean;

    constructor(obj?: any) {
        if (obj != null) {
            this.id = obj.id;
            this.type = obj.type;
            this.isRuleDefined = obj.isRuleDefined;
            this.isSelected = true;
        }
    }
}

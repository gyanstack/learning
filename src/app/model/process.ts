export interface Process {
    id: number;
    parentId?: number;
    name: string;
    lowSLA: number;
    averageSLA: number;
    highSLA: number;
    weight: number;
    children: Process[];
    isFieldExpanded: boolean;
    isSelected: boolean;
    isActive: boolean;
    createdOn: number;
    isEAPRuleAssociated: boolean;
    // toggle();
    // getIcon(): string;
}

export class ProcessInfo implements Process {

    public id: number;
    public parentId?: number;
    public name: string;
    public lowSLA: number;
    public averageSLA: number;
    public highSLA: number;
    public weight: number;
    public children: Array<Process>;
    public isFieldExpanded: boolean;
    public isSelected: boolean;
    public isActive: boolean;
    public createdOn: number;
    public isEAPRuleAssociated: boolean;

    public toggle() {
        this.isFieldExpanded = !this.isFieldExpanded;
    }

    constructor(obj?: any) {
        if (obj != null) {
            this.id = obj.id;
            this.parentId = obj.parentId;
            this.name = obj.name;
            this.lowSLA = obj.lowSLA;
            this.averageSLA = obj.averageSLA;
            this.highSLA = obj.highSLA;
            this.weight = obj.weight;
            this.isFieldExpanded = false;
            this.isSelected = false;
            this.isActive = true;
            this.isEAPRuleAssociated = obj.isEAPRuleAssociated;
            if (obj.children) {
                this.children = obj.children.map((c) => {
                    return new ProcessInfo(c);
                });
            }
            this.createdOn = obj.createdOn;
        }
    }
}

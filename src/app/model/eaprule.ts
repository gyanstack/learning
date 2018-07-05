export interface EapRule {
    id: number;
    name: string;
    type: string;
    guided: any;
    advance: string;
    activityId: number;
    activityName: string;
    isStarted: boolean;
    isCompleted: boolean;
}

import { Group } from './Group';

export interface Project {
    id: number;
    projectNumber: string;
    name: string;
    customer: string;
    group: Group;
    members: Array<string>;
    status: string;
    startDate: Date;
    endDate: Date;
    selected: boolean;
}

export interface ProjectStatus {
    key: string;
    label: string;
}

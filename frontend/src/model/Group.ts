import { Employee } from './Employee';

export interface Group {
    id: number;
    name: string;
    leader: Employee;
    selected: boolean;
}

export interface GroupError {
    name: string;
    leader: string;
}

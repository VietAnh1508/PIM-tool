export interface Employee {
    id: number;
    visa: string;
    firstName: string;
    lastName: string;
    birthDate?: Date;
    selected: boolean;
}

export interface EmployeeError {
    visa: string;
    firstName: string;
    lastName: string;
}
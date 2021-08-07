import { Leader } from './Leader';

export interface Group {
    id: number;
    name: string;
    leader: Leader;
    selected: boolean;
}

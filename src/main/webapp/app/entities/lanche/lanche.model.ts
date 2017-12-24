import { BaseEntity } from './../../shared';

export class Lanche implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public items?: BaseEntity[],
    ) {
    }
}

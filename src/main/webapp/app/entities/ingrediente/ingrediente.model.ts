import { BaseEntity } from './../../shared';

export class Ingrediente implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public valor?: number,
        public itemId?: number,
    ) {
    }
}

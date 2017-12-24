import { BaseEntity } from './../../shared';

export class Item implements BaseEntity {
    constructor(
        public id?: number,
        public quantidade?: number,
        public ingredientes?: BaseEntity[],
        public lancheId?: number,
    ) {
    }
}

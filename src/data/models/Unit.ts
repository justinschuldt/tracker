export interface IUnit {
    id?: number
    timestamp: string
    name: string
}

export class Unit {
    id?: number
    timestamp: string
    name: string
    constructor(name: string, id?: number, timestamp?: string) {
        this.name = name // will always have this prop, instantiating an existing or new row.

        if (id) this.id = id; // if existing data
        if (timestamp) {
            this.timestamp = timestamp // if existing data
        } else {
            this.timestamp = new Date().toISOString() // if new data
        }
    }
    // is it necessary to override save, since we dont dont need any
    // async stuff, can do it all in the constructor?
}
import { TrackerDatabase } from '../local-db'

export interface IUnit {
    id?: number
    timestamp: string
    name: string
}

export class Unit {
    id?: number
    timestamp: string
    name: string
    constructor(name: string, timestamp?: string, id?: number) {

        this.name = name // will always have this prop, instantiating an existing or new row.

        if (id) this.id = id; // if existing data
        if (timestamp) {
            this.timestamp = timestamp // if existing data
        } else {
            this.timestamp = new Date().toISOString() // if new data
        }
    }
    // is it necessary to override save, since we dont dont need any
    // async stuff, can do it all in the constructor
    // save() {
    //     return db.transaction('rw', db.units, db.series, db.records, async () => {
    //         console.log('Unit.save() in db.transaction')
    //         // Add or update ourselves
    //         if (!this.timestamp) {
    //             this.timestamp = new Date().toISOString() // if new data
    //         }

    //         this.id = await db.units.put(this);
    //     });
    // }
}

export const findOrCreateUnit = async (db: TrackerDatabase, unitName: string): Promise<number> => {
    // This is a work around
    let unit = await db.units.get({name: unitName})
    if (unit && unit.id) {
        return unit.id
    }
    const iso = new Date().toISOString()
    let newUnitId = await db.units.add({name: unitName, timestamp: iso})
    return newUnitId

  }
  
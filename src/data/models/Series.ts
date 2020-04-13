import { db } from '../local-db'
import { IUnit, Unit } from './Unit'
import { IRecord } from './Record'

export interface ISeries {
    id?: number
    name: string
    timestamp: string
    unitId?: IUnit['id']
}

/* This class that is mapped to the series table.
 * We can have custom helper methods on it that
 * we could call on retrieved database objects.
 * This class is instantiated when users create new objects,
 * and for each row of existing data returned by Dexie.  
 */
export class Series {
    id?: number
    timestamp: string
    name: string
    unitId?: number
    unitName?: string
    unit?: IUnit;   
    records?: IRecord[]
    
    constructor(name: string, unitName?: string, unitId?: number, id?: number, timestamp?: string) {
        // The constructor gets called for new & existing records, so input props need to be generic.
        // This feels weird, to have to handle both use cases with a bunch of `if` statements.
        // Will leave for now and see if the benifit of the class is worth the bad smell.

        this.name = name // will always have this prop, instantiating an existing or new row.

        if (id) this.id = id; // if existing data
        if (unitId) this.unitId = unitId // if existing data
        if (timestamp) {
            this.timestamp = timestamp // if existing data
        } else {
            this.timestamp = new Date().toISOString() // if new data
        }
        if (unitName) this.unitName = unitName // if new data 


        // Making them non-enumerable will prevent them from being handled by
        // indexedDB when doing put() or add().
        // if excuded, will the array save automatically?
        // is this only needed for the this.save() override to work?
        Object.defineProperties(this, {
            records: {value: [], enumerable: false, writable: true },
        });
    }
    
    // helper method to fetch all the related data
    async loadSeriesData(): Promise<IRecord[]> {
        if (!this.id || !this.unitId) {
            return []
        }
        [this.unit, this.records] = await Promise.all([
            db.units.where('id').equals(this.unitId).first(),
            db.records.where('seriesId').equals(this.id).toArray() // TODO - order by date
        ]);
        return this.records || []

    }


    // override the DB api's save method to handle the find-or-create of the unit.
    save() {
        return db.transaction('rw', db.units, db.series, db.records, async () => {
            // this is not great. maybe move this logic to the Unit class?
            // make findOrCreate on Unit class?
            // super hacky - FIXME
            let { unitName } = this
            unitName = String(unitName)
            let unitId = this.unitId

            if (!unitId) { // new record, need to find or create Unit
                let unit = await db.units.where('name').equals(unitName).first()
                if (unit) {
                    unitId = unit.id
                } else {
                    let newUnitId = await db.units.add(new Unit(unitName))
                    unitId = newUnitId
                }
                this.unitId = unitId
            }
            // Add or update ourselves
            this.id = await db.series.put({...this, unitId: 1});
        });
    }
}
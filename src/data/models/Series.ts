import { db } from '../local-db'
import { IUnit } from './Unit'
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
    unitId?: number
    unitName?: string
    unit?: IUnit;   
    records?: IRecord[]
    
    constructor(id?: number, unitId?: number) {
        if (id) this.id = id
        if (unitId) this.unitId = unitId
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

}


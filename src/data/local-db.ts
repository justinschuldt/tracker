import Dexie from 'dexie'
import { IUnit, Unit } from './models/Unit'
import { Series, ISeries } from './models/Series'  
import { IRecord } from './models/Record'

export class TrackerDatabase extends Dexie {
  series: Dexie.Table<ISeries, number>;
  units: Dexie.Table<IUnit, number>;
  records: Dexie.Table<IRecord, number>;
  
  constructor() {  
    super("TrackerDatabase");
    
    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      series: '++id, timestamp, name',
      units: '++id, timestamp, name',
      records: '++id, timestamp, seriesId, amount',
    });
    

    // are these even needed?
    this.series = this.table<ISeries, number>("series");
    this.units = this.table("units")
    this.records = this.table("records");

    // are these even needed?
    this.series.mapToClass(Series);
    this.units.mapToClass(Unit)
  }
}

export const db = new TrackerDatabase();

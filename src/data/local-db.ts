import Dexie from 'dexie'
import { IUnit } from './models/Unit'
import { Series, ISeries } from './models/Series'  
import { IRecord } from './models/Record'

export class TrackerDatabase extends Dexie {
  series: Dexie.Table<ISeries, number>;
  units: Dexie.Table<IUnit, number>;
  records: Dexie.Table<IRecord, number>;
  
  constructor() {  
    super("TrackerDatabase");
    console.log('local-db.ts constructor ran')
    
    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      series: '++id, timestamp, name, unitId',
      units: '++id, timestamp, name',
      records: '++id, timestamp, seriesId, amount',
    });
    
    // The following lines are needed for it to work across typescipt using babel-preset-typescript:
    this.series = this.table<ISeries, number>("series");
    this.units = this.table("units")
    // are these even needed?;
    this.records = this.table("records");

     db.series.mapToClass(Series);
  }
}

export const db = new TrackerDatabase();

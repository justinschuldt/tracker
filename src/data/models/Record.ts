import { ISeries } from './Series'

export interface IRecord {
    id?: number
    seriesId: ISeries['id']
    timestamp: string
    amount: string | number
}
import React, { useEffect, useRef } from 'react'
import { ISeries } from '../data/models/Series'
import { IUnit } from '../data/models/Unit'

export interface IOption {
    label: string | JSX.Element
    value: string | number
  }
  
  export function transformToOption({name, id}: ISeries | IUnit): IOption  {
    return {
      label: name, 
      value: Number(id)
    }
  }

  export function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void>();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        if (savedCallback && savedCallback.current) {
            savedCallback.current()
        }
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  export const downloadJsonFile = (title: string, data: any) => {
    const timestamp = new Date().toISOString()
    const fileName = `${title}_${timestamp}.json`;
    const dataBlob = new Blob(
      [JSON.stringify(data,undefined,2)],
      { type:`application/json` }
      ) 
      const a = document.createElement('a');
      a.href = URL.createObjectURL(dataBlob);
      a.download = fileName
      a.click();
  }
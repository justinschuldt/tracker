import React, { Fragment, useState } from 'react'
import { Form, Input } from 'antd'
import { useInterval } from '../Utils'

export const sampleData: [string, string][] = [
    ['running', 'miles'],
    ['coffee consumption', 'cups'],
    ['pushups', 'reps'],
    ['alcohol', 'drinks'],
    ['meditation', 'minutes'],
    ['snacks eaten', 'serving'],
    ['anerobic exercise', 'minutes'],
    ['TV watched', 'hours'],
    ['walking', 'miles'],
]
export const SeriesInput = () => {
    // this component is a form  with two inputs.
    // sets of placeholder values cycle on a regular interval.
    // placeholder values are held in state, cycled by "useInterval" hook.
    const [seriesPlaceholder, setSeriesPlaceholder] = useState<string>(sampleData[0][0])
    const [unitPlaceholder, setUnitPlaceholder] = useState<string>(sampleData[0][1])

    const cyclePlaceholder = (arr: [string, string][]) => {
        const currIndex = arr.findIndex(s => s[0] === seriesPlaceholder)
        const potentialNext = currIndex + 1

        if (potentialNext >= arr.length) {
            // reached end of array, start from beginning
            setSeriesPlaceholder(arr[0][0])
            setUnitPlaceholder(arr[0][1])
            return
        }
        const next = arr[potentialNext]
        setSeriesPlaceholder(next[0])
        setUnitPlaceholder(next[1])
    }

    useInterval(() => {
        cyclePlaceholder(sampleData)
    }, 3000)

    return (
        <Fragment>
            <Form.Item
                name="seriesName"
                rules={[{ required: true, message: 'Please input something' }]}
                style={{ width: 110, margin: '0 8px' }}
            >
                <Input
                    size="small"
                    placeholder={seriesPlaceholder}
                />
            </Form.Item>
            <Form.Item
                name="unitName"
                rules={[{ required: true, message: 'Please input something' }]}
                style={{ width: 90, margin: '0 8px' }}
            >
                <Input
                    size="small"
                    placeholder={unitPlaceholder}
                />
            </Form.Item>
        </Fragment>
    )
}
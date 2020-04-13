import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory, Link } from "react-router-dom"
import { Form, Input, Button, Typography, Spin } from 'antd';
import { db } from '../data/local-db'
import { RecordsDynamicLineChart } from '../components/chart/RecordsDynamicLineChart'
import SeriesSelect from '../components/form/SeriesSelect'
import { Series, ISeries } from '../data/models/Series';
import { IRecord } from '../data/models/Record'

import { UnitSelect } from '../components/form/UnitSelect';
import { ChartDemo } from '../components/chart/ChartDemo';
import { ExportData } from '../components/modal/ExportData';
import { ManageSeries } from '../components/modal/ManageSeries'

const { Title } = Typography

const SeriesDetails = () => {
    const inputEl = useRef<Input>(null);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState()
    const [loading, setLoading] = useState<boolean>(true)
    const [series, setSeries] = useState<ISeries>()
    const [records, setRecords] = useState<IRecord[]>([])
    const [unitName, setUnitName] = useState<string>()
    let { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        setState(id)
    }, [id])

    const setState = async (newId?: string | number) => {
        setRecords([])
        setSeries(undefined)
        setUnitName(undefined)
        setLoading(true)
        forceUpdate({})
        loadSeries(newId)
    }
    const refreshData = () => {
        setState(id)
    }

    const onFinish = async (values: { amount?: string }) => {
        if (!values.amount) {
            return // shouldn't happen. for TS
        }

        const newRecord = {
            seriesId: Number(id),
            timestamp: new Date().toISOString(),
            amount: values.amount
        }
        const recordId = await db.records.add(newRecord)
        const updatedRecords = [...records, { id: recordId, ...newRecord }]
        setRecords(updatedRecords)

        form.resetFields() // clear form
        if (inputEl && inputEl.current) {
            inputEl.current.focus() // set focus on input
        }
    };
    const loadSeries = async (seriesId?: number | string) => {
        let series = await db.series.get(Number(seriesId))
        if (!seriesId || !series) {
            // no seriesId was passed in, see if there is a series to load
            const allSeries = await db.series.toArray()
            if (!allSeries || !allSeries[0]) {
                // nothing to load, send user to landing page
                history.push('/')
            }
            if (allSeries[0] && allSeries[0].id) {
                seriesId = allSeries[0].id
                series = allSeries[0]
                history.push(`/series-details/${seriesId}`)
                setState(seriesId)
            }
            return
        }
        const { id, timestamp, name, unitId } = series
        setSeries(series)
        const seriesClass = new Series(name, undefined, unitId, id, timestamp)
        const fetchedRecords = await seriesClass.loadSeriesData()
        if (seriesClass.unit) {
            setUnitName(seriesClass.unit.name)
        }
        setLoading(false)

        // this is a hack to draw points on the chart one by one.
        // for whatever reason, if you pass the chart a "n > 1" array,
        // subsequent array updates will blow away 
        fetchedRecords.reduce<IRecord[]>((accum, record) => {
            accum = [...accum, record]
            setRecords(accum)
            return accum
        }, [])

        if (inputEl && inputEl.current) {
            inputEl.current.focus()
        }

    }
    const updateSeriesWithUnit = async ({ name, id: unitId }: { name: string, id: number }) => {
        // callback for unit creation.
        // update series with unitId
        await db.series.update(Number(id), { unitId })
        setUnitName(name)
    }

    return (
        <div style={{ marginTop: '8px' }} >
            <Spin spinning={loading} style={{ minHeight: 240 }}>
                <Form
                    form={form}
                    name="new_record"
                    layout="inline"
                    onFinish={onFinish}
                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {series ? (
                            <SeriesSelect width={140} activeSeries={String(series.id)} form={form} />
                        ) : <div style={{ width: 140 }}></div>}
                        {unitName ? (
                            <Form.Item
                                name="amount"
                                rules={[{ required: true, message: 'needs value' }]}
                                style={{ maxWidth: 110, margin: '0 4px' }}
                            >
                                <Input
                                    size="small"
                                    ref={inputEl} // for auto-focus when the page loads
                                    suffix={unitName}
                                />
                            </Form.Item>
                        ) : (
                                <UnitSelect width={110} selectionComplete={updateSeriesWithUnit} />
                            )}
                        <Form.Item
                            shouldUpdate={true}
                            style={{ margin: '0 4px' }}
                        >
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="small"
                                    shape="round"
                                    disabled={
                                        !Boolean(form.getFieldValue('amount')) ||
                                        Boolean(form.getFieldsError().filter(({ errors }) => errors.length).length)
                                    }
                                >
                                    Log
                                </Button>
                            )}
                        </Form.Item>

                    </div>
                    {series ? (
                        <>
                            <Form.Item style={{ margin: '0' }}>
                                <ManageSeries series={series} records={records} onClose={refreshData} />
                            </Form.Item>
                            <Form.Item style={{ margin: '0' }}>
                                <ExportData series={series} records={records} />
                            </Form.Item>
                        </>
                    ) : null}
                </Form>
                <div>
                    {/* if records in state, show. else show placeholder. */}
                    {records && records.length >= 1 ?
                        <div id="overlay-container">
                            <RecordsDynamicLineChart
                                records={records}
                                height={190}
                                width={window.innerWidth}
                                lineColor="rgba(6, 85, 231, .8)" // blue
                            />
                            {records.length === 1 ? (
                                // if there is only one data point,
                                // show an overlay to encourage the user
                                <div id="overlay">
                                    <Typography>
                                        <Title
                                            level={4}
                                            style={{
                                                color: 'rgba(61, 61, 61, .3)',
                                                position: 'relative',
                                                top: 24,
                                                left: 56
                                            }}
                                        >
                                            👈 nice.
                                        </Title>
                                        <Title
                                            level={4}
                                            style={{
                                                color: 'rgba(61, 61, 61, .3)',
                                                position: 'relative',
                                                top: 16,
                                                left: 80
                                            }}
                                        >
                                            add another to see a trend
                                        </Title>
                                    </Typography>
                                </div>
                            ) : null}
                        </div> :
                        <ChartDemo
                            width={window.innerWidth}
                            height={190}
                            lineColor="rgba(61, 61, 61, .3)"
                            overlay={`start your chart ☝!`}
                        />
                    }
                </div>
            </Spin>
        </div>
    )
}
export default SeriesDetails

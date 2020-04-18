import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from "react-router-dom"
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

    const loadAndSetSeries = async (newSeries: ISeries) => {
        setSeries(newSeries)
        const seriesClass = new Series(newSeries.id, newSeries.unitId)
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
    }
    const focusInput = () => {
        if (inputEl && inputEl.current) {
            inputEl.current.focus()
        }
    }
    const resetState = () => {
        setRecords([])
        setSeries(undefined)
        setUnitName(undefined)
        setLoading(true)
        forceUpdate({})
    }
    useEffect(() => {
        // TODO - should proabbly move this to it's own component?
        // this is the logic for evaluating the route param, since this the app index.
        // lookup the string that was passed in, if it's not found in the db:
        //   1) see if there are other series to load (existing user)
        //   2) redirect to the landing page (new user/deleted only series)

        const findSeries = async () => {
            // no seriesId was passed in, see if there is a series to load
            const allSeries = await db.series.toArray()
            if (!allSeries || !allSeries[0]) {
                // nothing to load, send user to landing page
                history.push('/landing')
            } else if (allSeries[0] && allSeries[0].id) {
                // load one of the user's other series
                const seriesId = allSeries[0].id
                history.push(`/${seriesId}`)
            }
        }
        const loadSeries = async (seriesId?: number | string) => {
            if (seriesId !== undefined && seriesId !== '') {
                const series = await db.series.get(Number(seriesId))
                if (series) {
                    resetState()
                    return await loadAndSetSeries(series)
                }
            }
            return await findSeries()
        }
        loadSeries(id)
    }, [id, history])

    const refreshData = () => {
        // TODO cleanup this dupe logic, share with useEffect
        const findSeries = async () => {
            // no seriesId was passed in, see if there is a series to load
            const allSeries = await db.series.toArray()
            if (!allSeries || !allSeries[0]) {
                // nothing to load, send user to landing page
                history.push('/landing')
            } else if (allSeries[0] && allSeries[0].id) {
                // load one of the user's other series
                const seriesId = allSeries[0].id
                history.push(`/${seriesId}`)
            }
        }
        const loadSeries = async (seriesId?: number | string) => {
            if (seriesId !== undefined && seriesId !== '') {
                const series = await db.series.get(Number(seriesId))
                if (series) {
                    resetState()
                    return await loadAndSetSeries(series)
                }
            }
            return await findSeries()
        }
        loadSeries(id)
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
    };

    const updateSeriesWithUnit = async ({ name, id: unitId }: { name: string, id: number }) => {
        // callback for unit creation.
        // update series with unitId
        await db.series.update(Number(id), { unitId })
        setUnitName(name)
        focusInput()
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
                            <SeriesSelect width={140} activeSeries={series.id} form={form} />
                        ) : <div style={{ width: 140 }}></div>}
                        {unitName ? (
                            <Form.Item
                                name="amount"
                                rules={[{ required: true, message: 'needs value' }]}
                                style={{ maxWidth: 110, margin: '0 4px' }}
                            >
                                <Input
                                    type="number"
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
                                width={window.innerWidth*0.95}
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
                                                color: 'rgba(240, 240, 240, .8)',
                                                position: 'relative',
                                                top: 24,
                                                left: 56
                                            }}
                                        >
                                            <span
                                                role="img"
                                                aria-label="finger pointing"
                                            >
                                                👈
                                            </span> nice.
                                        </Title>
                                        <Title
                                            level={4}
                                            style={{
                                                color: 'rgba(240, 240, 240, .8)',
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
                        // maybe just show a chart with a static, 4-6 point chart (logo shape)?
                        !loading ? <ChartDemo
                            width={window.innerWidth*0.95}
                            height={190}
                            animated={false}
                            lineColor="rgba(240, 240, 240, .1)"
                            overlay={`start your chart ☝!`}
                            overlayColor={'rgba(240, 240, 240, .8)'}
                        /> : null
                    }
                </div>
            </Spin>
        </div>
    )
}
export default SeriesDetails

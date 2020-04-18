import React, { useEffect, useState } from 'react'
import { Button, Typography, Form, } from 'antd';
import { useHistory, Link } from 'react-router-dom'
import { db } from '../data/local-db'
import { ChartDemo } from '../components/chart/ChartDemo'
import { SeriesInput } from '../components/form/SeriesInput'
import { findOrCreateUnit } from '../data/models/Unit';
import './Landing.less'
import { ISeries } from '../data/models/Series';
const { Title } = Typography;

const Landing = () => {
    const [form] = Form.useForm();
    const history = useHistory()
    const [, forceUpdate] = useState()
    const [series, setSeries] = useState<ISeries[]>([])

    const loadSeries = async () => {
        const allSeries = await db.series.toArray()
        setSeries(allSeries)
    }

    useEffect(() => {
        forceUpdate({}) // force form validation to disable submit button
        loadSeries() // load series for link to series-details logic
    }, [])

    const onFinish = async (values: { seriesName?: string, unitName?: string }) => {
        if (!values.seriesName || !values.unitName) {
            return // shouldn't happen. for TS
        }
        const unitId = await findOrCreateUnit(db, values.unitName)
        const newSeries = {
            name: values.seriesName,
            timestamp: new Date().toISOString(),
            unitId
        }
        const seriesId = await db.series.add(newSeries)
        history.push(`/${seriesId}`)
    }


    return (
        <>
            <div style={{ marginTop: '8px' }}>
                <div className="indent" >
                    <Typography>
                        <Title level={2}>simple habit tracking</Title>
                        <ul style={{ listStyle: 'none' }}>
                            <li><span role="img" aria-label="woman scientist">👩‍🔬</span> decide what you want to track</li>
                            <li><span role="img" aria-label="clipboard">📋</span> use this app to log data</li>
                            <li><span role="img" aria-label="chart upwards">📈</span> see charts about your behavior</li>
                        </ul>
                    </Typography>
                </div>
            </div>
            <div style={{ marginTop: '8px' }}>
                <div className="indent">
                    <Typography>
                        <Title level={2}>demo</Title>
                    </Typography>
                    <div className="indent">
                        <div style={{ minHeight: 200 }}>
                            <ChartDemo height={170} showForm lineColor={"rgba(6, 85, 231, .6)"} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '8px' }}>
                <div className="indent">
                    <Typography>
                        <Title level={2}>get started</Title>
                    </Typography>
                    <div className="indent">
                        <Typography>
                            <Title level={4}>what do you want to track?</Title>
                        </Typography>
                        <div className="indent">
                            <Form form={form} name="landing_series_creation" layout="inline" onFinish={onFinish} >
                                <SeriesInput />
                                <Form.Item shouldUpdate={true} style={{ margin: '0 8px' }}>
                                    {() => (
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="small"
                                            shape="round"
                                            disabled={
                                                !form.isFieldsTouched(true) ||
                                                Boolean(form.getFieldsError().filter(({ errors }) => errors.length).length)
                                            }
                                        >
                                            Start
                                        </Button>
                                    )}
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            {series && series[0] && series[0].id ? (
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                    {/* show a link to series-details, incase an existing user ends up here */}
                    <Link to={`/series-details/${series[0].id}`} >Go to records</Link>
                </div>
            ) : null}
        </>
    )
}
export default Landing
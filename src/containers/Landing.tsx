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
        loadSeries() // load series for link to SeriesDetails logic
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
            <div style={{ margin: '1em 0' }}>
                    <Typography>
                        <div className="indent" >
                            <Title level={2} style={{ marginBottom: '0.2em' }}>simple habit tracking</Title>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div style={{display: 'block', justifyContent: 'left'}}>
                                <div>
                                    <span className="emoji" role="img" aria-label="woman scientist">👩‍🔬</span>
                                    {` `}
                                    decide what you want to track
                                </div>
                                <div>
                                    <span className="emoji" role="img" aria-label="clipboard">📋</span>
                                    {` `}
                                    use this app to log data
                                </div>
                                <div>
                                    <span className="emoji" role="img" aria-label="chart upwards">📈</span>
                                    {` `}
                                    see charts about your behavior
                                </div>
                            </div>
                        </div>
                    </Typography>
            </div>

            <div style={{ margin: '1em 0' }}>
                <div className="indent">
                    <Typography>
                        <Title level={2} style={{ marginBottom: '0.2em' }}>log data, see trends</Title>
                        <div className="indent">
                            <Title level={4}>looks like this:</Title>
                        </div>
                    </Typography>

                </div>
                <div style={{ minHeight: 200, paddingRight: '2em' }}>
                    <ChartDemo
                        height={170}
                        width={window.innerWidth*0.8}
                        showForm
                        animated
                        lineColor={"rgba(6, 85, 231, .6)"}
                        overlay={'DEMO'}
                        overlayColor={'rgba(240, 240, 240, .3)'}
                    />
                </div>
            </div>

            <div style={{ margin: '1em 0' }}>
                <div className="indent">
                    <Typography>
                        <Title level={2} style={{ marginBottom: '0.2em' }}>get started</Title>
                        <div className="indent">
                            <Title level={4}>what do you want to track?</Title>
                        </div>
                    </Typography>
                </div>
                <Form
                    form={form}
                    name="landing_series_creation"
                    layout="inline"
                    style={{display: 'flex', justifyContent: 'center'}}
                    onFinish={onFinish}
                >
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
            {series && series[0] && series[0].id ? (
                // for returning users
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                    {/* show a link to SeriesDetails, incase an existing user ends up here */}
                    <Button type="primary" ghost style={{width: '70%'}}>
                        <Link to={`/${series[0].id}`} >Go to your records</Link>
                    </Button>
                </div>
            ) : null}
        </>
    )
}
export default Landing
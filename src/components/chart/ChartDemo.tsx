import React, { useEffect, useState } from 'react'
import { Input, Form, Button, Select, Popover, Typography } from 'antd'
import { IRecord } from '../../data/models/Record'
import { RecordsDynamicLineChart } from './RecordsDynamicLineChart'
import './ChartDemo.less'
const { Title } = Typography;

// helper function, async pause
const wait = (ms: number) => new Promise(res => setTimeout(res, ms))

// data for chart-updating demo
const sampleData = [0.5, 4, 1.5, 7]

interface ChartDemoProps {
    height?: number | string
    width?: number | string
    showForm?: boolean
    values?: number[]
    lineColor?: string
    overlay?: string
    overlayColor?: string
    animated?: boolean
}
export const ChartDemo = (props: ChartDemoProps) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState()
    const [loading, setLoading] = useState<boolean>(false)
    const [records, setRecords] = useState<IRecord[]>([])
    const [recordIdCounter, setRecordIdCounter] = useState<number>(0)
    const [showTryMePopover, setShowTryMePopover] = useState<boolean>(false)

    const addRecord = (recordAmount: number, recordId: number) => {
        // creates a  record object and adds it to state.
        // created to be used in a map function, recordId is the index
        const now = new Date()
        now.setDate( now.getDate() + recordId );
        const newRecord = {
            id: recordId,
            seriesId: 1,
            timestamp: now.toISOString(),
            amount: recordAmount
        }
        setRecords(r =>[...r, newRecord])
        const newRecordId = recordId + 1
        setRecordIdCounter(newRecordId)
    }
    useEffect(() => {
        // TODO - find how to move this function elsewhere.
        // currently here to fix eslint: react-hooks/exhaustive-deps
        const mockedInteractionDemo = (intervalMilliseconds: number) =>
            (recordAmount: number, amountIndex: number) =>
                setTimeout(async () => {
                    // this function modifies state to mock user interaction.
                    const recordId = amountIndex + 1
                    // type the number into the form
                    form.setFieldsValue({ amount: recordAmount })
                    await wait(800)

                    // press submit, loading symbol shows
                    setLoading(true)
                    addRecord(recordAmount, recordId)
                    await wait(600)

                    // clear loading, clear form value
                    form.setFieldsValue({ amount: undefined })
                    setLoading(false)
                }, (intervalMilliseconds * (amountIndex + 1)))
        forceUpdate({}) // to disable form button

        let intervals: NodeJS.Timeout[] | undefined = undefined
        const values = props.values && props.values.length >= 1 ? props.values : sampleData
        if (props.animated === true) {
            const demoCycleMilliseconds = 4000
            const [firstRecord, ...demoValues] = values
            addRecord(firstRecord, 0) // 
            intervals = demoValues.map(mockedInteractionDemo(demoCycleMilliseconds))
    
            // show "Try me!" popover after all the mockedInteractionDemos
            const showPopoverDwell = values.length * demoCycleMilliseconds
            intervals.push(setInterval(() => setShowTryMePopover(true), showPopoverDwell))
        } else {
            values.map(addRecord)
        }

        return function cleanup() {
            if (intervals) {
                intervals.map(clearInterval) // use utils.ts useInterval?
            }
        }
    }, [form, props.animated, props.values])


    const onFinish = (values: { amount?: string }) => {
        // form submission - create a new record, add it to state for chart
        if (!values.amount) {
            return // shouldn't happen. for TS
        }
        addRecord(Number(values.amount), recordIdCounter)
        form.resetFields()
        // hide call to action popover, since they did it.
        setShowTryMePopover(false)
    };
    return (
        <>
            {props.showForm ? (
                <Form
                    form={form}
                    name="demo_flow"
                    layout="inline"
                    style={{ display: 'flex', justifyContent: 'center' }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="seriesName"
                        style={{ margin: '0 8px' }}
                    >
                        <Select
                            size="small"
                            style={{ maxWidth: 160, minWidth: 120 }}
                            bordered={false}
                            defaultValue="running"
                            options={[{ label: 'running', value: '1' }]}
                            optionFilterProp="children"

                        />
                    </Form.Item>
                    <Popover
                        content="Try me!"
                        visible={showTryMePopover}
                    >
                        <Form.Item
                            name="amount"
                            rules={[{ required: true, message: 'required' }]}
                            style={{ maxWidth: 70, margin: '0 8px' }}
                        >
                            <Input
                                type="number"
                                size="small"
                                placeholder={"miles"}
                            />
                        </Form.Item>
                    </Popover>
                    <Form.Item shouldUpdate={true} style={{ margin: '0 8px' }}>
                        {() => (
                            <Button
                                size="small"
                                type="primary"
                                shape="round"
                                htmlType="submit"
                                loading={loading}
                                disabled={
                                    loading ||
                                    !Boolean(form.getFieldValue('amount'))
                                }
                            >
                                Log
                            </Button>
                        )}
                    </Form.Item>
                </Form>

            ) : null}
            {/* if records in state, show. else show placeholder. */}
            {records && records.length >= 1 ?
                <div id="overlay-container">
                    <RecordsDynamicLineChart
                        records={records}
                        height={props.height}
                        width={props.width}
                        lineColor={props.lineColor}
                    />
                    {props.overlay ? (
                        <div id="overlay" className="overlay-flex-container" >
                            <Typography >
                                <Title level={4} style={{ color: props.overlayColor }} >
                                    {props.overlay}
                                </Title>
                            </Typography>
                        </div>
                    ) : null}
                </div>
                : null
            }
        </>
    )
}
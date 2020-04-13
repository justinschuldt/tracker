import React, { useState } from 'react'
import { Button, Modal, Typography, Divider, Popconfirm} from 'antd'
import {
    CloseCircleOutlined,
    MinusCircleOutlined,
    SettingOutlined
} from '@ant-design/icons'
import { ISeries } from '../../data/models/Series'
import { IRecord } from '../../data/models/Record'
import { SeriesTable } from '../table/SeriesTable'
import { db } from '../../data/local-db'

const { Title, Text } = Typography

interface ManageSeriesProps {
    series: ISeries
    records?: IRecord[]
    onClose: () => void
}
export const ManageSeries = (props: ManageSeriesProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const deleteSeries = (series: ISeries) => async (e: any) => {
        if (!series.id) {
            return
        }
        await db.records.where('seriesId').equals(series.id).delete()
        await db.series.delete(series.id)

        onClose()

    }
    const deleteRecords = (series: ISeries) => async (e: any) => {
        if (!series.id) {
            return
        }
        await db.records.where('seriesId').equals(series.id).delete()
        onClose()
    }
    const onClose = () => {
        props.onClose() // TEMP callback
        setModalVisible(false)
    }
    const buttonProps = {
        style: { margin: '4px' },
        danger: true,
        size: "small" as any,
        shape: "round" as any
    }
    return (
        <div>
            <SettingOutlined
                style={{ fontSize: 22 }}
                onClick={() => setModalVisible(true)}
            />
            <Modal
                title={
                    <Title level={4} style={{ margin: 0 }}>
                        manage {props.series.name} data
                    </Title>
                }
                visible={modalVisible}
                onCancel={onClose}
                footer={null}
                style={{ top: 20 }} // keyboard is needed, so move content up
            >
                <div>
                    {props.records && props.records.length >= 1 ? (
                        <>
                            <div>
                                <Typography>
                                    <Title level={4}>edit/delete records</Title>
                                </Typography>
                                <SeriesTable
                                    series={props.series}
                                    records={props.records}
                                />
                            </div>
                            <Divider style={{ marginTop: 0 }} />
                            <div>
                                <Typography>
                                    <Title level={4} style={{ margin: 0 }}>
                                        clear all records
                                    </Title>
                                    <Text className="indent">
                                        erase records, start fresh
                                    </Text>
                                </Typography>
                                <div className="indent">
                                    <div className="indent">
                                        <Popconfirm
                                            title="Are you sure?"
                                            onConfirm={deleteRecords(props.series)}
                                        >
                                            <Button
                                                className="indent"
                                                {...buttonProps}
                                                icon={<MinusCircleOutlined />}
                                            >
                                                delete records
                                            </Button>
                                        </Popconfirm>
                                    </div>

                                </div>
                            </div>
                            <Divider style={{ margin: '16px 0' }} />
                        </>
                    ) : null}
                    <div >
                        <Typography>
                            <Title level={4} style={{ margin: 0 }}>
                                stop tracking {props.series.name}
                            </Title>
                            <Text className="indent">
                                erase {props.series.name} and any records you've created
                            </Text>
                        </Typography>
                        <div className="indent">
                            <div className="indent">
                                <Popconfirm
                                    title="Are you sure?"
                                    onConfirm={deleteSeries(props.series)}
                                >
                                    <Button
                                        {...buttonProps}
                                        icon={<CloseCircleOutlined />}
                                    >
                                        delete {props.series.name}
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
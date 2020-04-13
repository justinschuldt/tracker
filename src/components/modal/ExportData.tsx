import React, { useState } from 'react'
import { Button, Modal, Typography } from 'antd'
import {
  DownloadOutlined,
  FileExcelOutlined,
  FileOutlined,
} from '@ant-design/icons'
import { ISeries } from '../../data/models/Series'
import { IRecord } from '../../data/models/Record'
import { downloadJsonFile } from '../Utils'
import { db } from '../../data/local-db'
import { IUnit } from '../../data/models/Unit'

const { Title, Text } = Typography

interface ExportDataProps {
  series?: ISeries
  records?: IRecord[]
}
export const ExportData = (props: ExportDataProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const exportAllData = (format: 'json' | 'csv') => async (e: any) => {
    const units = await db.units.toArray()
    const series = await db.series.toArray()
    const records = await db.records.toArray()
    const exportData = { units, series, records }
    downloadJsonFile('full-data-export', exportData)
  }

  const exportSeries = (format: 'json' | 'csv', series: ISeries, records: IRecord[]) =>
    async (e: any) => {
      let unit: IUnit | undefined = undefined
      if (series.unitId) {
        unit = await db.units.where('id').equals(series.unitId).first()
      }
      const exportData = { series, records, unit }
      downloadJsonFile(series.name, exportData)
    }
  const buttonProps = {
    style: { margin: '4px' },
    type: "primary" as any,
    size: "small" as any,
    shape: "round" as any
  }
  return (
    <div>
      <DownloadOutlined style={{ fontSize: 22 }} onClick={() => setModalVisible(true)} />
      <Modal
        title={<Title level={4} style={{ margin: 0 }}>export data</Title>}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <div>
          <Typography>
            <Title level={4} style={{ margin: 0 }}>all your data</Title>
            <Text className="indent">export as:</Text>
          </Typography>
          <div className="indent">
            <div className="indent">
              <Button
                type="primary"
                {...buttonProps}
                onClick={exportAllData('json')}
                icon={<FileOutlined />}
              >
                json
                  </Button>
              <Button
                type="primary"
                {...buttonProps}
                onClick={exportAllData('csv')}
                icon={<FileExcelOutlined />}
                disabled // TODO
              >
                spreadsheet
                  </Button>
            </div>
          </div>
        </div>
        {props.series && props.records ? (
          <div style={{ marginTop: 16 }}>
            <Typography>
              <Title level={4} style={{ margin: 0 }}>{props.series.name} data</Title>
              <Text className="indent">export as:</Text>
            </Typography>
            <div className="indent">
              <div className="indent">
                <Button
                  type="primary"
                  {...buttonProps}
                  onClick={exportSeries('json', props.series, props.records)}
                  icon={<FileOutlined />}
                >
                  json
                    </Button>
                <Button
                  type="primary"
                  {...buttonProps}
                  onClick={exportSeries('csv', props.series, props.records)}
                  icon={<FileExcelOutlined />}
                  disabled // TODO
                >
                  spreadsheet
                    </Button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
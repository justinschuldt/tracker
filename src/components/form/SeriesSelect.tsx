import React, { useState, useEffect } from 'react'
import { Form, Select, Input, Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { db } from '../../data/local-db'
import { ISeries } from '../../data/models/Series'
import { useHistory } from 'react-router-dom'
import { IOption, transformToOption } from '../Utils'
import { FormInstance } from 'antd/lib/form'
const { Search } = Input

interface SeriesSelectProps {
  activeSeries?: number
  form: FormInstance
  width: number | string
}
const SeriesSelect = (props: SeriesSelectProps) => {
  const [series, setSeries] = useState<ISeries[]>([])
  const [options, setOptions] = useState<IOption[]>([])
  const [activeSeries, setActiveSeries] = useState<ISeries>()
  const [newSeriesName, setNewSeriesName] = useState()

  let history = useHistory()

  useEffect(() => {
    if (props.activeSeries) {
      // reset state 
      setActiveSeries(undefined)
      props.form.resetFields()

      //  fetch data and set to state
      fetchData(props.activeSeries)
    }
  }, [props.activeSeries, props.form])

  const fetchData = async (activeSeriesId: number) => {
    const series = await db.series.toArray()
    setSeries(series)

    const options = series.map(transformToOption)

    const activeSeries = series.find(s => s.id === activeSeriesId)

    if (activeSeries) {
      setActiveSeries(activeSeries)
    }
    setOptions(options)
  }

  function onChange(value: string) {
    history.push(`/${value}`)
  }
  const onNameChange = (event: any) => {
    setNewSeriesName(event.target.value)
  };

  const createSeries = async () => {
    if (newSeriesName) {
      // add to db
      const timestamp = new Date().toISOString()
      const name = String(newSeriesName).toLocaleLowerCase()
      const id = await db.series.add({ name, timestamp })
      const newSeries = [...series, { id, name, timestamp }]
      setSeries(newSeries)
      const newOptions = newSeries.map(transformToOption)
      setOptions(newOptions)
      setActiveSeries({ id, name, timestamp })
      setNewSeriesName(undefined) // clear the input
      props.form.setFieldsValue({ seriesId: id })
      history.push(`/${id}`)
    }
  };

  return (
    options && options.length >= 1 ? (
      <Form.Item
        name="seriesId"
        style={{ margin: '0 4px 0 0' }}
        
      >
        <Select
          size="small"
          style={{ width: props.width }}
          bordered={false}
          onChange={onChange}
          options={options}
          value={String(activeSeries?.id)}
          defaultValue={String(activeSeries?.name)}
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Search
                  size="small"
                  value={newSeriesName}   // keep value in state for submit/clear
                  onChange={onNameChange} // updates state with form value
                  placeholder="meditation"
                  onPressEnter={createSeries} // enter key pressed
                  onSearch={createSeries}     // "+" button clicked
                  enterButton={<PlusOutlined />}
                />
              </div>
            </div>
          )}
        />
      </Form.Item>

    ) : <div style={{ width: props.width }}></div> // preserve layout while loading
  )
}

export default SeriesSelect

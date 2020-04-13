import React, { useState, useEffect } from 'react'
import { Select, Divider, Input, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IUnit } from '../../data/models/Unit';
import { db } from '../../data/local-db'
import { IOption, transformToOption } from '../Utils';
const { Search } = Input

interface UnitSelectProps {
  width: number | string
  selectionComplete: (props: { name: string, id: number }) => void
}
export const UnitSelect = (props: UnitSelectProps) => {
  const [newUnitName, setNewUnitName] = useState()
  const [options, setOptions] = useState<IOption[]>([])
  const [units, setUnits] = useState<IUnit[]>([])

  useEffect(() => {
    loadUnits()
  }, [])

  const loadUnits = async () => {
    const unitsArray = await db.units.toArray()
    const options = unitsArray.map(transformToOption)
    setUnits(unitsArray)
    setOptions(options)
  }
  const unitSelected = (unitId: number) => {
    const unit = units.find(unit => unit.id === unitId)
    if (unit) {
      props.selectionComplete({ ...unit, id: unitId })
    }
  }

  const onNameChange = (event: any) => {
    setNewUnitName(event.target.value)
  };

  const createUnit = async () => {
    if (newUnitName) {
      // add to db
      const iso = new Date().toISOString()
      const newUnit = {
        name: String(newUnitName),
        timestamp: iso,
      }
      let newUnitId = await db.units.add(newUnit)
      const unit = { ...newUnit, id: newUnitId }
      const newUnits = [...units, unit]
      const newOptions = newUnits.map(transformToOption)
      setUnits(newUnits)
      setOptions(newOptions)
      setNewUnitName(undefined) // clear the input
      props.selectionComplete(unit)
    }
  };

  return (
    <Form.Item
      name="unit"
      rules={[{ required: true, message: 'Please choose a unit' }]}
      style={{ margin: '0 4px' }}
    >
      <Select
        size="small"
        style={{ width: props.width }}
        placeholder="unit"
        onChange={unitSelected}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>

              <Search
                size="small"
                value={newUnitName}      // keep value in state for submit/clear
                onChange={onNameChange}  // updates state with form value
                placeholder="session"
                onPressEnter={createUnit} // enter key pressed
                onSearch={createUnit}     // "+" button clicked
                enterButton={<PlusOutlined />}
              />
            </div>
          </div>
        )}
        options={options}
      />
    </Form.Item>
  );

}
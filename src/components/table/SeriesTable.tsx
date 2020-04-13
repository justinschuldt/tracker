import React, { Component } from 'react';
import { Table, Popconfirm, } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons'
import { ISeries } from '../../data/models/Series';
import { IRecord } from '../../data/models/Record';
import { ColumnType } from 'antd/lib/table/interface'
import { EditableCell } from './EditableCell'
import { EditableRow } from './EditableRow'
import { db } from '../../data/local-db'

export interface SeriesTableRecord extends IRecord {
  id: number;
}

interface EditableColumnType<RecordType> extends ColumnType<RecordType> {
    editable?: boolean
}
interface EditableTableProps {
    series: ISeries
    records: IRecord[]
}
interface EditableTableState {
    records: SeriesTableRecord[]
    count: number
}
const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString)
    var options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }
    return date.toLocaleDateString(undefined, options)
}


// TODO - convert to function, use hooks
// make this more tightly coupled to the data - less local state.
export class SeriesTable extends Component<EditableTableProps, EditableTableState> {
  // This component holds records in state, renders a table of records
  // update/delete actions are performed on the DB store, then state is updated.
    columns: EditableColumnType<SeriesTableRecord>[]
  constructor(props: EditableTableProps) {
    super(props);
    this.columns = [
      {
        title: 'timestamp',
        dataIndex: 'timestamp',
        render: formatTimestamp
      },
      {
        title: 'amount', // TODO - change to unitName? miles, reps, etc.
        dataIndex: 'amount',
        editable: true,
      },
      {
        title: '',
        dataIndex: 'operation',
        align: 'center',
        render: (text, record) =>
            <Popconfirm
                title="Are you sure?"
                onConfirm={() => this.handleDelete(record.id)}>
              <CloseCircleOutlined className="danger" style={{fontSize: 18, color: '#ff4d4f'}}/>
            </Popconfirm>
      },
    ];

    this.state = {
      records: [],
      count: 0,
    };
  }
  componentDidMount() {
      const newRecords  = this.props.records.map(r => ({ ...r, id: Number(r.id)}))
      this.setState(() => ({
          records: newRecords as SeriesTableRecord[],
          count: newRecords.length
      }))
  }

  handleDelete = async (id: number) => {
    // remove record from data store
    await db.records.delete(id)
    // remove record from local state
    const data = [...this.state.records];
    this.setState({ records: data.filter(item => item.id !== id) });
  };

  handleSave = async (row: SeriesTableRecord) => {
    // remove record from data store
    await db.records.update(row.id, {amount: row.amount})
    // remove record from local state
    const newData = [...this.state.records];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    this.setState({ records: newData });
  };

  render() {
    const { records } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: SeriesTableRecord)  => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    }) as ColumnType<SeriesTableRecord>[] // TODO - better type
    return (
        <Table
            size="small"
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={records}
            rowKey="id"
            columns={columns}
        />
    );
  }
}

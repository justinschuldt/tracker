import React, {
    useContext,
    useState,
    useEffect,
    useRef
} from 'react';
import { Input, Form } from 'antd';
import { EditableContext } from './EditableRow'
import { SeriesTableRecord } from './SeriesTable'


interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof SeriesTableRecord;
    record: SeriesTableRecord;
    handleSave: (record: SeriesTableRecord) => void;
}
  
export const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<Input>(null);
    const form = useContext(EditableContext);
  
    useEffect(() => {
      if (editing && inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };
  
    const save = async (e: any) => {
      try {
        const values = await form.validateFields();
  
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0, maxWidth: 50 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `✏☝`,
            },
          ]}
        >
          <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
          />
        </Form.Item>
      ) : (
        <div
            className="editable-cell-value-wrap"
            onClick={toggleEdit}
        >
            {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };

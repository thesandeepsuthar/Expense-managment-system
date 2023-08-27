

import React, { useState, useEffect } from 'react';
import Layout from '../componentts/Layouts/Layout';
import { Form, Select, Input, Modal, message, Table, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios';
import Spinner from '../componentts/Spinner'
const { RangePicker } = DatePicker;
import moment from 'moment';
import Analytics from '../componentts/Analytics';


const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setloading] = useState(false)
  const [allTransection, setAllTransection] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')
  const [editable, setEditable] = useState(null)

  //data table
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'category',
      dataIndex: 'category'
    },
    {
      title: 'Refrence',
      dataIndex: 'reference'
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setShowModal(true)
          }} />
          <DeleteOutlined className="mx-2" onClick={()=>{handleDelete(record)}}/>
        </div>
      )

    },

  ];

  useEffect(() => {
    //get all transection
    const getAllTransection = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setloading(true)
        const res = await axios.post('/transection/get-transection', {
          userid: user._id,
          frequency,
          selectedDate,
          type
        })
        setloading(false)
        setAllTransection(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error('fetch issue with transection');

      }
    }

    getAllTransection();
  }, [frequency, selectedDate, type]);

  //delete handler
const handleDelete =async(record)=>{
  try{
    setloading(true)
    await axios.post("/transection/delete-transection",{transectionid:record._id})
    setloading(false)
    message.success("Transection Deleted")
  }catch(error){
    setloading(false)
    console.log(error)
    message.error('unalble to delete')
  }


}
  //form handling
  const handleSubmit = async (value) => {
    try {
      const users = JSON.parse(localStorage.getItem('user'))
      setloading(true)
      if (editable) {
        await axios.post('/transection/edit-transection',
          {
            payload: {
              ...value,
              userid: users._id
            },
            transectionId: editable._id
          })
        setloading(false)
        message.success('Transaction Updated successfully')


      } else {

        await axios.post('/transection/add-transection', { ...value, userid: users._id })
        setloading(false)
        message.success('Transaction added successfully')
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setloading(false)
      message.error('Failed to add transection')
    }

  }
  return (
    <Layout >
      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value='7'>Last 1 Week</Select.Option>
            <Select.Option value='30'>Last 1 Month</Select.Option>
            <Select.Option value='365'>Last 1 Year</Select.Option>
            <Select.Option value='custom'>Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(value) => setSelectedate(value)} />}
        </div>

        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value='all'>ALL</Select.Option>
            <Select.Option value='income'>Income</Select.Option>
            <Select.Option value='expense'>Expense</Select.Option>
          </Select>
          {frequency === 'custom' &&
            <RangePicker
              value={selectedDate}
              onChange={(value) => setSelectedate(value)} />}
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData('table')} />
          <AreaChartOutlined
            className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData('analytics')} />
        </div>
        <div>

          <button
            className='btn btn-dark'
            onClick={() => setShowModal(true)
            }>
            Add new</button>
        </div>
      </div>


      <div className='content'>
        {viewData === 'table' ?
          <Table columns={columns} dataSource={allTransection} />
          : <Analytics allTransection={allTransection} />
        }

      </div>
      <Modal
        title={editable ? 'Edit Transection' : 'Add Transection'}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type='text' />
          </Form.Item>
          <Form.Item label="type" name='type'>
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name='category'>
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='project'>Project</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
              <Select.Option value='text'>Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type='date' />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type='text' />
          </Form.Item>
          <div className="d-flex justify-content-center ">
            <button type="submit" className='btn btn-dark'>{" "}SAVE</button>
          </div>

        </Form>


      </Modal>

    </Layout>

  );
};

export default HomePage;

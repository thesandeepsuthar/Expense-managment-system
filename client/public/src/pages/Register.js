import React, { useState,useEffect} from 'react'
import{Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"
import Spinner from '../componentts/Spinner'
const Register = () => {
const navigate=useNavigate();
const [loading,setloading]=useState(false)
    //form submit
   const SubmitHandler=async(values)=>{
    try{
        setloading(true)
        await axios.post('/users/register',values)
        message.success('Registration successful')
        setloading(false)
        navigate('/login');

    }catch(error){
        setloading(false)
        message.error('something went wrong ')
    }
   };
 
  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className='register-page'>
        {loading && <Spinner/>}
        <Form layout='vertical' onFinish={SubmitHandler} >
            <h1>Register form</h1>
            <h5>Expense Management system</h5>
            <Form.Item label='Name' name='name'>
                <Input/>
            </Form.Item>
            <Form.Item label='Email' name='email'>
                <Input type='email'/>
            </Form.Item>
            <Form.Item label='Password' name='password'>
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <Link to="/login">Already Register ? Click here to login</Link>
                <button className='btn btn-dark'>Register in </button>
            </div>
        </Form>
      </div>
    </>
  )
}

export default Register


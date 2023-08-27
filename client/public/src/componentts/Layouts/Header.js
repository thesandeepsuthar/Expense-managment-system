import { Button } from 'antd'
import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
const Header = () => {
    const [loginUser,setLogincUser]=useState()
    const Navigate=useNavigate();
    useEffect(()=>{
        const users= JSON.parse(localStorage.getItem('user'))
        console.log(users)
        if(users){
            setLogincUser(users)
        }

    },[]);
    const logoutHandler=()=>{
        localStorage.removeItem("user")
        message.success('logout success')
        Navigate("/login");

    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/">Expense management system</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><p className="nav-link">{ loginUser && loginUser.name}</p>{" "}</li>
                            <li className="nav-item">
                                <button 
                                className='btn btn-dark'
                                onClick={logoutHandler}
                                >Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header

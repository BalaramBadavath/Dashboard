import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
  let [data,SetData] = useState({employee_name:"",employee_age:"",employee_salary:""})

  let {employee_name,employee_age,employee_salary} = data

  let {id} = useParams()

  useEffect(()=>{
    axios.get(`https://dummy.restapiexample.com/api/v1/employees/${id}`)
    .then((res)=>{
      SetData(res.data)
    })
  },[])
  let handleChange = (e)=>{
    let {name,value} = e.target
    SetData({...data,[name]:value})
  }
  let navigate = useNavigate()
  let handleSubmit=(e)=>{
    e.preventDefault()
    axios.put(`https://dummy.restapiexample.com/api/v1/employees/${id}`,data)
    navigate('/')
  }

  

  return (
    <>
      <h1>UPADTE YOUR DETAILS</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name : </label>
      <input type="text" name='name' id='name' value={employee_name} placeholder='Enter Your Name' onChange={handleChange}/>
      <br /><br />
      <label htmlFor="age">Age : </label>
      <input type="number" name='age' id='age' value={employee_age} placeholder='Enter Your Age'onChange={handleChange} />
      <br /><br />
      <label htmlFor="salary">Salary : </label>
      <input type="number" name='salary' id='salary' value={employee_salary} placeholder='Enter Your Salary' onChange={handleChange}/>
      <br /><br />
      <button>UPDATE</button>
      </form>   
    </>
  )
}

export default Update
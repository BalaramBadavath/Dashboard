import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const View = () => {
    let [individual,setIndividual] = useState("")
    let {id} = useParams()
    useEffect(()=>{
        let output = axios.get(`https://dummy.restapiexample.com/api/v1/employees/${id}`)
        output.then((res)=>{setIndividual(res.data)})
    },[])
    let {employee_name,employee_age,employee_salary} = individual
    let navigate = useNavigate()
  return (
    <div className="container mx-auto mt-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <ul className="list-disc space-y-2 text-gray-700">
        <li>Employee Name : {employee_name}</li>
        <li>Employee Age : {employee_age}</li>
        <li>Employee Salary : {employee_salary}</li>
      </ul>
      <br /><br />
      <button handleBack={()=>{navigate('/')}}>Back to Home</button>
    </div>
  )
}

export default View
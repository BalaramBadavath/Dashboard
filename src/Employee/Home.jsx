import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
    let [user,setUser] = useState(null)
    useEffect(()=>{
        let result = axios.get('https://dummy.restapiexample.com/api/v1/employees/data')
        result.then((response)=>{setUser(response.data)})
    })

    let handleDelete= async (id)=>{
        // axios.delete(`http://localhost:3000/data/${id}`)
       
        setUser(user.filter((item) => item.id !== id));

        try {
            const deletionResponse = await axios.delete(`https://dummy.restapiexample.com/api/v1/employees/${id}`);

            if (deletionResponse.status === 200) { // Successful deletion
        // Re-fetch data to ensure server-side and client-side are in sync
                const response = await axios.get('https://dummy.restapiexample.com/api/v1/employees/');
                const updatedData = response.data;
                setData(updatedData);
            } 
        else {
        // Handle deletion error (optional: revert local update)
        console.error('Deletion failed:', deletionResponse.data);
        setData([...data, deletedItem]); // Re-add deleted item if needed
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    window.location.reload()
    }

  return (
    <div className='mb-4 h-screen w-screen flex flex-col items-center'>
        <div className='flex flex-row  w-full justify-center'>
            <input type="text" placeholder='Search here' className='w-2/4 px-3 mt-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'/>
            <button><FaSearch className='ml-2 mt-6 h-6 w-6' /></button>
        </div>
        <div className='h-full w-full flex flex-col items-center'>
            <div className='mt-20 h-1/5 w-4/6 rounded-md'>
                <div className="card bg-gray-100 shadow-md p-3 rounded-md h-8">
                    <ul className='flex felx-row'>
                        <li className='w-1/6'>EMP ID</li>
                        <li className='w-1/6'>EMP NAME</li>
                        <li className='w-1/6'>EMP AGE</li>
                        <li className='w-1/6'>EMP SALARY</li>
                        <li className='w-2/6 text-center'>ACTION</li>
                    </ul>
                </div>
                {
                    user==null?"Loading...":user.map((person)=>{
                        return(
                            <div className="card bg-gray-100 shadow-md p-3 rounded-md mt-2 h-20">
                                <ul className="list-none space-y-2 text-gray-700 flex flex-row">
                                    <div className='w-1/6 mt-2 ml-4'>
                                        <li>{person.id}</li>
                                    </div>
                                    <div className='w-1/6'>
                                        <li>{person.employee_name}</li>
                                    </div>
                                    <div className='w-1/6'>
                                        <li>{person.employee_age}</li>    
                                    </div>
                                    <div className='w-1/6'>
                                        <li>{person.employee_salary}</li>
                                    </div>
                                    <div className='w-2/6 flex flex-row justify-around'>
                                        <Link to={`/view/${person.id}`}><button type='submit' className='border border-green-500 text-green-500 hover:bg-green-100 py-2 px-4 rounded text-center font-2xl'>VIEW</button></Link>
                                        <Link to={`/edit/${person.id}`}><button type='submit' className='border border-blue-500 text-blue-500 hover:bg-blue-100 py-2 px-4 rounded text-center font-2xl'>EDIT</button></Link>
                                        <button type='submit' className='border rounded text-red-600 border-red-600 text-center hover:bg-red-100 py-2 px-4  font-2xl' onClick={()=>{handleDelete(person.id)}}>DELETE</button>
                                    </div>
                                </ul>
                            </div>)
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Home
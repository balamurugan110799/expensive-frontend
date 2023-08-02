import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/SideBar";
import Layout from "../Components/Layout";

function Admin() {
    const [data, setData] = useState()
    const [values,setValues]=useState({
        expensive:"",
        amount:null,
    })

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleClick =(e) =>{
        e.preventDefault()
        //console.log(values)
        axios.post("http://localhost:4000/api/expensive",values)
        .then((res)=>{
            //console.log(res)
            getAll()
        })
        .catch((err) => {
            //console.log(err)
        })
    }
 

    const getAll = () =>{
        axios.get('http://localhost:4000/api/getAll')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            //console.log(err)
        })
    }
 
    useEffect(()=>{
        getAll()
    },[])

    return (
        <div>
            <div className="w-[100%] flex">
                <div className="w-[20%]">
                    <Sidebar />
                </div>
                <div className="w-[80%]">
                    <Layout>


                        <div className="w-[100%] flex flex-wrap">
                            <div className="w-[33%] ">
                                <div>
                                    <label className="mx-4 text-primary text-[14px] font-semibold">Expensive</label>
                                </div>
                                <input name="expensive" onChange={(e)=>handleChange(e)} type="text" className="border mx-4 h-[36px] text-[14px]" />
                            </div>

                            <div className="w-[33%] ">
                                <div>
                                    <label className="mx-4 text-primary text-[14px] font-semibold">Amount</label>
                                </div>
                                <input name="amount" onChange={(e)=>handleChange(e)} type="number" className="border mx-4 h-[36px] text-[14px]"  />
                            </div>

                            <div className="w-[33%] relative">
                               <button onClick={(e)=>handleClick(e)} className="absolute bottom-5 bg-primary px-8 py-1 text-white mx-4 h-[36px]">Add</button>
                            </div>

                        </div>
                        <table className="w-[100%]">
                            <thead>
                                <tr className="bg-primary text-[#fff] py-2">
                                    <td className="py-1 px-2">index</td>
                                    <td className="py-1 px-2">Expensive</td>
                                    <td className="py-1 px-2">Amount</td>

                                    <td className="py-1 px-2">Update</td>
                                    <td className="py-1 px-2">Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((v, i) => {
                                    return (
                                        <tr>
                                            <td className="py-1 px-2">{i}</td>
                                            <td className="py-1 px-2">{v.expensive}</td>
                                            <td className="py-1 px-2">{v.amount}</td>
                                        </tr>
                                    )
                                })}
                                {/* </tr> */}

                            </tbody>
                        </table>

                    </Layout>
                </div>
            </div>
        </div>
    )
}

export default Admin
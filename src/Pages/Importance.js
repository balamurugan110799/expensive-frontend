import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../Components/SideBar";
import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { reduceramount } from "../Actions/expensive"


function Importance() {
    // //(useSelector(state=>state.total_amount))
    const amount_store = useSelector(state => state.total_amount.total_amount)
    const dispatch = useDispatch()
    const [reduceAmount, setreduceAmount] = useState()
    //(amount_store)
    const [dataJson, setJsonValue] = useState([
    ])
    const [data, setData] = useState({
        id: null,
        date: "",
        expensive: "",
        amount: "",
    })
    const renderYearContent = (year) => {
        const tooltipText = `Tooltip for year: ${year}`;
        return <span title={tooltipText}>{year}</span>;
    };
    const [upadte, setUpdate] = useState({
        id: null,
        date: "",
        expensive: "",
        amount: "",
    })

    const [error, setErrors] = useState({
        date: "",
        expensive: "",
        amount: "",
    })
    const [amount, setAmount] = useState()



    const [startDate, setStartDate] = useState(new Date());

    const [optiondata, setOptionData] = useState([

    ])

    var flag = true
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        })
        setUpdate({
            ...upadte,
            [name]: value,
        })
        // let filter = 
        data.expensive = e.target.value
        let filter = optiondata.filter((option) => option.expensive === data.expensive ? data.amount = option.amount : null)
        setData(data)
    }

    ////(data)
    const setDate = (date, e) => {
        setStartDate(date)
    }

    const Errorhandler = (data) => {
        if (data.expensive === "") {
            error.expensive = "Select the Options"
        } else if (data.expensive == "Select") {
            error.expensive = "Select the Options"
        } else {
            error.expensive = ""
        }
        ////(data.expensive)
    }

    const handleClick = (e) => {
        e.preventDefault()
        data.date = `${startDate}`
        Errorhandler(data)



        dispatch(reduceramount(data.amount))
        var today = data.date
        var claimedDate = today.toString().split(" ");
        var dateValues = ` ${claimedDate[2]}  ${claimedDate[1]}`;
        data.date = dateValues
        data.id = dataJson.length + 1
        createData(data)
        handleChange(e)

    }

    const createData = (data) => {
        axios.post("http://localhost:4000/api/importance", data)
            .then((data) => {
                getAll()
            })
            .catch((err) => {
            })
    }

    const updateClick = (e) => {
        e.preventDefault()
        dataJson.map((el) => {
            if (upadte.id === el.id) {
                el.name = upadte.name
                el.amount = upadte.amount
                el.date = upadte.date
            }
        })
        setJsonValue(dataJson)
        handleChange(e)
    }

    const updateData = (e, v, i) => {
        e.preventDefault()
        document.getElementById("updatedata").value = v.date
        document.getElementById("updateanmount").value = v.amount
        document.getElementById("updatename").value = v.name
    }

    const Delete = (e, v) => {
        e.preventDefault()
    }

    const SelectOption = () => {
        axios.get('http://localhost:4000/api/getAll')
            .then((res) => {
                setOptionData(res.data)
            })
            .catch((err) => {
                ////(err)
            })
    }

    const getAll = () => {
        axios.get('http://localhost:4000/api/importanceall')
            .then((res) => {
                setJsonValue(res.data)
            })
            .catch((err) => {
            })
    }

    useEffect(() => {
        getAll()
        SelectOption()
    }, [])
    return (
        <div>
                    <Layout>
                        <div className="flex w-[100%]">


                            <form className="flex bg-[#fff] w-[100%] py-4">
                                <div>
                                    <DatePicker
                                        selected={new Date()}
                                        renderYearContent={renderYearContent}
                                        showYearPicker
                                        dateFormat="yyyy"
                                    />
                                    <label className="mx-4 text-primary text-sm font-semibold">Date</label>
                                    <div className="pt-1">
                                        <DatePicker id="date" selected={startDate} onChange={(date, e) => setDate(date, e)} className="border p-1  mx-4 h-[36px] text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="mx-4 text-primary text-sm font-semibold">Select</label>
                                    <div className="pt-1">
                                        <select name="expensive" id="expensive" onChange={(e) => handleChange(e)} className="border w-[200px] mx-4 h-[36px] text-sm" >

                                            <option style={{ display: "none" }}>Select </option>
                                            {optiondata?.map((v) => {
                                                return (
                                                    <option>{v.expensive}</option>
                                                )
                                            })}
                                        </select>

                                    </div>
                                    <span className="mx-4 text-sm text-error">{error.expensive}</span>
                                </div>

                                <div>
                                    <label className="mx-4 text-primary font-semibold text-sm">Amount</label>
                                    <div className="pt-1">
                                        <input disabled type="text" pattern="[0-9]{10}" id="amount" value={data.amount} name="amount" onChange={(e) => handleChange(e)} className="border mx-4 h-[36px] text-sm" />
                                    </div>
                                    <span className="mx-4 text-sm text-error">{error.amount}</span>
                                </div>
                                <div className="relative">

                                    <button onClick={(e) => handleClick(e)} className="absolute bottom-5 bg-primary px-8 py-1 text-white mx-4 h-[36px]">Submit</button>
                                </div>
                            </form>
                        </div>

                        <div className="flex w-[100%]">
                            {/* <form className="flex">
                                <div>
                                  
                                    <DatePicker id="updatedata" selected={startDate} onChange={(date, e) => setDate(date, e)} className="border mx-4 h-[36px]" />
                                </div>
                                <select name="name" id="updatename" onChange={(e) => handleChange(e)} className="border mx-4 h-[36px] " >
                                    {optiondata?.map((v) => {
                                        return (
                                            <option>{v}</option>
                                        )
                                    })}
                                </select>
                                <input id="updateanmount" type="text" name="amount" onChange={(e) => handleChange(e)} className="border mx-4 h-[36px]" />
                                <button onClick={(e) => updateClick(e)} className="bg-primary px-8 py-1 text-white mx-4 h-[36px]">Update</button>
                            </form> */}
                        </div>
                        {/* {JSON.stringify(error)}
                        {JSON.stringify(data)} */}
                        <table className="w-[100%] my-7">
                            <thead className="bg-primary text-[#fff]">
                                <td className="text-left py-2 px-2">S.No</td>
                                <td className="text-left py-2 px-2">Date</td>
                                <td className="text-left py-2 px-2">Name</td>
                                <td className="text-left py-2 px-2">Amount</td>
                                <td className="text-left py-2 px-2">Edit</td>
                                <td className="text-left py-2 px-2">Delete</td>
                            </thead>
                            <tbody>
                                {dataJson?.map((v, i) => {
                                    return (
                                        <tr keys={i}>
                                            <td className="px-2">{i + 1}</td>
                                            <td className="px-2">{v?.date}</td>
                                            <td className="px-2">{v?.expensive}</td>
                                            <td className="px-2">{v?.amount}</td>
                                            <td className="px-2"><button onClick={(e) => updateData(e, v, i)}><HiOutlinePencilAlt /></button></td>
                                            <td className="px-2"><button onClick={(e) => Delete(e, v, i)}><HiOutlineTrash /></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </Layout>
               
        </div>
    )
}
export default Importance
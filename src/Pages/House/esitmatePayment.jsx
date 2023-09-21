import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import Button from '../../Fields/Button'
import PopUp from '../../Components/Popup'
import Input from '../../Fields/Input'
import axios from 'axios'
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InfromationPopup from '../../Components/InfromationPopup'

export default function EsitmatePayment() {
    const [popUpState, setPopUpState] = useState(false)
    const [infromation, setInfromation] = useState(false)
    const [infromationMsg, setInfromationMsg] = useState("")
    const [deleteMsg, setDeleteMsg] = useState(false)


    const [action, setAction] = useState("")
    const [getEstimateData, setEstimateData] = useState()
    const [startDate, setStartDate] = useState(new Date());

    const [values, setValues] = useState({
        date: null,
        name: "",
        amount: null,
    })

    const [errors, setErrors] = useState({
        date: null,
        name: "",
        amount: null,
    })
    const [vaild, setVaild] = useState(false)

    const setDate = (date, e) => {
        setStartDate(date)
    }

    const popUpHandler = () => {
        setPopUpState(!popUpState)
        setAction("Add")
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    if (vaild === true) {
        if (values.name === "" || values.name === undefined) {
            errors.name = "Required"
        } else {
            errors.name = true
        }

        if (values.amount === "" || values.amount === undefined || values.amount === null) {
            errors.amount = "Enter the Amount"
        } else {
            errors.amount = true
        }
    }

    const getEstimate = () => {
        axios.get("http://localhost:4000/api/getEsitmatePayment")
            .then((res) => {
                console.log(res)
                res.data.data.forEach(element => {
                    let date = new Date(element.date * 1000).toLocaleDateString()
                    element.showdate = date
                });
                console.log(res.data.data)
                setEstimateData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getEstimate()
    }, [])

    const handleEdit = (v, i) => {
        setPopUpState(true)
        let date = new Date(v?.date * 1000)
        console.log(date)
        setStartDate(date)
        setValues(v)
        setAction("Update")
    }

  
    const echoConverter = (date) => {
        var myDate = new Date(date);
        setDeleteMsg(!deleteMsg)
        var myEpoch = myDate.getTime() / 1000.0;
        return myEpoch
    }

    const handleInfromation = () => {
        setInfromation(!infromation)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(errors, values)
        values.date = echoConverter(startDate)
        setVaild(true)
        if (errors.name === true && errors.amount === true) {
            axios.post("http://localhost:4000/api/addEstimatePayment", values)
                .then((res) => {
                    console.log(res)
                    setValues({
                        date: null,
                        name: "",
                        amount: null,
                    })
                    setPopUpState(false)
                    getEstimate()
                    setErrors({
                        date: null,
                        name: "",
                        amount: null,
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    const updateHandler = (e) => {
        e.preventDefault();
        setVaild(true)
        values.date = echoConverter(startDate)
        axios.put(`http://localhost:4000/api/updateEstimatePayment/${values?._id}`, values)
            .then((res) => {
                console.log(res)
                setValues({
                    date: null,
                    name: "",
                    amount: null,
                })
                setPopUpState(false)
                getEstimate()
                setErrors({
                    date: null,
                    name: "",
                    amount: null,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (v, i) => {
        setInfromationMsg("Delete")
        setInfromation(true)
        setValues(v)

    }

    const handleDeleteApiCall = () => {
        axios.delete(`http://localhost:4000/api/deleteEstimatePayment/${values?._id}`)
            .then((res) => {
                console.log(res)
                setValues({
                    date: null,
                    name: "",
                    amount: null,
                })
                setDeleteMsg(false)
                setPopUpState(false)
                setInfromation(false)
                getEstimate()
                setErrors({
                    date: null,
                    name: "",
                    amount: null,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <Layout>
                <Button handleClick={popUpHandler} buttonName="Add" className="mb-2" />

                <PopUp
                    state={popUpState}
                    handleClick={popUpHandler}
                    width={"sm"}
                    actionbar={true}
                    title={action}
                // type={popup.type}
                // message={popup.message}
                // handleClick={popUpHandler}
                >
                    <div className=' grid grid-cols-1 gap-3 p-4 pb-0'>
                        <div>
                            <label className=" text-primary text-sm font-semibold">Date</label>
                            <div className="pt-1">
                                <DatePicker
                                    id="date" selected={startDate}
                                    onChange={(date, e) => setDate(date, e)}
                                    className="border p-1  w-full h-[36px] text-sm" />
                                {errors.date}
                            </div>
                        </div>
                        <div>
                            <Input type="text" value={values.name} handleChange={(e) => handleChange(e)} label="Need to Give" name="name" />
                            <div className='text-[#dd0821] text-tiny pt-1'>{errors.name}</div>
                        </div>

                        <div>
                            <Input type="number" label="Estimate Amount" value={values.amount} handleChange={(e) => handleChange(e)} name="amount" />
                            <div className='text-[#dd0821] text-tiny pt-1'>{errors.amount}</div>

                        </div>



                    </div>


                    <div className=' flex justify-end px-4'>
                        <Button buttonName="Cancel" handleClick={popUpHandler} className="mx-2 mt-4 mb-4" />
                        {action === "Add" ? <Button buttonName="Add" handleClick={submitHandler} className="mt-4 mb-4" /> :
                            <Button buttonName="Update" handleClick={updateHandler} className="mt-4 mb-4" />}
                    </div>


                </PopUp>

                <table className=' w-full'>
                    <thead>
                        <tr className='bg-primary text-[#fff]'>
                            <td className=' px-4 text-left py-2'>S.No</td>
                            <td className=' px-4 text-left py-2'>Date</td>
                            <td className=' px-4 text-left py-2'>Depands</td>
                            <td className=' px-4 text-left py-2'>Amount</td>
                            <td className=' px-4 text-left py-2 w-[50px]'>Edit</td>
                            <td className=' px-4 text-left py-2 text-sm w-[50px]'>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {getEstimateData?.map((v, i) => {
                            // //console.log(i%2)
                            return (
                                <tr className={`${i % 2 === 1 ? "td" : null} `}>
                                    <td className=' px-4 text-text-color text-sm py-2'>{i}</td>
                                    <td className=' px-4 text-text-color text-sm py-2'>{v?.showdate}</td>
                                    <td className=' px-4 text-text-color text-sm py-2'>{v?.name}</td>
                                    <td className=' px-4 text-[#dd0821] text-sm py-2'>{v?.amount}</td>
                                    <td className='h-full flex justify-center px-4 text-text-color text-sm py-3 w-[50px]'><HiOutlinePencilAlt onClick={() => handleEdit(v, i)} className='text-[#50933e] hover:text-[#1e6510] duration-300 hover:cursor-pointer' /></td>
                                    <td className=' px-8 text-text-color text-sm py-2 w-[50px]'><HiOutlineTrash onClick={() => handleDelete(v, i)} className='hover:text-[#ff554b] hover:cursor-pointer duration-300 text-[#dd0821]' /></td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <InfromationPopup handleClick={handleInfromation} state={infromation} title={infromationMsg} actionbar={true}>
                    <div className='py-4 px-10 text-h5 text-text-color text-center'>Did You want to Delete?</div>
                    <div className=' flex justify-end pb-2'>
                        <Button buttonName="Cancel" className="mr-4" handleClick={handleInfromation} />
                        <Button buttonName="Delete" className="mr-4" handleClick={handleDeleteApiCall} />


                    </div>
                </InfromationPopup>

            </Layout>
        </div>
    )
}

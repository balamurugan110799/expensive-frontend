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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EsitmatePayment() {
    const [popUpState, setPopUpState] = useState(false)
    const [infromation, setInfromation] = useState(false)
    const [infromationMsg, setInfromationMsg] = useState("")
    const [deleteMsg, setDeleteMsg] = useState(false)


    const [action, setAction] = useState("")
    const [getEstimateData, setEstimateData] = useState()
    const [startDate, setStartDate] = useState(new Date());
    var toastMessage;


    const [values, setValues] = useState({
        date: null,
        details: "",
        amount: null,
    })

    const [errors, setErrors] = useState({
        date: null,
        details: "",
        amount: null,
    })
    const [vaild, setVaild] = useState(true)
  const [dataVaildation, setDataVaildation] = useState(false)


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
        if (values.details === "" || values.details === undefined) {
            errors.details = "Required"
        } else {
            errors.details = true
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
                    let date = new Date(element.year * 1000).toLocaleDateString()
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
        setAction("Updates")
        setValues(v.estimatePayment[0])
        var time = new Date(v.estimatePayment[0].date * 1000)
        setStartDate(time)
    }

    const showToastMessage = () => {
        toast.success(` ${toastMessage} `, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showDeleteMessage = () => {
        toast.error(` ${toastMessage} `, {
            position: toast.POSITION.TOP_RIGHT
        });
    };


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
        setDataVaildation(true)
        setVaild(true)
        var myDate = new Date(startDate); // Your timezone!
        var myEpoch = myDate.getTime() / 1000.0;
        values.date = myEpoch
        var jsonObj = {
            year: myEpoch,
            estimatePayment: [
                values
            ]
        }
        if (errors.details === true && errors.amount === true) {
            axios.post("http://localhost:4000/api/addEstimatePayment", jsonObj)
                .then((res) => {
                    console.log(res)
                    setValues({
                        date: null,
                        details: "",
                        amount: null,
                    })
                    setDataVaildation(false)
                    toastMessage = " Added Successfully..."
                    showToastMessage()

                    setPopUpState(false)
                    getEstimate()
                    setErrors({
                        date: null,
                        details: "",
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

        var myDate = new Date(startDate); // Your timezone!
        var myEpoch = myDate.getTime() / 1000.0;
        values.date = myEpoch
        var jsonObj = {
            year: myEpoch,
            estimatePayment: [
                values
            ]
        }
        var selectedId;
        getEstimateData.forEach((el) => {
            if (el.estimatePayment[0]?._id === values?._id) {
                console.log(el)
                selectedId = el?._id;
            }
        })
        if (errors.amount === true && errors.details === true) {
            axios.put(`http://localhost:4000/api/updateEstimatePayment/${selectedId}`, jsonObj)
                .then((res) => {
                    console.log(res)
                    setValues({
                        date: null,
                        details: "",
                        amount: null,
                    })
                    setDataVaildation(false)
                    toastMessage = " Updated Successfully..."
                    showToastMessage()

                    setPopUpState(false)
                    getEstimate()
                    setErrors({
                        date: null,
                        details: "",
                        amount: null,
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
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
                    details: "",
                    amount: null,
                })
                toastMessage = " Deleted..."
                showDeleteMessage()
                setDataVaildation(false)
                setDeleteMsg(false)
                setPopUpState(false)
                setInfromation(false)
                getEstimate()
                setErrors({
                    date: null,
                    details: "",
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
        <ToastContainer />

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
                            <Input type="text" value={values.details} handleChange={(e) => handleChange(e)} label="Need to Give" name="details" />
                            {dataVaildation ?<div className='text-[#dd0821] text-tiny pt-1'>{errors.details}</div> :null }
                        </div>

                        <div>
                            <Input type="number" label="Estimate Amount" value={values.amount} handleChange={(e) => handleChange(e)} name="amount" />
                            
                            {dataVaildation ?<div className='text-[#dd0821] text-tiny pt-1'>{errors.amount}</div> :null }

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
                                    <td className=' px-4 text-text-color text-sm py-2'>{v?.estimatePayment[0]?.details}</td>
                                    <td className=' px-4 text-[#dd0821] text-sm py-2'>{v?.estimatePayment[0]?.amount}</td>
                                    <td className='h-full flex justify-center px-4 text-text-color text-sm py-3 w-[50px]'><HiOutlinePencilAlt onClick={() => handleEdit(v, i)} className='text-[#50933e] hover:text-[#1e6510] duration-300 hover:cursor-pointer' /></td>
                                    <td className=' px-8 text-text-color text-sm py-2 w-[50px]'><HiOutlineTrash onClick={() => handleDelete(v, i)} className='hover:text-[#ff554b] hover:cursor-pointer duration-300 text-[#dd0821]' /></td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <InfromationPopup handleClick={handleInfromation} state={infromation} title={infromationMsg} actionbar={true}>
                    <div className='py-4 px-10 text-h5 font-semibold text-text-color text-center'>Did You want to Delete thie Record?</div>
                    <div className=' flex justify-end pb-2'>
                        <Button buttonName="Cancel" className="mr-4" handleClick={handleInfromation} />
                        <Button buttonName="Conform" className="mr-4" handleClick={handleDeleteApiCall} />


                    </div>
                </InfromationPopup>

            </Layout>
        </div>
    )
}

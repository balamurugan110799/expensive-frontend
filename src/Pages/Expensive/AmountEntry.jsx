import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import "react-datepicker/dist/react-datepicker.css";
import Input from '../../Fields/Input';
import Button from '../../Fields/Button';
import PopUp from '../../Components/Popup';
import axios from 'axios';
import InfromationPopup from '../../Components/InfromationPopup';
import { useDispatch, useSelector } from 'react-redux';
import {  yearGetAPI } from '../../Actions/YearSlice';

export default function AmountEntry() {
    const [startDate, setStartDate] = useState(new Date());
    const [popUpState, setPopUpState] = useState(false)
    const [action, setAction] = useState("")
    // const [getAmount, setGetAmount] = useState()
    const [infromation, setInfromation] = useState(false)
    const [infromationMsg, setInfromationMsg] = useState("")
    const  data  = useSelector((state => state.year))
    console.log(data)
    var toastMessage;

    const [values, setValues] = useState({
        year: null,
        amount: null
    })

    const [errors, setErrors] = useState({
        year: null,
        amount: null
    })

    const [vaild, setVaild] = useState(true)
    const [dataVaildation, setDataVaildation] = useState(false)

    const renderMonthContent = (month, shortMonth, longMonth) => {
        const tooltipText = `Tooltip for month: ${longMonth}`;
        console.log(shortMonth, longMonth, month)
        return <span title={tooltipText}>{shortMonth}</span>;
    };

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    if (vaild === true) {
        if (values.year === "" || values.year === undefined || values.year === null) {
            errors.year = "required"
        } else {
            errors.year = true
        }

        if (values.amount === "" || values.amount === undefined || values.amount === null) {
            errors.amount = "required"
        } else {
            errors.amount = true
        }
    }

    const popUpHandler = () => {
        setPopUpState(!popUpState)
        setAction("Add")
    }

    const setDate = (date, e) => {
        setStartDate(date)
    }
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        setVaild(true)
        setDataVaildation(true)
        const myData = new Date(startDate)
        const echoConvert = myData.getTime() / 1000.0;
        console.log(echoConvert, values, errors)
        values.year = echoConvert
        if (errors.year === true && errors.amount === true) {
            axios.post("http://localhost:4000/api/AddAmount", values)
                .then((res) => {
                    setValues({
                        year: null,
                        amount: null,
                    })
                    setDataVaildation(false)
                    setPopUpState(false)
                    setErrors({
                        year: null,
                        amount: null,
                    })
                    toastMessage = "Added Successfully"
                    dispatch(yearGetAPI())
                   
                    setTimeout(()=>{
                        showToastMessage()
                    },200)
                   
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

   


    const updateHandler = (e) => {
        e.preventDefault();
        var date = new Date(startDate)
        var myEcho = date.getTime() / 1000
        values.year = myEcho
        delete values.month;
        delete values.yearCal;
        Number(values.amount)
        console.log(values)
            axios.put(`http://localhost:4000/api/updateAmountEntry/${values?._id}`, values)
                .then((res) => {
                    console.log(res)
                    setValues({
                        year: null,
                        amount: null,
                    })
                    setDataVaildation(false)
                    setPopUpState(false)
                    setErrors({
                        year: null,
                        amount: null,
                    })
                    toastMessage = "Updated Successfully"
                    showToastMessage()
                    dispatch(yearGetAPI())
                })
                .catch((err) => {
                    console.log(err)
                })
        


    }
    const handleEdit = (v, i) => {
        setPopUpState(true)
        setAction("Updates")
        setValues(v)
        console.log(v)
        var time = new Date(v.year * 1000)
        setStartDate(time)
        console.log(time)

    }
    const handleDelete = (v, i) => {
        setInfromationMsg("Delete")
        setInfromation(true)
        setValues(v)

    }
    console.log(values)
    const handleInfromation = () => {
        setInfromation(!infromation)
    }

    const handleDeleteApiCall = () => {
        axios.delete(`http://localhost:4000/api/deleteEstimate/${values?._id}`)
            .then((res) => {
                dispatch(yearGetAPI())
                setPopUpState(false)
                setInfromation(false)
                toastMessage = " Deleted..."
                showDeleteMessage()
                setValues({
                    year: null,
                    amount: null,
                })
            })
            .then((err) => {
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
                    type={""}
                // message={popup.message}
                // handleClick={popUpHandler}
                >
                    <div className='grid grid-cols-1 gap-3 p-4 pb-0'>
                        <div>
                            <div className=' mb-1'>
                                <label class=" text-primary text-sm font-semibold">Select month and year</label>
                            </div>
                            <DatePicker
                                className="border p-1  text-text-color w-full h-[36px] text-sm"
                                selected={startDate}
                                onChange={(date, e) => setDate(date, e)}
                                renderMonthContent={renderMonthContent}
                                showMonthYearPicker
                                dateFormat="MM/yyyy"
                            />
                        </div>
                        <div className=' pb-10'>
                            <Input value={values.amount} label="Amount" handleChange={(e) => handleChange(e)} type="number" name="amount" />
                        </div>
                        <div className=' flex justify-end px-4'>
                            <Button buttonName="Cancel" handleClick={popUpHandler} className="mx-2 mt-4 mb-4" />
                            {action === "Add" ? <Button buttonName="Add" handleClick={submitHandler} className="mt-4 mb-4" /> :
                                <Button buttonName="Update" handleClick={updateHandler} className="mt-4 mb-4" />}
                        </div>
                    </div>
                </PopUp>

                <div className=' h-[300px] overflow-auto'>
                    <table className=' w-full'>
                        <thead>
                            <tr className='bg-primary text-[#fff]'>
                                <td className=' px-4 text-left py-2'>S.No</td>
                                <td className=' px-4 text-left py-2'>Year</td>
                                <td className=' px-4 text-left py-2'>Month </td>
                                <td className=' px-4 text-left py-2'> Amount</td>
                                <td className=' px-4 text-left py-2 w-[50px]'>Edit</td>
                                <td className=' px-4 text-left py-2 text-sm w-[50px]'>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.year?.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td className='px-4 text-text-color text-sm py-2'>{i}</td>
                                        <td className='px-4 text-text-color text-sm py-2'>{v?.yearCal}</td>
                                        <td className='px-4 text-text-color text-sm py-2'>{v?.month}</td>
                                        <td className='px-4 text-[#dd0821] text-sm py-2'>{v?.amount}</td>
                                        <td className='h-full flex justify-center px-4 text-text-color text-sm py-3 w-[50px]'><HiOutlinePencilAlt onClick={() => handleEdit(v, i)} className='text-[#50933e] hover:text-[#1e6510] duration-300 hover:cursor-pointer' /></td>
                                        <td className=' px-8 text-text-color text-sm py-2 w-[50px]'><HiOutlineTrash onClick={() => handleDelete(v, i)} className='hover:text-[#ff554b] hover:cursor-pointer duration-300 text-[#dd0821]' /></td>

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>


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


AmountEntry = React.memo(AmountEntry)
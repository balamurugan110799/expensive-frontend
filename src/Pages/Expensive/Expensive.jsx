import React, { useEffect, useState } from 'react'
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
import { yearGetAPI } from '../../Actions/YearSlice';
import { monthGetAPI } from '../../Actions/MonthsSlice';

export default function Expensive() {
    const [startDate, setStartDate] = useState(new Date());
    const [popUpState, setPopUpState] = useState(false)
    const [action, setAction] = useState("")
    // const [getAmount, setGetAmount] = useState()
    const [infromation, setInfromation] = useState(false)
    const [infromationMsg, setInfromationMsg] = useState("")
    const data = useSelector((state => state.year))

    const dispatch = useDispatch()

    const income = []

    // //(data, "data")

    const [expensiveState ,setExpensiveState]=useState()

    const initialValue = 0;

    data?.year.forEach((el) => {
        if (el?.income?.length === 1) {
            income.push(el)
        }
    })

    var toastMessage;

    const [values, setValues] = useState({
        timestamp: startDate,
        amount: null
    })

    const [errors, setErrors] = useState({
        timestamp: null,
        amount: null
    })

    const [vaild, setVaild] = useState(true)
    const [dataVaildation, setDataVaildation] = useState(false)

    const expensive = []
    data?.year.forEach((el) => {
        if (el?.expensive?.length === 1) {
            expensive.push(el)
        }
    })

    const renderMonthContent = (month, shortMonth, longMonth) => {
        const tooltipText = `Tooltip for month: ${longMonth}`;
        //(shortMonth, longMonth, month)
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
        if (values.timestamp === "" || values.timestamp === undefined || values.timestamp === null) {
            errors.timestamp = "required"
        } else {
            errors.timestamp = true
        }

        if (values.amount === "" || values.amount === undefined || values.amount === null) {
            errors.amount = "required"
        } else {
            errors.amount = true
        }
        // //(errors, "errors")
    }

    const popUpHandler = () => {
        setPopUpState(!popUpState)
        setAction("Add")
        values.timestamp = startDate
    }

    const setDate = (date, e) => {
        setStartDate(date)
    }
    // const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        setVaild(true)
        
        setDataVaildation(true)
        const myData = new Date(startDate)
        const echoConvert = myData.getTime() / 1000.0;
        //(echoConvert, values, errors)
        values.timestamp = echoConvert
        var obj = {
            timestamp: values.timestamp,
            amount: Number(values.amount),
            expensive: [{
                amount: Number(values.amount)
            }]
        }
     
        //(obj, values, errors,"vhsghghsdg")
        if (errors.timestamp === true && errors.amount === true) {
            axios.post("http://localhost:4000/api/AddExpensiveMonthWise", obj)
                .then((res) => {
                    setValues({
                        timestamp: null,
                        amount: null,
                    })
                    setDataVaildation(false)
                    setPopUpState(false)
                    setErrors({
                        timestamp: null,
                        amount: null,
                    })
                    toastMessage = "Added Successfully"
                    dispatch(yearGetAPI())

                    setTimeout(() => {
                        showToastMessage()
                    }, 200)

                })
                .catch((err) => {
                    //(err)
                })
        }

    }




    const updateHandler = (e) => {
        e.preventDefault();
        var date = new Date(startDate)
        var myEcho = date.getTime() / 1000
        values.timestamp = myEcho
        Number(values.amount)

        var obj = {
            timestamp: values.timestamp,
            amount: values.amount,
            income: [{
                amount: values.amount
            }]
        }

        axios.put(`http://localhost:4000/api/updateIncome/${values?._id}`, obj)
            .then((res) => {
                setValues({
                    timestamp: null,
                    amount: null,
                })
                setDataVaildation(false)
                setPopUpState(false)
                setErrors({
                    timestamp: null,
                    amount: null,
                })
                toastMessage = "Updated Successfully"
                dispatch(yearGetAPI())
                setTimeout(() => {
                    showToastMessage()
                }, 200)
            })
            .catch((err) => {
                //(err)
            })



    }
    const handleEdit = (v, i) => {
        setPopUpState(true)
        setAction("Updates")
        setValues(v)
        //(v)
        var time = new Date(v.timestamp * 1000)
        setStartDate(time)
        //(time)

    }
    const handleDelete = (v, i) => {
        setInfromationMsg("Delete")
        setInfromation(true)
        setValues(v)

    }
    const handleInfromation = () => {
        setInfromation(!infromation)
    }

    const handleDeleteApiCall = () => {

        axios.delete(`http://localhost:4000/api/deleteIncome/${values?._id}`)
            .then((res) => {
                dispatch(yearGetAPI())
                setPopUpState(false)
                setInfromation(false)
                toastMessage = " Deleted..."
                showDeleteMessage()
                setValues({
                    timestamp: null,
                    amount: null,
                })
            })
            .then((err) => {
                //(err)
            })

    }

    const getExpensive = () =>{
        axios.get("http://localhost:4000/api/getAllExpensiveMothWie")
        .then((res)=>{
            //(res.data)
            setExpensiveState(res.data)
        })
        .catch((err)=>{
            //(err)
        })
    }


    useEffect(()=>{
        getExpensive()
        // dispatch(monthGetAPI())
    },[])

    var expensiveData = []
    expensiveState?.data.forEach((el)=>{
        if(el?.expensive?.length === 1){
            expensiveData.push(el)
        }
    })

    console.log( useSelector((state => state.expensive)),"expensive")
    
    // //(expensiveState?.data,"dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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
                            {dataVaildation ? <span className=' text-[12px] text-[red]'>{errors?.timestamp}</span> : null}
                        </div>
                        <div className=' pb-10'>
                            <Input value={values.amount} label="Amount" handleChange={(e) => handleChange(e)} type="number" name="amount" />
                            {dataVaildation ? <span className='text-[12px] text-[red]'>{errors?.amount}</span> : null}

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
                            {expensiveData?.map((v, i) => {
                                //(v)
                                return (
                                    <tr key={i}>
                                        <td className='px-4 text-text-color text-sm py-2'>{i}</td>
                                        <td className='px-4 text-text-color text-sm py-2'>{v?.duration[0]?.year}</td>
                                        <td className='px-4 text-text-color text-sm py-2'>{v?.duration[0]?.monthof}</td>
                                        <td className='px-4 text-[#dd0821] text-sm py-2'>{v?.expensive[0]?.amount}</td>
                                        <td className='h-full flex justify-center px-4 text-text-color text-sm py-3 w-[50px]'><HiOutlinePencilAlt onClick={() => handleEdit(v, i)} className='text-[#50933e] hover:text-[#1e6510] duration-300 hover:cursor-pointer' /></td>
                                        <td className=' px-8 text-text-color text-sm py-2 w-[50px]'><HiOutlineTrash onClick={() => handleDelete(v, i)} className='hover:text-[#ff554b] hover:cursor-pointer duration-300 text-[#dd0821]' /></td>

                                    </tr>
                                )
                            })}

                            <tr className=' bg-[#ffd4cc]'>
                                <td></td>
                                <td></td>
                                <td className=' px-4 text-[#dd0821] text-sm py-2'>Total Amount</td>
                                <td className='px-4  text-[#dd0821] text-sm py-2'>{data?.year[0]?.income[0]?.total_amount}</td>
                                <td className='px-4 py-2'></td>
                                <td className='px-4 py-2'></td>
                            </tr>

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


Expensive = React.memo(Expensive)
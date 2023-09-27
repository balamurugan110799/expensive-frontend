import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import Button from '../../Fields/Button'
import PopUp from '../../Components/Popup'
import Input from '../../Fields/Input'
import axios from 'axios'
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { timeStamp } from '../Util/time'
// import timeStamp from "../Util/time"

export default function Estimate() {

  const [popUpState, setPopUpState] = useState(false)
  const [action, setAction] = useState("")
  const [getEstimateData, setEstimateData] = useState()
  const [startDate, setStartDate] = useState(new Date());

  const [values, setValues] = useState({
    plan: "",
    amount: null,
    date: null
  })

  const setDate = (date, e) => {
    setStartDate(date)
  }

  const [errors, setErrors] = useState({
    plan: "",
    amount: null,
    date: null
  })
  const [vaild, setVaild] = useState(false)

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
    if (values.plan === "" || values.plan === undefined) {
      errors.plan = "Enter the Plan"
    } else {
      errors.plan = true
    }

    if (values.amount === "" || values.amount === undefined || values.amount === null) {
      errors.amount = "Enter the Amount"
    } else {
      errors.amount = true
    }
  }

  const getEstimate = () => {
    axios.get("http://localhost:4000/api/getAllEstimate")
      .then((res) => {
        console.log(res)
        res.data.getEst.forEach((el) => {
          var date = new Date(el.date * 1000);
          var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          var year = date.getFullYear();
          var month = months[date.getMonth()];
          var date = date.getDate();
          var time = date+ "/" +month + "/"+ year
          el.showdate = time
          console.log(time)

          console.log(date)
        })

        setEstimateData(res.data.getEst)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  console.log(getEstimateData)
  useEffect(() => {
    getEstimate()
  }, [])
  // console.log(getEstimateData,"Data")

  const handleEdit = (v, i) => {
    setPopUpState(true)
    setValues(v)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(errors, values)
    setVaild(true)
    alert("Hello")
    var myDate = new Date(startDate); // Your timezone!
    var myEpoch = myDate.getTime() / 1000.0;
    values.date = myEpoch
    // console.log(myEpoch)
    if (errors.plan === true && errors.amount === true) {
      axios.post("http://localhost:4000/api/addEstimate", values)
        .then((res) => {
          console.log(res)
          setValues({
            plan: "",
            amount: null,
          })
          setPopUpState(false)
          getEstimate()
          setErrors({
            plan: "",
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
              <Input type="text" value={values.plan} handleChange={(e) => handleChange(e)} label="Estimate Plan" name="plan" />
              <div className='text-[#dd0821] text-tiny pt-1'>{errors.plan}</div>
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
              <td className=' px-4 text-left py-2'>Estimate Plan</td>
              <td className=' px-4 text-left py-2'>Estimate Amount</td>
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
                  <td className=' px-4 text-text-color text-sm py-2'>{v?.plan}</td>
                  <td className=' px-4 text-text-color text-sm py-2'>{v?.amount}</td>
                  <td className='h-full flex justify-center px-4 text-text-color text-sm py-3 w-[50px]'><HiOutlinePencilAlt onClick={() => handleEdit(v, i)} className='text-[#50933e] hover:text-[#1e6510] duration-300 hover:cursor-pointer' /></td>
                  <td className=' px-8 text-text-color text-sm py-2 w-[50px]'><HiOutlineTrash className='hover:text-[#ff554b] hover:cursor-pointer duration-300 text-[#dd0821]' /></td>

                </tr>
              )
            })}
          </tbody>

        </table>

      </Layout>
    </div>
  )
}

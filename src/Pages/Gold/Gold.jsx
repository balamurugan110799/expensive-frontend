import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import PopUp from '../../Components/Popup'
import Button from '../../Fields/Button'
import Input from '../../Fields/Input'
import DatePicker from "react-datepicker";
import SelectDropDown from '../../Fields/SelectDropDown'
import axios from 'axios'
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

export default function Gold() {
  const [popUpState, setPopUpState] = useState(false)
  const [action, setAction] = useState("")
  const [enumValue, setenumValue] = useState([
    { id: 0, name: "Boun", value: "boun" },
    { id: 1, name: "Gram", value: "gram" },
  ])

  const [startDate, setStartDate] = useState(new Date() );
  const [getGold, setGetGold] = useState()
  //(startDate)

  const [values, setValues] = useState({
    date: "",
    weight: "",
    total: undefined,
    price: undefined,
    eachPrice: undefined,
    gst: undefined
  })

  const [errors, setErrors] = useState({
    date: "",
    weight: "",
    total: undefined,
    price: undefined,
    eachPrice: undefined,
    gst: undefined
  })
  const [vaild, setVaild] = useState(false)
  const [vaildation, setVaildation] = useState(false)

  const setDate = (date, e) => {
    setStartDate(date)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }
  const handleEdit = (v, i) => {
    setValues(v)
    setPopUpState(true)
    //(v?.date)
    // setStartDate(v?.date)
    setAction("Update")
  }
  const popUpHandler = () => {
    setPopUpState(!popUpState)
    setAction("Add")
  }

  if (vaild === true) {
    values.date = startDate
    if (values.date === "" || values.date === undefined) {
      errors.date = "Fill the Date"
    } else {
      errors.date = true
    }

    if (values.weight === "" || values.weight === undefined) {
      errors.weight = "Enter the weight"
    } else {
      errors.weight = true
    }

    if (values.eachPrice === "" || values.eachPrice === undefined) {
      errors.eachPrice = "Enter the Each Amount"
    } else {
      errors.eachPrice = true
    }



    if (values.gst === "" || values.gst === undefined) {
      errors.gst = "Enter the GST Amount"
    } else {
      errors.gst = true
    }

    if (values.price === "" || values.price === undefined) {
      errors.price = "Enter the Total Amount"
    } else {
      errors.price = true
    }

    if (values.total === "" || values.total === undefined) {
      errors.total = "Enter the Total Amount"
    } else {
      errors.total = true
    }

    // if (errors.total === true && errors.price === true && values.gst === true && errors.amount === true && errors.eachPrice === true && errors.weight === true && errors.date === true) {
    //   setVaildation(true)
    // } else {
    //   setVaildation(false)
    // }
  }

  const updateHandler = (e) => {
    e.preventDefault();
    setVaild(true)
    ////(values)
    axios.put(`http://localhost:4000/api/updateGold/${values._id}`, values)
      .then((res) => {
        ////(res)
        setValues({
          date: "",
          weight: "",
          total: undefined,
          price: undefined,
          eachPrice: undefined,
          gst: undefined
        })
        setErrors({
          date: "",
          weight: "",
          total: undefined,
          price: undefined,
          eachPrice: undefined,
          gst: undefined
        })
        setPopUpState(false)
        getGoldData()
        setStartDate("")
      })
      .catch((err) => {
        ////(err)
      })
  }
  const submitHandler = (e) => {
    e.preventDefault();
    setVaild(true)
    values.date = startDate
    if (errors.total === true && errors.price === true && errors.gst === true && errors.eachPrice === true && errors.weight === true && errors.date === true) {
      axios.post("http://localhost:4000/api/addGold", values)
        .then((res) => {
          ////(res)
          setErrors({
            date: "",
            weight: "",
            total: undefined,
            price: undefined,
            eachPrice: undefined,
            gst: undefined
          })
          setPopUpState(false)
          setStartDate("")

        })
        .catch((err) => {
          ////(err)

        })
    }

  }

  const getGoldData = () => {
    axios.get("http://localhost:4000/api/getGold")
      .then((res) => {
        ////(res)
        setGetGold(res.data.data)
      })
      .catch((err) => {
        ////(err)
      })
  }

  useEffect(() => {
    getGoldData()
  }, [])
  ////(values.weight)

  return (
    <div>
      <Layout>
        <Button handleClick={popUpHandler} buttonName="Add" className="mb-2" />
        <PopUp
          state={popUpState}
          handleClick={popUpHandler}
          width={"md"}
          actionbar={true}
          title={action}
        // type={popup.type}
        // message={popup.message}
        // handleClick={popUpHandler}
        >
          <div className=' grid grid-cols-2 gap-3 p-4 pb-0'>
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
              <SelectDropDown setNameOption="Select the Weight" label="Weight" name="weight" className="w-full text-primary" value={values.weight} optionValue={enumValue} id="weight" handleChange={(e) => handleChange(e)} />
              <div className='text-[#dd0821] text-tiny pt-1'>{errors.weight}</div>

            </div>

            <div>
              <Input type="number" value={values.total} handleChange={(e) => handleChange(e)} label={`${values.weight === "boun" ? "Enter the Boun Weight" : `${values.weight === "gram" ? "Enter the Gram Weight" : "Enter the Gold Weight"} `}  `} name="total" />
              <div className='text-[#dd0821] text-tiny pt-1'>{errors.total}</div>
            </div>

            <div>
              <Input type="number" label={`${values.weight === "boun" ? "Each Amount of Boun" : `${values.weight === "gram" ? "Each Amount of Gram" : "Enter Amount"} `}  `} value={values.eachPrice} handleChange={(e) => handleChange(e)} name="eachPrice" />
              <div className='text-[#dd0821] text-tiny pt-1'>{errors.eachPrice}</div>

            </div>

            <div>
              <Input type="number" value={values.price} handleChange={(e) => handleChange(e)} label="Total Amount" name="price" />
              <div className='text-[#dd0821] text-tiny pt-1'>{errors.price}</div>


            </div>

            <div>
              <Input type="number" value={values.gst} handleChange={(e) => handleChange(e)} label="GST Amount" name="gst" />
              <div className='text-[#dd0821] text-tiny pt-1'>{errors.gst}</div>

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
              <td className=' px-4 text-left py-2'>Gram/Boun</td>
              <td className=' px-4 text-center py-2'>Total Gold</td>
              <td className=' px-4 text-left py-2'> 1 Gram/Boun Weight</td>
              <td className=' px-4 text-left py-2'>Price</td>
              <td className=' px-4 text-left py-2 '>GST</td>
              <td className=' px-4 text-left py-2 w-[50px]'>Edit</td>

              <td className=' px-4 text-left py-2 text-sm w-[50px]'>Delete</td>

            </tr>
          </thead>
          <tbody>
            {getGold?.map((v, i) => {
              // ////(i%2)
              return (
                <tr className={`${i % 2 === 1 ? "td" : null} `}>
                  <td className=' px-4 text-text-color text-sm py-2'>{i}</td>
                  <td className=' px-4 text-text-color text-sm py-2'>{v?.date}</td>
                  <td className={` px-4  text-sm py-2`}><div className={`${v?.weight === "boun" ? "bg-[#fff0cc] text-[#e09d00]" : "bg-[#f9cbbe] text-[#dd0821]"} w-[70px] text-center rounded-[10px]`}>   {v?.weight}</div></td>
                  <td className=' px-4 text-text-color text-center text-sm py-2'>{v?.total}</td>
                  <td className=' px-4 text-text-color text-sm py-2'>{v?.eachPrice}</td>
                  <td className=' px-4 text-[#dd0821] text-sm py-2'>{v?.price}</td>

                  <td className='  px-4 text-text-color text-sm py-2'>{v?.gst}</td>
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

import React, { useEffect } from "react";
import SideBar from "../Components/SideBar"
import Layout from "../Components/Layout";
import { HiCheck, HiOutlineRefresh, HiOutlineMinus } from "react-icons/hi";
import { RiGroupLine } from "react-icons/ri";
import { HiOutlineBookOpen } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
function Dashboard() {
    const today = new Date();
    // ////(today)
    var claimedDate = today.toDateString().split(" ");
    const [gold, setGold] = useState()
    // var dateSplit = today.split("")
    ////(claimedDate)
    // const [Months,setMonths]=useState([
    //     "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
    // ])

    const [values, setvalues] = useState()

    const [data, setData] = useState([
        {
            id: 0,
            month: "Jan",
            status: null,
            bike: "done",
            repco: "done",
            house_rent: "done",
            rice: "done",
            due_amount: "done",
            chittu: "done",
            slice: "done",
            electricity: "done",
        }, {
            id: 1,
            month: "Feb",
            status: null,
            bike: "done",
            repco: "done",
            house_rent: "done",
            rice: "done",
            due_amount: "done",
            chittu: "done",
            slice: "done",
            electricity: "done",
        }, {
            id: 2,
            month: "Mar",
            status: null,
            bike: "done",
            repco: "done",
            house_rent: "done",
            rice: "done",
            due_amount: "done",
            chittu: "done",
            slice: "done",
            electricity: "done",
        }, {
            id: 3,
            month: "Apr",
            status: null,
            bike: "done",
            repco: "done",
            house_rent: "done",
            rice: "done",
            due_amount: "done",
            chittu: "done",
            slice: "done",
            electricity: "done",
        }, {
            id: 4,
            month: "May",
            status: null,
            bike: "pending",
            repco: "done",
            house_rent: "done",
            rice: "done",
            due_amount: "done",
            chittu: "done",
            slice: "done",
            electricity: "done",
        }, {
            id: 5,
            month: "Jun",
            status: null,
            bike: null,
            repco: null,
            house_rent: null,
            rice: null,
            due_amount: null,
            chittu: null,
            slice: null,
            electricity: null,
        }, {
            id: 6,
            month: "Jul",
            status: null,
            status: null,
            bike: null,
            repco: null,
            house_rent: null,
            rice: null,
            due_amount: null,
            chittu: null,
            slice: null,
            electricity: null,
        }, {
            id: 7,
            month: "Aug",
            status: null,
            bike: null,
            repco: null,
            house_rent: null,
            rice: null,
            due_amount: null,
            chittu: null,
            slice: null,
            electricity: null,
        }, {
            id: 8,
            month: "Sep",
            status: null,
            bike: null,
            repco: null,
            house_rent: null,
            rice: null,
            due_amount: null,
            chittu: null,
            slice: null,
            electricity: null,
        }, {
            id: 9,
            month: "Oct",
            status: null,
            bike: null,
            repco: null,
            house_rent: null,
            rice: null,
            due_amount: null,
            chittu: null,
            slice: null,
            electricity: null,
        }, {
            id: 10,
            month: "Nov",
            status: null,
            bike: null,
            repco: null,
            house_rent: null,
            rice: null,
            due_amount: null,
            chittu: null,
            slice: null,
            electricity: null,
        }, {
            id: 11,
            month: "Dec",
            status: null,
            bike: null,
            repco: null,
            house_rent: null,
            rice: null,
            due_amount: null,
            chittu: null,
            slice: null,
            electricity: null,
        },

    ])


    var monObj = []
    var currentMont = []
    // const [flag,setFlag]=useState(false)
    var flag = false
    data.forEach((el) => {
        if (el.month === claimedDate[1]) {
            el.status = true
            flag = true
            currentMont.push(el)
            // ////(`${flag}`)
        } else {
            ////(flag)
            if (flag === true) {
                currentMont.push(el)
                ////(el)
            }
            if (flag === false) {
                monObj.push(el)
            }
        }
    })

    ////(currentMont)
    ////(monObj)

    const currentdata = currentMont.concat(monObj)
    ////(currentdata)
    var renderValues = []

    const getGold = () => {
        axios.get("http://localhost:4000/api/getGoldCal")
            .then((res) => {
                //(res)
                setGold(res.data)
            })
            .catch((err) => {
                //(err)
            })
    }

    useEffect(() => {
        getGold()
        setvalues(currentdata)
    }, [])


    ////(currentdata[0].month)
    return (
        <div>

            <Layout>


                <div className=' grid lg:grid-cols-4 smmd:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 py-4'>
                    <div className=' bg-[#ff5774] rounded-[6px] px-6 py-4'>
                        <div className=' grid grid-cols-2'>
                            <div>
                            <div className=' text-h4 text-[#fff]'>{gold?.totalGrams}</div>
                                <div className=' text-h5 text-[#fff]'>Total Gram</div>
                            </div>
                            {/* <div className=' flex justify-end'>
                                <div className=' h-[30px] w-[30px] center bg-[#ff8ea3] rounded-[50%] '>
                                    <RiGroupLine className=' text-[#dd0e49]' />
                                </div>
                            </div> */}
                        </div>
                        {/* <div className=' text-tiny text-[#fff] pt-4'>Lorem ipsum dolor sit amet</div> */}
                    </div>


                    <div className=' bg-[#9d63a6] rounded-[6px] px-6 py-4'>
                        <div className=' grid grid-cols-2'>
                            <div>
                            <div className=' text-h4 text-[#fff]'>{gold?.totalBouns}</div>
                                <div className=' text-h5 text-[#fff]'>Total Bouns</div>
                            </div>
                            {/* <div className=' flex justify-end'>
                                <div className=' h-[30px] w-[30px] center bg-[#cf92d8] rounded-[50%] '>
                                    <RiGroupLine className=' text-[#9d26b0]' />
                                </div>
                            </div> */}
                        </div>
                        {/* <div className=' text-tiny text-[#fff] pt-4'>Lorem ipsum dolor sit amet</div> */}
                    </div>

                    <div className=' bg-[#ffbd4c] rounded-[6px] px-6 py-4'>
                        <div className=' grid grid-cols-2'>
                            <div>
                                      <div className=' text-h4 text-[#fff]'>{gold?.totalGold}</div>
                                <div className=' text-h5 text-[#fff]'>Total Gold</div>
                        
                            </div>
                            {/* <div className=' flex justify-end'>
                                <div className=' h-[30px] w-[30px] center bg-[#ffd980] rounded-[50%] '>
                                    <RiGroupLine className=' text-[#ffb300]' />
                                </div>
                            </div> */}
                        </div>
                        {/* <div className=' text-tiny text-[#fff] pt-4'>Lorem ipsum dolor sit amet</div> */}
                    </div>


                  

                    <div className=' bg-[#27a79a] rounded-[6px] px-6 py-4'>
                        <div className=' '>
                            <div>
                                <div className=' text-h4 text-[#fff]'>{gold?.totalBuyPrize}</div>
                                <div className=' text-h5 text-[#fff]'>Total Amount for Gold</div>
                            </div>
                            {/* <div className=' flex justify-end'>
                                <div className=' h-[30px] w-[30px] center bg-[#93d2cc] rounded-[50%] '>
                                    <RiGroupLine className=' text-[#27a79a]' />
                                </div>
                            </div> */}
                        </div>
                        {/* <div className=' text-tiny text-[#fff] pt-4'>Lorem ipsum dolor sit amet</div> */}
                    </div>
                </div>

                <table className=" w-full">
                    <thead className="mb-2">
                        <tr className="bg-primary text-[#fff]">
                            <td className="px-4 text-left py-2"> Importance</td>
                            <td className="px-4 text-left py-2">{currentdata[0].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[1].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[2].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[3].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[4].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[5].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[6].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[7].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[8].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[9].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[10].month}</td>
                            <td className="px-4 text-left py-2">{currentdata[11].month}</td>
                        </tr>
                    </thead>


                    <tbody>
                        <tr className="my-2">
                            <td className="px-4 text-left">Bike</td>
                            <td className="px-4 mt-1 center">{currentdata[0].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[0].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[0].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[1].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[1].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[1].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[2].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[2].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[2].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[3].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[3].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[3].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[4].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[4].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[4].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[5].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[5].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[5].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[6].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[6].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[6].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[7].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[7].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[7].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[8].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[8].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[8].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[9].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[9].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[9].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[10].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[10].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[10].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[11].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[11].bike === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[11].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                        </tr>
                        <tr className="my-2">
                            <td className="px-4 text-left">Repco</td>
                            <td className="px-4 mt-1 center">{currentdata[0].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[0].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[0].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[1].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[1].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[1].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[2].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[2].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[2].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[3].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[3].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[3].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[4].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[4].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[4].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[5].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[5].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[5].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[6].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[6].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[6].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[7].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[7].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[7].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[8].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[8].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[8].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[9].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[9].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[9].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[10].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[10].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[10].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[11].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[11].repco === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[11].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>

                        </tr>
                        <tr className="mb-1">
                            <td className="px-4 text-center">Due Amount</td>
                            <td className="px-4 flex justify-center">{currentdata[0].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[0].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[0].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 relative">{currentdata[1].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto text-center" /> : currentdata[1].due_amount === null ? <HiOutlineMinus className="text-error mx-auto =" /> : currentdata[1].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto text-center" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[2].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[2].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[2].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[3].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[3].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[3].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[4].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[4].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[4].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[5].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[5].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[5].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[6].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[6].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[6].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[7].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[7].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[7].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[8].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[8].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[8].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[9].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[9].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[9].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[10].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[10].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[10].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>
                            <td className="px-4 text-left">{currentdata[11].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[11].due_amount === null ? <HiOutlineMinus className="text-error mx-auto" /> : currentdata[11].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto" /> : false}</td>

                        </tr>
                    </tbody>

                </table>


            </Layout>



            {/* <a href="/importance"><h1 >Importance</h1></a> */}

        </div>
    )
}

export default Dashboard
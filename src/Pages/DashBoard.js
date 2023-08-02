import React, { useEffect } from "react";
import SideBar from "../Components/SideBar"
import Layout from "../Components/Layout";
import { HiCheck , HiOutlineRefresh, HiOutlineMinus} from "react-icons/hi";
import { useState } from "react";
function Dashboard() {
    const today = new Date();
    // //console.log(today)
    var claimedDate = today.toDateString().split(" ");
    // var dateSplit = today.split("")
    //console.log(claimedDate)
    // const [Months,setMonths]=useState([
    //     "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
    // ])

    const [values,setvalues]=useState()

    const [data, setData] = useState([
        {
            id: 0,
            month: "Jan",
            status:null,
            bike:"done",
            repco:"done",
            house_rent:"done",
            rice:"done",
            due_amount:"done",
            chittu:"done",
            slice:"done",
            electricity:"done",
        }, {
            id: 1,
            month: "Feb",
            status:null,
            bike:"done",
            repco:"done",
            house_rent:"done",
            rice:"done",
            due_amount:"done",
            chittu:"done",
            slice:"done",
            electricity:"done",
        }, {
            id: 2,
            month: "Mar",
            status:null,
            bike:"done",
            repco:"done",
            house_rent:"done",
            rice:"done",
            due_amount:"done",
            chittu:"done",
            slice:"done",
            electricity:"done",
        }, {
            id: 3,
            month: "Apr",
            status:null,
            bike:"done",
            repco:"done",
            house_rent:"done",
            rice:"done",
            due_amount:"done",
            chittu:"done",
            slice:"done",
            electricity:"done",
        }, {
            id: 4,
            month: "May",
            status:null,
            bike:"pending",
            repco:"done",
            house_rent:"done",
            rice:"done",
            due_amount:"done",
            chittu:"done",
            slice:"done",
            electricity:"done",
        }, {
            id: 5,
            month: "Jun",
            status:null,
            bike:null,
            repco:null,
            house_rent:null,
            rice:null,
            due_amount:null,
            chittu:null,
            slice:null,
            electricity:null,
        }, {
            id: 6,
            month: "Jul",
            status:null,
            status:null,
            bike:null,
            repco:null,
            house_rent:null,
            rice:null,
            due_amount:null,
            chittu:null,
            slice:null,
            electricity:null,
        }, {
            id: 7,
            month: "Aug",
            status:null,
            bike:null,
            repco:null,
            house_rent:null,
            rice:null,
            due_amount:null,
            chittu:null,
            slice:null,
            electricity:null,
        }, {
            id: 8,
            month: "Sep",
            status:null,
            bike:null,
            repco:null,
            house_rent:null,
            rice:null,
            due_amount:null,
            chittu:null,
            slice:null,
            electricity:null,
        }, {
            id: 9,
            month: "Oct",
            status:null,
            bike:null,
            repco:null,
            house_rent:null,
            rice:null,
            due_amount:null,
            chittu:null,
            slice:null,
            electricity:null,
        }, {
            id: 10,
            month: "Nov",
            status:null,
            bike:null,
            repco:null,
            house_rent:null,
            rice:null,
            due_amount:null,
            chittu:null,
            slice:null,
            electricity:null,
        }, {
            id: 11,
            month: "Dec",
            status:null,
            bike:null,
            repco:null,
            house_rent:null,
            rice:null,
            due_amount:null,
            chittu:null,
            slice:null,
            electricity:null,
        },

    ])


    var monObj=[] 
    var currentMont=[]
    // const [flag,setFlag]=useState(false)
    var flag = false
    data.forEach((el)=>{
        if(el.month===claimedDate[1]){
            el.status = true
            flag=true
            currentMont.push(el)
            // //console.log(`${flag}`)
        }else{
          //console.log(flag)
            if(flag===true){
                currentMont.push(el)
                //console.log(el)
            }
            if(flag===false){
                monObj.push(el)
            }
        }
    })

    //console.log(currentMont)
    //console.log(monObj)

    const currentdata =  currentMont.concat(monObj)
    //console.log(currentdata)
    var renderValues = []
    useEffect(()=>{
        setvalues(currentdata)
    },[])


    //console.log(currentdata[0].month)
    return (
        <div>
            <div className="w-[100%] flex">
                <div className="w-[20%]">
                    <SideBar />
                </div>
                <div className="w-[80%]">
                    <Layout>
                        <table>
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
                                    <td className="px-4 mt-1 center">{currentdata[0].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[0].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[0].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[1].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[1].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[1].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[2].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[2].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[2].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[3].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[3].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[3].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[4].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[4].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[4].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[5].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[5].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[5].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[6].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[6].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[6].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[7].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[7].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[7].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[8].bike === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[8].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[8].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[9].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[9].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[9].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[10].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[10].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[10].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[11].bike === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[11].bike === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[11].bike === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                </tr>
                                <tr className="my-2">
                                    <td className="px-4 text-left">Repco</td>
                                    <td className="px-4 mt-1 center">{currentdata[0].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[0].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[0].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[1].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[1].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[1].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[2].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[2].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[2].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[3].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[3].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[3].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[4].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[4].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[4].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[5].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[5].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[5].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[6].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[6].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[6].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[7].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[7].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[7].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[8].repco === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[8].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[8].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[9].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[9].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[9].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[10].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[10].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[10].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[11].repco === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[11].repco === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[11].repco === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                              
                                </tr>
                                <tr className="mb-1">
                                    <td className="px-4 text-center">Due Amount</td>
                                    <td className="px-4 flex justify-center">{currentdata[0].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[0].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[0].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 relative">{currentdata[1].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto text-center"/> : currentdata[1].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto ="/>  : currentdata[1].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto text-center"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[2].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[2].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[2].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[3].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[3].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[3].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[4].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[4].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[4].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[5].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[5].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[5].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[6].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[6].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[6].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[7].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[7].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[7].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[8].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto" /> : currentdata[8].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[8].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[9].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[9].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[9].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[10].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[10].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[10].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                                    <td className="px-4 text-left">{currentdata[11].due_amount === "done" ? <HiCheck className="text-whatsapp mx-auto"/> : currentdata[11].due_amount === null   ? <HiOutlineMinus className="text-error mx-auto"/>  : currentdata[11].due_amount === "pending" ? <HiOutlineRefresh className="text-alert mx-auto"/> : false}</td>
                              
                                </tr>
                            </tbody>
                           
                        </table>

                    </Layout>
                </div>
            </div>


            {/* <a href="/importance"><h1 >Importance</h1></a> */}

        </div>
    )
}

export default Dashboard
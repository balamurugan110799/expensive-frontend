import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./SideBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import YearSlice, { yearGetAPI } from "../Actions/YearSlice";
import { BsWallet2 } from "react-icons/bs";

function Layout(props) {
    const amount = useSelector(state => state.total_amount.total_amount)
    const [startDate, setStartDate] = useState(new Date());

    const year = useSelector((state) => state)
    // const dispatch = useDispatch
    // console.log(year)


    const renderMonthContent = (month, shortMonth, longMonth) => {
        const tooltipText = `Tooltip for month: ${longMonth}`;
        console.log(shortMonth, longMonth, month)
        return <span title={tooltipText}>{shortMonth}</span>;
    };
    const dispatch = useDispatch()
    useEffect(()=>{
        // dispatch(YearSlice())

    },[])


    const setDate = (date, e) => {
        var time = date.getTime() / 1000
        sessionStorage.setItem("time", time);
        dispatch(yearGetAPI(time))
        setStartDate(date)
    }

    useEffect(() => {
        dispatch(yearGetAPI())
    }, [])


    return (
        <div>
            <div className=" overflow-hidden">
                <div className=" grid grid-cols-12">
                    <div className=" col-span-2 bg-primary py-6">

                    </div>

                    <div className=" col-span-4">

                    </div>

                    <div className=" col-span-4 flex justify-end py-6">
                        <div className=" flex justify-end">
                            <DatePicker
                                className="border p-1 text-text-color  w-full h-[36px] text-sm"
                                selected={startDate}
                                onChange={(date, e) => setDate(date, e)}
                                renderMonthContent={renderMonthContent}
                                showMonthYearPicker
                                dateFormat="MM/yyyy"
                            />
                        </div>
                    </div>
                    <div className=" col-span-2">
                        
                    <div className="flex justify-end mx-4 py-6">
                                <BsWallet2 className="my-2.5 text-primary"/>
                                <span className="px-2 text-error leading-[34px] font-semibold">{amount}</span>
                            </div>
                    </div>
                </div>
                <div className=" grid grid-cols-12">
                    <div className="col-span-2 bg-primary">
                        <Sidebar />
                    </div>
                    <div className="col-span-10 px-4 py-4 bg-[#f2f2f2]">
                        {props.children}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default React.memo(Layout)
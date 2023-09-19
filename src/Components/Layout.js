import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./SideBar";

function Layout(props) {
    const amount = useSelector(state => state.total_amount.total_amount)
    // //console.log(useSelector(state=> state.total_amount.total_amount))
    return (
        <div>
            <div className=" overflow-hidden">
                <div className=" grid grid-cols-12">
                    <div className=" col-span-2 bg-primary py-6">

                    </div>
                    <div className=" col-span-10 flex justify-end py-6">
                        <p className="text-primary leading-[26px] font-semibold">Total :</p>
                        <span className="px-2 text-error leading-[26px] font-semibold">{amount}</span>
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

export default Layout
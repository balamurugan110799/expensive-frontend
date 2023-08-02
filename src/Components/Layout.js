import React from "react";
import { useSelector } from "react-redux";

function Layout(props) {
    const amount = useSelector(state => state.total_amount.total_amount)
    // //console.log(useSelector(state=> state.total_amount.total_amount))
    return (
        <div>
            <div className="h-[100vh] overflow-hidden">
                <div className="">
                    <div className="px-10 py-4">
                        <div className="w-[100%]">
                            <div className="flex justify-end ">
                                <div className="flex center">
                                    <p className="text-primary leading-[26px] font-semibold">Total :</p>
                                    <span className="px-2 text-error leading-[26px] font-semibold">{amount}</span> 
                                </div>
                           
                            </div>
                        </div>
                    </div>

                </div>
                <div className="h-[100%] bg-[#F0EEEE] py-6 px-6">
                    {props.children}
                </div>

            </div>

        </div>
    )
}

export default Layout
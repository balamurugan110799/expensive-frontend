import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {

    // console.log(sessionStorage.getItem("role"))
    // const auth = sessionStorage.getItem("auth")
    const role = sessionStorage.getItem("role")

    return (
        <div>
            <div className="bg-primary py-2 h-[88vh]">
                <ul className="px-4">
                    <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/dashboard">Dashboard</Link></li>
                    {role === "user" ?
                        <>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/create-year">Create Year</Link></li>

                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/importance">Importance</Link></li>
                            <li><Link className="text-white tracking-wider py-2" to="/extra-expensive">Extra Expansive</Link></li>
                        </>
                        : <></>
                    }

                    {role === "admin" ?
                        <>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/esitmate-payment">Esitmate Payment</Link></li>

                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/esitmate">Esitmate</Link></li>

                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/importance">Importance</Link></li>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/extra-expensive">Extra Expansive</Link></li>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/admin">Admin</Link></li>
                        </>
                        : null
                    }

                    {role === "super-admin" ?
                        <>
                            {/* <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/gold">Gold</Link></li>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/importance">Importance</Link></li>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/extra-expensive">Extra Expansive</Link></li>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/amount-entry">Amount Entry</Link></li> */}
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/income">Income Entry</Link></li>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/expensive">Expensive</Link></li>

                            {/* <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/admin">Admin</Link></li> */}
                        </>
                        : null
                    }



                </ul>
            </div>
        </div>
    )
}

export default React.memo(Sidebar)
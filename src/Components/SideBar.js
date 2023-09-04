import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {

    console.log(sessionStorage.getItem("role"))
    const auth = sessionStorage.getItem("auth")
    const role = sessionStorage.getItem("role")
    // const admin = sessionStorage.getItem("role")
    
    console.log(auth !== undefined || auth !== null && role === "user", auth !== undefined || auth !== null , role )
    console.log(sessionStorage.getItem("role")=== "admin")
    // console.log(auth !== undefined || auth !== null && user === "user", "baalaaa")
    // console.log(auth !== undefined || auth !== null && admin === "admin", "baalaaaadmin")

    return (
        <div>
            <div className="bg-primary h-[100vh] py-16">
                <ul className="px-4">
                <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/dashboard">Dashboard</Link></li>
                    { role === "user" ?
                        <>
                          
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/importance">Importance</Link></li>
                            <li><Link className="text-white tracking-wider py-2" to="/extra-expensive">Extra Expansive</Link></li>
                        </>
                        : <></>
                    }

                    {role === "admin"  ?
                        <>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/importance">Importance</Link></li>
                            <li><Link className="text-white tracking-wider py-2" to="/extra-expensive">Extra Expansive</Link></li>
                            <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/admin">Admin</Link></li>
                        </>
                        : null
                    }



                </ul>
            </div>
        </div>
    )
}

export default Sidebar
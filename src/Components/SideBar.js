import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div>
            <div className="bg-primary h-[100vh] py-16">
                <ul className="px-4">
                    <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/admin">Admin</Link></li>
                    <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/">Dashboard</Link></li>
                    <li className="mb-3"><Link className="text-white tracking-wider py-2" to="/importance">Importance</Link></li>
                    <li><Link className="text-white tracking-wider py-2" to="/extra-expensive">Extra Expansive</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
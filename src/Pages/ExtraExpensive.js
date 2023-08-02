import React from "react";
import Layout from "../Components/Layout";
import Sidebar from "../Components/SideBar";

function ExtraExpensive() {
    return (
        <div>
            <div className="w-[100%] flex">
                <div className="w-[20%]">
                    <Sidebar />
                </div>
                <div className="w-[80%]">
                    <Layout>
                    
                    </Layout>
                </div>
            </div>
        </div>
    )
}

export default ExtraExpensive
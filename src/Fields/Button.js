import React from "react";

function Button(props){
    return(
        <div>
            <button onClick={(e)=>props.handleClick(e)} className="bg-primary text-white w-[100px] my-4 px-6 py-1 ">
                {props.buttonName}
            </button>

        </div>
    )
}

export default Button
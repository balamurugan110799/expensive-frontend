import React from "react";

function Button(props){
    const {buttonName,handleClick,className} = props
    return(
        <div>
            <button onClick={(e)=>handleClick(e)} className={`${className} bg-primary text-white w-[100px] px-6 py-1  `}>
                {buttonName}
            </button>

        </div>
    )
}

export default Button
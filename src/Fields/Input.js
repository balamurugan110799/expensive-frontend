import React from "react";

function Input(props){
    return(
        <div className="block">
            <label className="block my-2">{props.label}</label>

            <input type={props.type} className="border " value={props.value} onChange={(e)=>props.handleChange(e)}/>
        </div>
    )
}

export default Input
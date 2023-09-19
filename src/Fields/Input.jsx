import React from "react";

function Input(props) {
    const {label, type, value,name, handleChange} = props
    return (
        <div className="block">
            <label className="text-primary text-sm font-semibold ">{label}</label>
            <input id={name} type={type} className="border p-1 mt-1  w-full h-[36px] text-sm " name={name} value={value} onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default Input
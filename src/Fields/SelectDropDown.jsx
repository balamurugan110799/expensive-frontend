import React from "react";

function SelectDropDown(props) {
    const { label, optionValue,value, handleChange, name, className ,setNameOption} = props
    // //(value)
    return (
        <div className="block w-full">
            <div>
                <label className="text-primary text-sm font-semibold ">{label}</label>
            </div>
            <select name={name} value={value} onChange={(e,) => { handleChange(e) }} className={`${className} border p-1 mt-1  w-full h-[36px] text-sm`} >
            <option style={{ display: "none" }}>{setNameOption}</option>
                {optionValue?.map((v) => {
                    return (
                        <option value={v?.value} >
                            {v?.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default SelectDropDown
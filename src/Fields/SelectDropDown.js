import React from "react";

function SelectDropDown(props){
    return(
        <div className="block">
            <label className="block my-2 ">{props.label}</label>
         
             
                    <select onChange={(e,)=>{props.hadleChangedropDown(e)}} className="w-[180px] border"  id="cars">
                    {props.value?.map((value)=>{
                           return(
                        <option value={value.value} >
                            {value.name}
                        </option>
                        )
                    })}
                        </select>
        </div>
    )
}

export default SelectDropDown
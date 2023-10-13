import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total_amount:100000
}

const expensive = createSlice({
    name:"expensive",
    initialState,
    reducers:{
        reduceramount:(state,action)=>{
            console.log(action.payload)
            let data = state.total_amount - action.payload
           state.total_amount =data
            // state
        },
        reducerExpensive:(state,action)=>{
            console.log(action.payload,"payload")
        }
    }
})

export const  {reduceramount, reducerExpensive} = expensive.actions

export default expensive.reducer
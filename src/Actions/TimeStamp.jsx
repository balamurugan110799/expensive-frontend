import { createSlice } from "@reduxjs/toolkit";

const initialState={
    timestamp:null,
    status:"idel",//loading //success //error,
    error:null
}

const timeStampSlice =  createSlice({
    name:"timestamp",
    initialState,
    reducers:{
       timeStampAdd:(state,action)=>{
            state.timestamp = action.payload
            state.status="success"
            // //(action.payload)
       }
    }
})

export const {timeStampAdd} = timeStampSlice.actions

export default timeStampSlice.reducer
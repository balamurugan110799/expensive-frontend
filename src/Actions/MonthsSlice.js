import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
    expensive: [],
    status: "idel",//loading, success, error
    error: "",
    timestamp: null
}
const BASR_URL = "http://localhost:4000/api/getAllExpensiveMothWise"

export const monthGetAPI = createAsyncThunk("get/month", async (time) => {
    
    try {
        console.log(time,"timer")
        const response = axios.get(BASR_URL, time)
        return response

    } catch (err) {
        alert(`${err}`)
    }
})

const monthSlice = createSlice({
    name: "expensive",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(monthGetAPI.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(monthGetAPI.fulfilled, (state, action) => {
            state.status = "success"
        })
        builder.addCase(monthGetAPI.rejected, (state, action) => {
            state.status = "error"
        })
    }
})

// export const getAllYear = (state) => state.year.year
// export const getAllYear = (state) => initialState.year
// console.log(getAllYear,"redux")
export default monthSlice.reducer
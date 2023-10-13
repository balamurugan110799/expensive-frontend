import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

var initialState = {
    year: [],
    status: "idel",//loading, success, error
    error: "",
    timestamp: null
}
const BASR_URL = "http://localhost:4000/api/getAll"

export const yearGetAPI = createAsyncThunk("get/Year", async (time) => {
    
    try {
        console.log(time,"timer")
        const response = axios.get(BASR_URL, time)
        return response

    } catch (err) {
        alert(`${err}`)
    }
})

const YearSlice = createSlice({
    name: "year",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(yearGetAPI.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(yearGetAPI.fulfilled, (state, action) => {
            state.status = "success"
            console.log(action.payload.data.data ,"final Data")
            var time = Number(sessionStorage.time)
            var date = new Date(time * 1000);
            var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            var timeyear = date.getFullYear();
            var timemonth = months[date.getMonth()];

            var data = []
            const income = []


            action.payload.data.data?.forEach((el) => {
                var date = new Date(el.timestamp * 1000);
                var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                var year = date.getFullYear();
                var month = months[date.getMonth()];
                var date = date.getDate();
                var time = date + "/" + month + "/" + year
                el.month = month

                if (el?.income?.length === 1) {
                    income.push(el.amount)
                }

                if (timeyear === year) {
                    if (timemonth === month) {
                        data.push(el)
                    }
                }
            })


            
            const initialValue = 0;
            const sumWithInitial = income.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
            console.log(sumWithInitial, "data year")
            state.year = data
        })
        builder.addCase(yearGetAPI.rejected, (state, action) => {
            state.status = "error"
        })
    }
})

export const getAllYear = (state) => state.year.year
// export const getAllYear = (state) => initialState.year
// console.log(getAllYear,"redux")
export default YearSlice.reducer
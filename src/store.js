import { configureStore } from "@reduxjs/toolkit";
import Amount from "./Actions/expensive" 
import YearSlice from "./Actions/YearSlice";
import timeStampSlice from "./Actions/TimeStamp"

const store = configureStore({
    reducer:{
        total_amount :Amount,
        year:YearSlice,
        timestamp:timeStampSlice
    }
})

export default store
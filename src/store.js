import { configureStore } from "@reduxjs/toolkit";
import Amount from "./Actions/expensive" 

const store = configureStore({
    reducer:{
        total_amount :Amount
    }
})

export default store
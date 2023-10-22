import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./slices/loaderSlice";

const store=configureStore({
    reducer:{
        loaderState:loaderSlice.reducer,

    }
})

export default store;
import { createSlice } from "@reduxjs/toolkit";

const loaderSlice=createSlice({
    name:"loader",
    initialState:true,
    reducers:{
        setLoaderVisible(state,action){
            state=action.payload;
            return state;
        }
    }
});

export {loaderSlice};
export const {setLoaderVisible} = loaderSlice.actions;
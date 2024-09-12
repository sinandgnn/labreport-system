import { configureStore, createSlice } from "@reduxjs/toolkit"
import { loadAuthState, storeAuthState } from "./storage";
import { setToken } from "../../../lib/http";

const authSlice = createSlice({
    name: 'auth',
    initialState: loadAuthState(),
    reducers: {
        loginSuccess: (state, action) => {
            setToken(action.payload.token);
            state.id = action.payload.technician.id;
            state.fullName = action.payload.technician.fullName;
            state.email = action.payload.technician.email;
            state.hospitalIdentityNumber = action.payload.technician.hospitalIdentityNumber;
            state.admin = action.payload.technician.admin;
        },
        logoutSuccess: (state) => {
            setToken(null);
            state.id = 0;
            state.fullName = '';
            state.email = '';
            state.hospitalIdentityNumber = '';
            state.admin = false;
        }
    }
})

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})

store.subscribe(() => {
    storeAuthState(store.getState().auth);
})

export type RootState = ReturnType<typeof store.getState>;
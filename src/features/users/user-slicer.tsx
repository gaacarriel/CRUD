import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { iContact } from "../../pages/dashboardPage"

interface iUserState{
    value: iContact[];
}

// Valor inicial do meu estado que armazena a lista de usuários.
const initialState: iUserState = {
    value: [],
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        save: (state, { payload } : PayloadAction<iContact>) => {
            state.value.push(payload)
            console.log(payload);
        },
        edit: (state, { payload } : PayloadAction<iContact>) => {
            return;
        },
        remove: (state) => {
            state.value.filter(u => u.cpf == '')
        },
    }
})

export const {save, edit, remove} = userSlice.actions
export const userReducer = userSlice.reducer
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
            payload.id = state.value.length + 1
            state.value.push(payload)
            localStorage.setItem("@Users", JSON.stringify(state.value))
        },
        edit: (state, { payload }: PayloadAction<iContact>) => {
            return;
        },
        remove: (state, { payload }: PayloadAction<iContact>) => {
            state.value = state.value.filter(user => user.id !== payload.id)
        },
    }
})

export const {save, edit, remove} = userSlice.actions
export const userReducer = userSlice.reducer
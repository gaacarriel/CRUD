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
            const index = state.value.findIndex(user => user.id === payload.id)
            const user: any = payload.user

            for (let key in user){
                if(!user[key]){
                    delete user[key]
                }
            }

            const editUser = {...state.value[index], ...payload.user}
            state.value[index] = editUser 
            localStorage.setItem("@Users", JSON.stringify(state.value))
        },
        remove: (state, { payload }: PayloadAction<iContact>) => {
            state.value = state.value.filter(user => user.id !== payload.id)
            localStorage.setItem("@Users", JSON.stringify(state.value))
        },
        update: (state, { payload }: PayloadAction<iContact[]>) => {
            state.value = payload
        }
    }
})

export const {save, edit, remove, update} = userSlice.actions
export const userReducer = userSlice.reducer
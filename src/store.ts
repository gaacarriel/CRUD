import { configureStore } from "@reduxjs/toolkit" 
import { userReducer } from "./features/users/user-slicer"

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
})

// Criando uma tipagem dinâminca baseada no retorno da store
export type RootState = ReturnType<typeof store.getState> 
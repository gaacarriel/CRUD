import { configureStore } from "@reduxjs/toolkit" 
import { userReducer } from "./features/users/user-slicer"
import { recordReducer } from "./features/users/record.slicer"

export const store = configureStore({
    reducer: {
        users: userReducer,
        record: recordReducer,
    },
})

// Criando uma tipagem dinâminca baseada no retorno da store
export type RootState = ReturnType<typeof store.getState> 
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { iContact } from "../../pages/dashboardPage"

interface iRecordState{
    value: iContact | null
}

const initialState: iRecordState = {
    value: null
}

export const recordSlice = createSlice({
    name: "record",
    initialState,
    reducers: {
        save: (state, { payload }: PayloadAction<iContact>) => {
            state.value = payload
        }
    }
})

export const { save } = recordSlice.actions
export const recordReducer = recordSlice.reducer
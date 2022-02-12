import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Services
import getCharactersService from "service/getCharactersService"

// Types
import { charactersQueryParamTypes } from 'models'

export const getCharacters = createAsyncThunk(
    "characters/getCharacters",
    async (queryParams: charactersQueryParamTypes) => {
        const response = await getCharactersService(queryParams)
        return response
    }
)

export interface charactersStates {
    loading: boolean
    error: boolean
    errorString: string | undefined
    characterList: {} | null | undefined
}

const initialState: charactersStates = {
    loading: false,
    error: false,
    errorString: '',
    characterList: null
}

export const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        // setcharactersFilterParams: (
        //   state,
        //   action: PayloadAction<getCharactersInputTypes>
        // ) => {
        //   state.filterParams = { ...state.filterParams, ...action.payload }
        // },
        // clearcharactersFilterParams: (state) => {
        //   state.filterParams = {
        //     ...initialState.filterParams,
        //     firstDate: dayjs().startOf("day").format("L LTS"),
        //     lastDate: dayjs().endOf("day").format("L LTS"),
        //   }
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCharacters.pending, (state) => {
                state.loading = true
            })
            .addCase(getCharacters.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.characterList = action.payload
            })
            .addCase(getCharacters.rejected, (state, action) => {
                state.loading = false
                state.characterList = null
                state.error = true
                state.errorString = action.error.message
            })
    },
})

// export const { setcharactersFilterParams, clearcharactersFilterParams } =
//   charactersSlice.actions

// Selectors
export const selectCharacterList = (state: any) => state.characters.characterList.data 

export default charactersSlice.reducer

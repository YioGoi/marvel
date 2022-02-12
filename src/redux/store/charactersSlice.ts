import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

// Services
import getCharactersService from "service/getCharactersService"

// Types
import { charactersQueryParamTypes } from 'models'

interface charactersStates {
    loading: boolean
    error: boolean
    errorString: string | undefined
    characterList: {} | null | undefined
    limit: number
    offset: number
}

export const getCharacters = createAsyncThunk(
    "characters/getCharacters",
    async (queryParams: charactersQueryParamTypes) => {
        const response = await getCharactersService(queryParams)
        return response
    }
)

const initialState: charactersStates = {
    loading: false,
    error: false,
    errorString: '',
    characterList: null,
    limit: 30,
    offset: 0
}

export const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCharacters.pending, (state) => {
                state.loading = true
            })
            .addCase(getCharacters.fulfilled, (state: any, action) => {
                state.loading = false
                state.error = false
                console.log('offset state', current(state))
                // Initial request
                if (current(state)?.offset === 0) {
                    state.characterList = action.payload
                } else {
                    // User scrolled
                    // Concat new 30 results to the array
                    state.characterList.data.results = state.characterList.data.results.concat(action.payload?.data?.results)
                }

                state.limit = current(state)?.limit + 30
                state.offset = current(state)?.offset + 30
            })
            .addCase(getCharacters.rejected, (state, action) => {
                state.loading = false
                state.characterList = null
                state.error = true
                state.errorString = action.error.message
            })
    },
})

export const { setOffset, setLimit } = charactersSlice.actions

// Selectors
export const selectCharacterList = (state: any) => state.characters.characterList?.data 

export default charactersSlice.reducer

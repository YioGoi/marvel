import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

// Services
import getCharactersService from "service/getCharactersService"
import getComicsService from "service/getComicsService"

// Types
import { charactersQueryParamTypes, comicsQueryParamTypes } from 'models'

interface charactersStates {
    loading: boolean
    error: boolean
    errorString: string | undefined
    characterList: {} | null | undefined
    comicListById: {} | null | undefined
    offset: number
}

export const getCharacters = createAsyncThunk(
    "characters/getCharacters",
    async (queryParams: charactersQueryParamTypes) => {
        const response = await getCharactersService(queryParams)
        return response
    }
)

export const getCharacterComics = createAsyncThunk(
    "characters/getCharacterComics",
    async (queryParams: comicsQueryParamTypes, id) => {
        const response = await getComicsService(queryParams)
        return response
    }
)

const initialState: charactersStates = {
    loading: false,
    error: false,
    errorString: '',
    characterList: null,
    comicListById: null,
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
                
                // Initial request
                if (current(state)?.offset === 0) {
                    state.characterList = action.payload
                } else {
                    // User scrolled
                    // Concat new 30 results to the array
                    state.characterList.data.results = state.characterList.data.results.concat(action.payload?.data?.results)
                }
                
                // Prepare for next scroll load
                // Pass 30 items more for each load
                state.offset = current(state)?.offset + 30
            })
            .addCase(getCharacters.rejected, (state, action) => {
                state.loading = false
                state.characterList = null
                state.error = true
                state.errorString = action.error.message
            })
            .addCase(getCharacterComics.pending, (state) => {
                state.loading = true
            })
            .addCase(getCharacterComics.fulfilled, (state: any, action) => {
                state.loading = false
                state.error = false
                state.comicListById = action.payload
                
            })
            .addCase(getCharacterComics.rejected, (state, action) => {
                state.loading = false
                state.comicListById = null
                state.error = true
                state.errorString = action.error.message
            })
    },
})

// Selectors
export const selectCharacterList = (state: any) => state.characters.characterList?.data 
export const selectComicListById = (state: any) => state.characters.comicListById?.data 

export default charactersSlice.reducer

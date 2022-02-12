import { useEffect } from 'react'

// Styles
import './App.scss'

// Router
import {
  BrowserRouter
} from "react-router-dom"

// Redux
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getCharacters } from 'redux/store/charactersSlice'

// Models
import { charactersQueryParamTypes } from 'models'

// Components
import Router from './router'

function App() {
  const dispatch = useAppDispatch()
  const limit = useAppSelector(state => state.characters.limit)
  const offset = useAppSelector(state => state.characters.offset)

  useEffect(() => {
    let initialParams: charactersQueryParamTypes = {
      apikey: process.env.REACT_APP_API_KEY,
      limit: limit,
      offset: offset
    }
    dispatch(getCharacters(initialParams))
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  )
}

export default App

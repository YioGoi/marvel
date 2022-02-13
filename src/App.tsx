import { useEffect } from 'react'

// Styles
import './App.scss'

// Router
import {
  BrowserRouter
} from "react-router-dom"

// Redux
import { useAppDispatch } from 'redux/hooks'
import { getCharacters } from 'redux/store/charactersSlice'

// Models
import { charactersQueryParamTypes } from 'models'

// Components
import Router from './router'

function App() {
  const dispatch = useAppDispatch()

  // Initial call for character list
  useEffect(() => {
    let initialParams: charactersQueryParamTypes = {
      apikey: process.env.REACT_APP_API_KEY,
      limit: 30,
      offset: 0
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

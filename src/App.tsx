// Styles
import './App.scss'

// Router
import {
  BrowserRouter
} from "react-router-dom"

// Components
import Router from './router'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom'

// Styles
import './index.scss'

// Redux
import { store } from './redux/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

// Components
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

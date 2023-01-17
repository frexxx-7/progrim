import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FirebaseProvider from './providers/FirebaseProvider'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </FirebaseProvider>
  </React.StrictMode>
)

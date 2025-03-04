import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import router from './Router/index.jsx'
import {Provider} from 'react-redux'
import { store } from './store/Store.jsx'
import.meta.env

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
    

)

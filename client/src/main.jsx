import React from 'react'
import ReactDOM from 'react-dom/client'
import WrappedApp from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WrappedApp/>
    <ToastContainer
    position='top-right'
    autoClose={3000}
    bodyClassName="toastBody"
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme='colored'

    />
  </React.StrictMode>,
)
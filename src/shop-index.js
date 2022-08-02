import ReactDOM from "react-dom"
import React from "react"

import { App } from 'app'

const root = ReactDOM.createRoot(
  document.getElementById('react-shopify-test')
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
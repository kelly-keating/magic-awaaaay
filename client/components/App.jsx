import React from 'react'
import { Router, Link } from "@reach/router"

import Dash from './Dash'
import Sets from './Sets'

const App = () => {
  return (
    <Router>
      <Dash path="/" />
      <Sets path='sets' />
    </Router>
  )
}

export default App

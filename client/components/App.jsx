import React from 'react'
import { Router, Link } from "@reach/router"

import Dash from './Dash'
import Sets from './SetsHome'
import Set from './Set'
import Cards from './Cards'
import Collection from './Collection'


const App = () => {
  return (
    <Router>
      <Dash path="/" />
      <Sets path='sets' />
      <Set path='set/:setName' />
      <Cards path='cards' />
      <Collection path='my-collection' />
    </Router>
  )
}

export default App

import React from 'react'
import { Router, Link } from "@reach/router"

import Dash from './Dash'
import Sets from './SetsHome'
import Set from './Set'
import Cards from './CardsHome'
import Card from './CardSingle'
import Collection from './Collection'


const App = () => {
  return (
    <Router>
      <Dash path="/" />
      <Sets path='sets' />
      <Set path='sets/:setName' />
      <Cards path='cards' />
      <Card path='cards/:id' />
      <Collection path='my-collection' />
    </Router>
  )
}

export default App

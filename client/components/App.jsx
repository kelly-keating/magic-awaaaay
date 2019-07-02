import React from 'react'
import { Router, Link } from "@reach/router"

let Dash = () => <div>React development has begun!</div>
let Home = () => (
  <div>
    <h1>Home</h1>
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="dashboard">Dashboard</Link>
    </nav>
  </div>
)

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <Dash path="dashboard" />
    </Router>
  )
}

export default App

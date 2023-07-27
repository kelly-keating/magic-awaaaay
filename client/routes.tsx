import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import Dash from './components/Dash'
import Sets from './components/SetsHome'
import Set from './components/Set'
import Cards from './components/CardsHome'
import Card from './components/CardSingle'
import Collection from './components/Collection'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Dash />}>
      <Route path="sets" element={<Sets />} />
      <Route path="sets/:setName" element={<Set />} />
      <Route path="cards" element={<Cards />} />
      <Route path="cards/:id" element={<Card />} />
      <Route path="collection" element={<Collection />} />
    </Route>,
  ),
)

export default routes

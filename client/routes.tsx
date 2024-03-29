import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import Dash from './components/Dash'
import Sets from './components/Sets/Home'
import Set from './components/Set'
import Cards from './components/CardsHome'
import Card from './components/CardSingle'
import Collection from './components/Collection'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Dash />}>
      <Route index element={<Cards />} />
      <Route path="sets" element={<Sets />} />
      <Route path="sets/:setName" element={<Set />} />
      <Route path="cards/:id" element={<Card />} />
      {/* TODO: collection shouldn't be accessible unless logged in */}
      <Route path="collection" element={<Collection />} />
    </Route>,
  ),
)

export default routes

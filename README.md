# magic-awaaaay

## Getting started

```bash
  npm install
  npm run knex migrate:latest
  npm run reseed
```

Server runs on port 3000, client on port 5173.

```bash
  npm run dev
```

## Data

### Set

```ts
{
  id: string
  code: string
  name: string
  block: string
  block_code: string
  card_count: number
  icon_svg_uri: string
  released_at: string
  set_type: string
  uri: string
}
```

### Card

```ts
{
  id: string
  name: string
  card_faces: string
  cmc: number
  collector_number: number
  full_collector_number: string
  color_identity: string
  colors: string
  edhrec_rank: number
  flavor_text: string
  image_uris: string
  layout: string
  loyalty: string
  mana_cost: string
  oracle_text: string
  power: number
  prices: {
    usd: string | null
    usd_foil: string | null
    eur: string | null
    eur_foil: string | null
  }
  rarity: string
  scryfall_uri: string
  set: string
  set_name: string
  set_uri: string
  tcgplayer_id: number
  toughness: number
  type_line: string
  uri: string
}
```

### User Card

This keeps track of how many normal and foils of an individual card a user has.

```ts
{
  id: string
  user_id: string
  card_id: string
  quantity: number
  foil_quantity: number
}
```

A collection of them is usually presented to the client in a `CardCounts` object like this:

```ts
{
  "some-id": {
    normal: number
    foil: number
  }, 
  "some-other-id": {
    normal: number
    foil: number
  },
  // ...
}
```

### Currency

```ts
{
  usd: number
  eur: number
  date: string
}
```

## API routes

| path | method | protected | purpose |
|---|---|---|---|
| [/api/v1/currencies](#get---apiv1currencies) | GET | | Get current USD and EUR conversion to NZD |
| [/api/v1/sets](#get---apiv1sets) | GET | | Get all sets |
| [/api/v1/sets/:set](#get---apiv1setsset) | GET | | Gets the following about one set:<li>set information</li><li>cards that are part of that set</li><li>other sets from the same block</li><li>sets on either side of the current block</li> |
| [/api/v1/sets/:set/user-cards](#get---apiv1setssetuser-cards) | GET | yes | Gets the counts of all cards a user owns in a set |
| [/api/v1/cards](#get---apiv1cards) | GET | | Get all the cards |
| [/api/v1/cards/single/:id](#get---apiv1cardssingleid) | GET | | Get a single card by id |
| [/api/v1/cards/user](#get---apiv1cardsuser) | GET | yes | Get all the cards a user has |
| [/api/v1/cards/user](#post---apiv1cardsuser) | POST | yes | Add a card to a user's collection (or increase the quantity of existing cards) |
| [/api/v1/cards/search/:query](#get---apiv1cardssearchquery) | GET | | Search for cards by name, collector number, set, type, color, etc. |

### Request / response examples

#### GET - /api/v1/currencies

Response:

```ts
{
  usd: number,
  eur: number,
  date: string
}
```

#### GET - /api/v1/sets

Response:

```ts
Set[]
```

#### GET - /api/v1/sets/:set

Response:

```ts
{
  set: Set,
  cards: Card[],
  blockSets: Set[],
  neighbours: {
    before: [Set, Set],
    after: [Set, Set]
  }
}
```

#### GET - /api/v1/sets/:set/user-cards

Request:

```ts
// header
{
  Authorization: "Bearer <token>"
}
```

Response:

```ts
CardCounts
```


#### GET - /api/v1/cards

Response:

```ts
Card[]
```

#### GET - /api/v1/cards/single/:id

Response:

```ts
Card
```

#### GET - /api/v1/cards/user

Request:

```ts
// header
{
  Authorization: "Bearer <token>"
}
```

Response:

```ts
{
  cards: Card[]
  userCards: CardCounts
}
```

#### POST - /api/v1/cards/user

Request
  
```ts
// header
{
  Authorization: "Bearer <token>"
}

// body
{
  cardId: string
  normal: number
  foil: number
}
```

Response:

```ts
{
  id: string
  user_id: string
  card_id: string
  quantity: number
  foil_quantity: number
}
```

#### GET - /api/v1/cards/search/:query

Request:

```ts
// params
{
  query: string
}
```

| query | description | example |
|---|---|---|
| unowned | If true, only return cards that the user does not own | `?unowned=true` |
| excludeLand | If true, exclude all land cards | `?excludeLand=true` |
| rarity | Only return cards of a certain rarity | `?rarity=common` |
| colors | Only return cards of a certain color | `?colors=red,blue` |
| sets | Only return cards from a certain set | `?sets=grn,rna` |
| types | Only return cards of a certain type | `?types=creature,land` |

Response:

```ts
Card[]
```

## External APIs

Skryfall API: https://scryfall.com/docs/api
Free Currency Converter API: https://free.currencyconverterapi.com/

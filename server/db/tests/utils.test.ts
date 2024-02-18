import { describe, expect, it } from 'vitest'

import { condenseUserCards, prepCardForClient, prepCardForDb } from '../utils'
import { OneSidedCard, TwoSidedCard, UserCard } from '../../../models/cards'

// ----- TEST DATA -----

// One sided card
const simpleDbCard = { id: 'b1a32db7-e1a8-47d8-a708-987bcbf0636e', name: 'Keldon Warlord', cmc: 4, colors: '["R"]', layout: 'normal', loyalty: null, power: null, rarity: 'uncommon', set: '4ed', toughness: null, uri: 'https://api.scryfall.com/cards/b1a32db7-e1a8-47d8-a708-987bcbf0636e', collector_number: 207, full_collector_number: null, edhrec_rank: 18397, flavor_text: null, mana_cost: '{2}{R}{R}', oracle_text: "Keldon Warlord's power and toughness are each equal to the number of non-Wall creatures you control.", scryfall_uri: 'https://scryfall.com/card/4ed/207/keldon-warlord?utm_source=api', set_name: 'Fourth Edition', set_uri: 'https://api.scryfall.com/sets/2dd259d4-dc13-4956-a2dc-3e1d70b4a743', tcgplayer_id: 0, type_line: 'Creature — Human Barbarian', card_faces: null,
  color_identity: '["R"]',
  image_uris: '{"small":"https://cards.scryfall.io/small/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767","normal":"https://cards.scryfall.io/normal/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767","large":"https://cards.scryfall.io/large/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767","png":"https://cards.scryfall.io/png/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.png?1559603767","art_crop":"https://cards.scryfall.io/art_crop/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767","border_crop":"https://cards.scryfall.io/border_crop/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767"}',
  prices: '{"usd":"0.21","usd_foil":null,"usd_etched":null,"eur":"0.10","eur_foil":null,"tix":null}',
}
const simpleClientCard = { id: 'b1a32db7-e1a8-47d8-a708-987bcbf0636e', name: 'Keldon Warlord', cmc: 4, colors: '["R"]', layout: 'normal', loyalty: null, power: null, rarity: 'uncommon', set: '4ed', toughness: null, uri: 'https://api.scryfall.com/cards/b1a32db7-e1a8-47d8-a708-987bcbf0636e', collector_number: 207, full_collector_number: null, edhrec_rank: 18397, flavor_text: null, mana_cost: '{2}{R}{R}', oracle_text: "Keldon Warlord's power and toughness are each equal to the number of non-Wall creatures you control.", scryfall_uri: 'https://scryfall.com/card/4ed/207/keldon-warlord?utm_source=api', set_name: 'Fourth Edition', set_uri: 'https://api.scryfall.com/sets/2dd259d4-dc13-4956-a2dc-3e1d70b4a743', tcgplayer_id: 0, type_line: 'Creature — Human Barbarian', card_faces: null,
  color_identity: ['R'],
  image_uris: { small: 'https://cards.scryfall.io/small/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767', normal: 'https://cards.scryfall.io/normal/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767', large: 'https://cards.scryfall.io/large/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767', png: 'https://cards.scryfall.io/png/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.png?1559603767', art_crop: 'https://cards.scryfall.io/art_crop/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767', border_crop: 'https://cards.scryfall.io/border_crop/front/b/1/b1a32db7-e1a8-47d8-a708-987bcbf0636e.jpg?1559603767' },
  prices: { usd: '0.21', usd_foil: null, usd_etched: null, eur: '0.10', eur_foil: null, tix: null },
} as OneSidedCard

// Two sided card
const complexDbCard = { id: 'cb168e3c-2c78-4e70-a39b-06aa6a47998c', name: 'Child of the Pack // Savage Packmate', cmc: 4, colors: null, layout: 'transform', loyalty: null, power: null, rarity: 'uncommon', set: 'vow', toughness: null, uri: 'https://api.scryfall.com/cards/cb168e3c-2c78-4e70-a39b-06aa6a47998c', collector_number: 234, full_collector_number: null, edhrec_rank: 7225, flavor_text: null, mana_cost: null, oracle_text: null, scryfall_uri: 'https://scryfall.com/card/vow/234/child-of-the-pack-savage-packmate?utm_source=api', set_name: 'Innistrad: Crimson Vow', set_uri: 'https://api.scryfall.com/sets/8144b676-569f-4716-8005-bc8f0778f3fa', tcgplayer_id: 1, type_line: 'Creature — Human Werewolf // Creature — Werewolf', image_uris: null,
  card_faces: '[{"object":"card_face","name":"Child of the Pack","mana_cost":"{2}{R}{G}","type_line":"Creature — Human Werewolf","oracle_text":"{2}{R}{G}: Create a 2/2 green Wolf creature token.\\nDaybound (If a player casts no spells during their own turn, it becomes night next turn.)","colors":["G","R"],"power":"2","toughness":"5","flavor_text":"Her face shines with youthful innocence.","artist":"Mila Pesic","artist_id":"81c5ec23-220b-4efa-b7df-9e49dd371e8d","illustration_id":"715b46b4-d669-4162-9acb-10d5fa7cbe3e","image_uris":{"small":"https://cards.scryfall.io/small/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935","normal":"https://cards.scryfall.io/normal/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935","large":"https://cards.scryfall.io/large/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935","png":"https://cards.scryfall.io/png/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.png?1643593935","art_crop":"https://cards.scryfall.io/art_crop/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935","border_crop":"https://cards.scryfall.io/border_crop/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935"}},{"object":"card_face","name":"Savage Packmate","flavor_name":"","mana_cost":"","type_line":"Creature — Werewolf","oracle_text":"Trample\\nOther creatures you control get +1/+0.\\nNightbound (If a player casts at least two spells during their own turn, it becomes day next turn.)","colors":["G","R"],"color_indicator":["G","R"],"power":"5","toughness":"5","flavor_text":"Her claws are another matter.","artist":"Mila Pesic","artist_id":"81c5ec23-220b-4efa-b7df-9e49dd371e8d","illustration_id":"40094165-dfb2-4115-b243-eaeca75aa9dc","image_uris":{"small":"https://cards.scryfall.io/small/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935","normal":"https://cards.scryfall.io/normal/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935","large":"https://cards.scryfall.io/large/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935","png":"https://cards.scryfall.io/png/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.png?1643593935","art_crop":"https://cards.scryfall.io/art_crop/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935","border_crop":"https://cards.scryfall.io/border_crop/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935"}}]',
  color_identity: '["G","R"]',
  prices: '{"usd":"0.12","usd_foil":"0.46","usd_etched":null,"eur":"0.15","eur_foil":"0.26","tix":"0.03"}',
}
const complexClientCard = { id: 'cb168e3c-2c78-4e70-a39b-06aa6a47998c', name: 'Child of the Pack // Savage Packmate', cmc: 4, colors: null, layout: 'transform', loyalty: null, power: null, rarity: 'uncommon', set: 'vow', toughness: null, uri: 'https://api.scryfall.com/cards/cb168e3c-2c78-4e70-a39b-06aa6a47998c', collector_number: 234, full_collector_number: null, edhrec_rank: 7225, flavor_text: null, mana_cost: null, oracle_text: null, scryfall_uri: 'https://scryfall.com/card/vow/234/child-of-the-pack-savage-packmate?utm_source=api', set_name: 'Innistrad: Crimson Vow', set_uri: 'https://api.scryfall.com/sets/8144b676-569f-4716-8005-bc8f0778f3fa', tcgplayer_id: 1, type_line: 'Creature — Human Werewolf // Creature — Werewolf', image_uris: null,
  card_faces: [
    { object: 'card_face', name: 'Child of the Pack', mana_cost: '{2}{R}{G}', type_line: 'Creature — Human Werewolf', oracle_text: '{2}{R}{G}: Create a 2/2 green Wolf creature token.\nDaybound (If a player casts no spells during their own turn, it becomes night next turn.)', colors: ['G', 'R'], power: '2', toughness: '5', flavor_text: 'Her face shines with youthful innocence.', artist: 'Mila Pesic', artist_id: '81c5ec23-220b-4efa-b7df-9e49dd371e8d', illustration_id: '715b46b4-d669-4162-9acb-10d5fa7cbe3e', image_uris: { small: 'https://cards.scryfall.io/small/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935', normal: 'https://cards.scryfall.io/normal/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935', large: 'https://cards.scryfall.io/large/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935', png: 'https://cards.scryfall.io/png/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.png?1643593935', art_crop: 'https://cards.scryfall.io/art_crop/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935', border_crop: 'https://cards.scryfall.io/border_crop/front/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935' } },
    { object: 'card_face', name: 'Savage Packmate', flavor_name: '', mana_cost: '', type_line: 'Creature — Werewolf', oracle_text: 'Trample\nOther creatures you control get +1/+0.\nNightbound (If a player casts at least two spells during their own turn, it becomes day next turn.)', colors: ['G', 'R'], color_indicator: ['G', 'R'], power: '5', toughness: '5', flavor_text: 'Her claws are another matter.', artist: 'Mila Pesic', artist_id: '81c5ec23-220b-4efa-b7df-9e49dd371e8d', illustration_id: '40094165-dfb2-4115-b243-eaeca75aa9dc', image_uris: { small: 'https://cards.scryfall.io/small/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935', normal: 'https://cards.scryfall.io/normal/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935', large: 'https://cards.scryfall.io/large/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935', png: 'https://cards.scryfall.io/png/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.png?1643593935', art_crop: 'https://cards.scryfall.io/art_crop/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935', border_crop: 'https://cards.scryfall.io/border_crop/back/c/b/cb168e3c-2c78-4e70-a39b-06aa6a47998c.jpg?1643593935' } },
  ],
  color_identity: ['G', 'R'],
  prices: { usd: '0.12', usd_foil: '0.46', usd_etched: null, eur: '0.15', eur_foil: '0.26', tix: '0.03' },
} as TwoSidedCard

const landForDb = { id: '65e8080f-9e4a-4fad-9ea3-09d5e0e1c816', name: 'Forest', cmc: 0, collector_number: 350, full_collector_number: null, colors: '[]', edhrec_rank: null, flavor_text: null, layout: 'normal', loyalty: null, mana_cost: '', oracle_text: '({T}: Add {G}.)', power: null, rarity: 'common', scryfall_uri: 'https://scryfall.com/card/ody/350/forest?utm_source=api', set: 'ody', set_name: 'Odyssey', set_uri: 'https://api.scryfall.com/sets/b0d90d2d-494a-4224-bfa0-36ce5ee281b1', toughness: null, type_line: 'Basic Land — Forest', uri: 'https://api.scryfall.com/cards/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816', card_faces: null, color_identity: '["G"]', tcgplayer_id: null,
  image_uris: '{"small":"https://cards.scryfall.io/small/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846","normal":"https://cards.scryfall.io/normal/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846","large":"https://cards.scryfall.io/large/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846","png":"https://cards.scryfall.io/png/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.png?1562913846","art_crop":"https://cards.scryfall.io/art_crop/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846","border_crop":"https://cards.scryfall.io/border_crop/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846"}',
  prices: '{"usd":"0.41","usd_foil":"2.55","usd_etched":null,"eur":"0.20","eur_foil":"2.97","tix":"0.03"}'
}
const landForClient = { id: '65e8080f-9e4a-4fad-9ea3-09d5e0e1c816', name: 'Forest', cmc: 0, collector_number: 350, full_collector_number: null, colors: '[]', edhrec_rank: null, flavor_text: null, layout: 'normal', loyalty: null, mana_cost: '', oracle_text: '({T}: Add {G}.)', power: null, rarity: 'common', scryfall_uri: 'https://scryfall.com/card/ody/350/forest?utm_source=api', set: 'ody', set_name: 'Odyssey', set_uri: 'https://api.scryfall.com/sets/b0d90d2d-494a-4224-bfa0-36ce5ee281b1', toughness: null, type_line: 'Basic Land — Forest', uri: 'https://api.scryfall.com/cards/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816', card_faces: null, color_identity: ['G'], tcgplayer_id: null,
  image_uris: { small: 'https://cards.scryfall.io/small/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846', normal: 'https://cards.scryfall.io/normal/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846', large: 'https://cards.scryfall.io/large/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846', png: 'https://cards.scryfall.io/png/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.png?1562913846', art_crop: 'https://cards.scryfall.io/art_crop/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846', border_crop: 'https://cards.scryfall.io/border_crop/front/6/5/65e8080f-9e4a-4fad-9ea3-09d5e0e1c816.jpg?1562913846' },
  prices: { usd: '0.41', usd_foil: '2.55', usd_etched: null, eur: '0.20', eur_foil: '2.97', tix: '0.03', }
} as OneSidedCard

// -----

describe('prepCardForClient', () => {
  it('returns a correctly formatted SIMPLE camelCase card', () => {
    const preppedCard = prepCardForClient(simpleDbCard)
    expect(preppedCard).toEqual(simpleClientCard)
  })

  it('returns a correctly formatted COMPLEX camelCase card', () => {
    const preppedCard = prepCardForClient(complexDbCard)
    expect(preppedCard).toEqual(complexClientCard)
  })

  it('returns a correctly formatted land card', () => {
    const preppedCard = prepCardForClient(landForDb)
    expect(preppedCard).toEqual(landForClient)
  })
})

describe('prepCardForDb', () => {
  it('returns a correctly formatted SIMPLE snake_case card', () => {
    const preppedCard = prepCardForDb(simpleClientCard)
    expect(preppedCard).toEqual(simpleDbCard)
  })

  it('returns a correctly formatted COMPLEX snake_case card', () => {
    const preppedCard = prepCardForDb(complexClientCard)
    expect(preppedCard).toEqual(complexDbCard)
  })

  it('returns a correctly formatted land card', () => {
    const preppedCard = prepCardForDb(landForClient)
    expect(preppedCard).toEqual(landForDb)
  })
})

describe('condenseUserCards', () => {
  it('returns an empty object when no user cards provided', () => {
    const userCards = [] as UserCard[]
    const actual = condenseUserCards(userCards)
    expect(actual).toEqual({})
  })

  it('successfully creates a card counts object (ONE CARD)', () => {
    const userCards = [
      { id: '1', user_id: 'user_1', card_id: 'card_1', quantity: 2, foil_quantity: 0 },
    ]

    const expected = {
      card_1: { normal: 2, foil: 0 },
    }

    const actual = condenseUserCards(userCards)
    expect(actual).toEqual(expected)
  })

  it('successfully creates a card counts object (MANY CARDS)', () => {
    const userCards = [
      { id: '1', user_id: 'user_1', card_id: 'card_1', quantity: 2, foil_quantity: 0 },
      { id: '2', user_id: 'user_1', card_id: 'card_100', quantity: 0, foil_quantity: 0 },
      { id: '3', user_id: 'user_1', card_id: 'card_17', quantity: 0, foil_quantity: 16 },
      { id: '4', user_id: 'user_1', card_id: 'card_17823a', quantity: 28, foil_quantity: 107 },
    ]

    const expected = {
      card_1: { normal: 2, foil: 0 },
      card_100: { normal: 0, foil: 0 },
      card_17: { normal: 0, foil: 16 },
      card_17823a: { normal: 28, foil: 107 },
    }

    const actual = condenseUserCards(userCards)
    expect(actual).toEqual(expected)
  })
})

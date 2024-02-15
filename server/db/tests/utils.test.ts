import { describe, expect, it, test } from 'vitest'

import { condenseUserCards, prepCardForClient, prepCardForDb } from '../utils'
import { OneSidedCard, TwoSidedCard } from '../../../models/cards'

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

// TODO: Land card

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
})

test.todo('condenseUserCards')

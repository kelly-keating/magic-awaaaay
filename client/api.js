import request from 'superagent'

export function getCardById (id) {
    return request
        .get(`/api/v1/cards/single/${id}`)
        .then(res => res.body)
}

export function getCardsFromSet (setName) {
    return request
        .get(`/api/v1/cards/set/${setName}`)
        .then(res => res.body)
}

export function getAllSets () {
    return request
        .get(`/api/v1/sets`)
        .then(res => res.body)
}
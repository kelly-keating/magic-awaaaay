import React from 'react'
import { Link } from "@reach/router"

import { getCardsFromSet } from '../api'


class Set extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            cards: []
        }
    }

    componentDidMount () {
        getCardsFromSet(this.props.setName)
            .then(cards => {
                this.setState({cards})
            })
    }

    getImg (card, size) {
        return JSON.parse(card.image_uris)[size]
    }

    renderBothFaces (card) {
        let [one, two] = JSON.parse(card.card_faces)
        return <><img src={one.image_uris.small} /> <img src={two.image_uris.small} /></>
    }


    renderCard (card, i) {
        return (
            <Link to={`/cards/${card.id}`}>
            <div key={i} style={{display: "inline-block", minWidth: "170px"}}>
                <p>{card.name}</p>
                {card.image_uris == undefined ? this.renderBothFaces(card) : <img src={this.getImg(card, 'small')} />}
            </div>
            </Link>
        )
    }

    render () {
        return (
        <>
            <section>
                <h1>{this.props.setName}!</h1>
                <h2>What a cool set</h2>
            </section>
            
            <section>
                {this.state.cards.map((card, i) => this.renderCard(card, i))}   
            </section>
    
            <Link to="/sets">Sets</Link> | <Link to="/">Home</Link>
        </>
    )}
} 

export default Set

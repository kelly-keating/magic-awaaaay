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
                // console.log(cards[0])
                this.setState({cards})
            })
    }

    getImg(card, size) {
        return JSON.parse(card.image_uris)[size]
    }


    renderCard (card) {
        return (
            <div style={{display: "inline-block", minWidth: "170px"}}>
                <p>{card.name}</p>
                {card.image_uris == undefined ? <p>nope</p> : <img src={this.getImg(card, "small")} />}
            </div>
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
                {this.state.cards.map(card => this.renderCard(card))}   
            </section>
    
            <Link to="/sets">Sets</Link> | <Link to="/">Home</Link>
        </>
    )}
} 

export default Set

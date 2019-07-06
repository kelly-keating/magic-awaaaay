import React from 'react'
import { Link } from "@reach/router"

import { getCardById } from '../api'


class Card extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            card: {}
        }
    }

    componentDidMount () {
        getCardById(this.props.id)
            .then(card => this.setState({ card }))
    }
    
    renderCard (card) {
        return (
            <>
                <img src={JSON.parse(card.image_uris).normal}/>
                <h3>{card.name}</h3>
                <h6>{card.set_name}</h6>
                <p>{card.type_line}</p>
                <p>{card.flavor_text}</p>
            </>
        )
    }

    render () {
        return (
        <>
            <section>
                {this.state.card.name == undefined ? <img src="https://i.giphy.com/media/11FuEnXyGsXFba/giphy.webp"/> : this.renderCard(this.state.card)}
            </section>
    
            <Link to="/">Home</Link>
        </>
        )
    }
} 

export default Card

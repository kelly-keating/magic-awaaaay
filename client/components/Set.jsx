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
        getCardsFromSet('ixalan')
            .then(cards => console.log(cards))
    }

    render () {
        return (
        <>
            <section>
                <h1>{this.props.setName}!</h1>
                <h2>What a cool set</h2>
            </section>
            
            <section>
                <div>Card</div>
                <div>Card</div>
                <div>Card</div>
                <div>Card</div>    
            </section>
    
            <Link to="/">Home</Link>
        </>
    )}
} 

export default Set

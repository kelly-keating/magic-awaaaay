import React from 'react'
import { Link } from "@reach/router"

import { getAllSets } from "../api"


class Sets extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            sets: []
        }
    }

    componentDidMount () {
        getAllSets()
            .then(sets => {
                this.setState({sets})
            })
    }

    render () {
        console.log(this.state)
        return (
        <>
            <section>
                <h1>Sets</h1>
                <h2>View cards under each set</h2>
            </section>
            
            <section>
                {this.state.sets.map(set => <p><Link to={set.name} >{set.name}</Link></p>)}    
            </section>
    
            <Link to="/">Home</Link>
        </>
    )}
} 

export default Sets

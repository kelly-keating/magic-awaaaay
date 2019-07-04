import React from 'react'
import { Link } from "@reach/router"

import { getAllSets } from "../api"


class Sets extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            core: [],
            blocks: []
        }
    }

    componentDidMount () {
        getAllSets()
            .then(sets => {
                const blocks = sets.reduce((tally, set) => {
                    let name = set.block || "core"
                    tally[name] ? tally[name].push(set) : tally[name] = [set]
                    return tally
                  }, {})
                const core = blocks.core
                delete blocks.core

                this.setState({core, blocks})
            })
    }

    renderBlock (block) {
        let [name, sets] = block
        return (
            <>
            <h4>{name}</h4>
            {sets.map(set => <p><Link to={set.name} >{set.name}</Link></p>)}
            </>
        )
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
                {this.state.core.length && this.renderBlock(["Core", this.state.core])}
                {Object.entries(this.state.blocks).map(block => this.renderBlock(block))}    
            </section>
    
            <Link to="/">Home</Link>
        </>
    )}
} 

export default Sets

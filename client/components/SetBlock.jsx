import React from 'react'
import { Link } from "@reach/router"


class Block extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    render () {
        let [name, sets] = this.props.block
        return (
            <>
            <h4 onClick={() => { this.setState({ visible: !this.state.visible }) }}>{name}</h4>
            {this.state.visible && sets.map(set => <p><Link to={set.name} >{set.name}</Link></p>)}
            </>
        )
    }
} 

export default Block

import React from 'react'
import { Link } from "@reach/router"


let Set = (props) => (
    <>
        <section>
            <h1>{props.setName}!</h1>
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
)

export default Set

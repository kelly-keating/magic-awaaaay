import React from 'react'
import { Link } from "@reach/router"


let Collection = () => (
    <>
        <section>
            <h1>My Collection</h1>
            <h2>Look at all your pretty cards</h2>
        </section>
        
        <section>
            {renderSet('ixalan')}
            {renderSet('rivals')}
            {renderSet('war of the spark')}  
        </section>

        <Link to="/">Home</Link>
    </>
)

const renderSet = (name) => (
    <>
        <h4>- {name}</h4>
        <p>Card 1</p>
        <p>Card 2</p>
        <p>Card 3</p>
    </>
)

export default Collection

import React from 'react'
import { Link } from "@reach/router"


let Dash = () => (
    <>
        <h1>Dash</h1>
        <section>
            <Link to="/sets"><div>Sets</div></Link>
            <Link to="/cards"><div>Cards</div></Link>
        </section>

        <div>
            <Link to="/cards">Search</Link> for a specific card
            or
            View your <Link to="/my-collection">collection</Link>
        </div>
    </>
)

export default Dash

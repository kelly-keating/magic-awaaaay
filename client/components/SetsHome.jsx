import React from 'react'
import { Link } from "@reach/router"


let Sets = () => (
    <>
        <section>
            <h1>Sets</h1>
            <h2>View cards under each set</h2>
        </section>
        
        <section>
            <div>Set1</div>
            <div>Set2</div>
            <div>Set3</div>     
        </section>

        <Link to="/">Home</Link>
    </>
)

export default Sets

import React, { useState } from 'react'
import {Products, NavBar} from './components'
import {commerce} from './lib/commerce'


const App = () => {
    const [products; setProducts] = useState([])
    return (
        <div>
            <NavBar />
            <Products />
        </div>
    )
}

export default App

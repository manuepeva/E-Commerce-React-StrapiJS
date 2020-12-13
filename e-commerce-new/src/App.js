import React, { useState, useEffect } from 'react'
import {Products, NavBar, Cart, Checkout} from './components'
import {commerce} from './lib/commerce'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        try {            
            const {data} = await commerce.products.list()
            setProducts(data)
        } catch (error) {
            console.log(error, 'error from products.list()')
        }
    }
    const fetchCart = async () => {
        try {          
            setCart(await commerce.cart.retrieve())
        } catch (error) {
            console.log(error, 'error from cart.retrieve()')
        }
    }
    const handleAddToCart = async (productId, quantity) => {
        try {
            const {cart} = await commerce.cart.add(productId, quantity)
            setCart(cart)
        } catch (error) {
            console.log(error, 'error from cart.add()')
        }
    }

    const handleUpdateCartQty = async (productId, quantity)=> {
        try {
            const {cart} = await commerce.cart.update(productId, {quantity})
            setCart(cart)
        } catch (error) {
            console.log(error, 'error from cart.update()')
        }
    }

    const handleRemoveFromCart = async (productId) => {
        try {
            const {cart} = await commerce.cart.remove(productId)
            setCart(cart)
        } catch (error) {
            console.log(error, 'error from cart.remove()')
        }
    }

    const handleEmptyCart = async () => {
        try {
            const {cart} = await commerce.cart.empty()
            setCart(cart)
        } catch (error) {
            console.log(error, 'error from cart.empty()')
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchCart() 
    }, [])
    return (
        <Router>
        <div>
            <NavBar totalItems = {cart.total_items} />
            <Switch>
                <Route exact path="/">
                <Products products={products} handleAddToCart={handleAddToCart}/>
                </Route>
                <Route exact path="/cart">
                <Cart cart={cart}
                handleEmptyCart={handleEmptyCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleUpdateCartQty={handleUpdateCartQty}
                />
                </Route>
                <Route exact path="/checkout">
                    <Checkout cart={cart}/>
                </Route>
                </Switch>
        </div>
        </Router>
    )
}

export default App

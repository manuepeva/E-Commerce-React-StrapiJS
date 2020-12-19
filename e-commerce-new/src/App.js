import React, { useState, useEffect } from 'react'
import {Products, NavBar, Cart, Checkout} from './components'
import {commerce} from './lib/commerce'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import styles from './index.module.css'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const fetchProducts = async () => {
        try {            
            const {data} = await commerce.products.list()
            setProducts(data)
        } catch (error) {
            console.log(error, 'error from products.list()')
            setErrorMessage(error.data.error.message)
        }
    }
    const fetchCart = async () => {
        try {          
            setCart(await commerce.cart.retrieve())
        } catch (error) {
            console.log(error, 'error from cart.retrieve()')
            setErrorMessage(error.data.error.message)
        }
    }
    const handleAddToCart = async (productId, quantity) => {
        try {
            const {cart} = await commerce.cart.add(productId, quantity)
            setCart(cart)
        } catch (error) {
            console.log(error, 'error from cart.add()')
            setErrorMessage(error.data.error.message)
        }
    }

    const handleUpdateCartQty = async (productId, quantity)=> {
        try {
            const {cart} = await commerce.cart.update(productId, {quantity})
            setCart(cart)
        } catch (error) {
            console.log(error, 'error from cart.update()')
            setErrorMessage(error.data.error.message)
        }
    }

    const handleRemoveFromCart = async (productId) => {
        try {
            const {cart} = await commerce.cart.remove(productId)
            setCart(cart)
        } catch (error) {
            console.log(error, 'error from cart.remove()')
            setErrorMessage(error.data.error.message)
        }
    }

    const handleEmptyCart = async () => {
        try {
            const {cart} = await commerce.cart.empty()
            setCart(cart)
        } catch (error) {
            console.log(error, 'error from cart.empty()')
            setErrorMessage(error.data.error.message)
        }
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const inconmingOrder = await commerce.checkout.capture(checkoutTokenId.id, newOrder)
            setOrder(inconmingOrder)
            refreshCart()
        } catch (error) {
            console.log(error, 'error from handleCaptureCheckout function')
            setErrorMessage(error.data.error.message)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchCart() 
    }, [])
    return (
        <Router>
        <div className="main_container">
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
                    <Checkout 
                    cart={cart}
                    order={order}
                    handleCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                    />
                </Route>
                </Switch>
        </div>
        </Router>
    )
}

export default App

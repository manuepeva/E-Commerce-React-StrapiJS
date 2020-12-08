import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './stylesCart'
import CartItem from './cartItem/CartItem'
import {Link} from 'react-router-dom'

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    const classes = useStyles()
    const EmptyCard = () => {
        <Typography variant="subtitle1">
            You Have No Items in Your Shopping.
                <Link to="/" className={classes.link}>
                Start Adding Something!
                </Link>!
            </Typography>
    }
    const FilledCart = () => (
        <div>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        {/* <CartItem /> */}
                        <CartItem item={item} 
                        handleUpdateCartQty={handleUpdateCartQty}
                        handleRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton}
                    size="large" 
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleEmptyCart}
                    >Empty Cart
                    </Button>
                    <Button className={classes.checkoutButton}
                    size="large" 
                    type="button"
                    variant="contained"
                    color="primary"
                    >Checkout
                    </Button>
                </div>
            </div>
        </div>
    )

    if(!cart.line_items) return 'Loading...'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} 
            variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCard /> : <FilledCart />}
        </Container>
    )
}

export default Cart

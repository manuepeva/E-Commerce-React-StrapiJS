import React from 'react'
import {Grid} from '@material-ui/core'
import Product from '../product/Product'
import useStyles from './stylesProducts'


const Products = ({products, handleAddToCart}) => {
    const classes = useStyles()
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} spacing={1}/>
            <Grid container spacing={2} alignContent="space-between">
                {
                    products.map((product) =>(
                        <Grid item key={product.id} 
                        xs={12} sm={6} md={4} lg={3}
                        >
                        <Product product={product} handleAddToCart={handleAddToCart}/>
                        </Grid>
                    ))
                }
            </Grid>
        </main>
    )
}

export default Products

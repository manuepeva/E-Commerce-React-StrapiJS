import React from 'react'
import {Grid} from '@material-ui/core'
import Product from '../product/Product'
import img1 from '../../img/e-commerce-shoe-1.png'
import img2 from '../../img/e-commerce-shoe-2.png'
import useStyles from './stylesProducts'
const products = [
    {id: 1, name: 'Shoes', description: 'Running Shoes', price: '$10', image: 'https://ae01.alicdn.com/kf/H4c109f6656804c34928f28d181bbee3dM/New-Outdoor-Men-Free-Running-for-Men-Jogging-Walking-Sports-Shoes-High-quality-Lace-up-Athietic.jpg_q50.jpg'},
    {id: 2, name: 'MacBook', description: 'Apple macbook', price: '$15', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nike-free-run-5-mens-0271-tested-1554407771.jpg'}
]

const Products = () => {
    const classes = useStyles()
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid
            container
            justify="center"
            spacing={4}
            >
                {
                    products.map((product) =>(
                        <Grid item key={product.id} 
                        xs={12} sm={6} md={4} lg={3}
                        >
                        <Product product={product}/>
                        </Grid>
                    ))
                }
            </Grid>
        </main>
    )
}

export default Products

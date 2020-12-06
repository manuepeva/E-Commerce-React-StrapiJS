import React from 'react'
import 
{AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import img1 from '../../img/e-commerce-shoe-1.png'
import useStyles from './stylesNavBar'
import {Link, useLocation} from 'react-router-dom'

const NavBar = ({totalItems}) => {
    const classes = useStyles()
    const location = useLocation()

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}
            color="inherit">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" className={classes.title} color="inherit">
                    <img src={img1} alt="Commmerce.js" height="25px"
                    className={classes.image}/>
                    E-Commerce with React
                </Typography>
                <div className={classes.grow}/>
                    {location.pathname === '/' && (
                          <div className={classes.button}>
                          <IconButton 
                          aria-label="Show Cart Items"
                          color="inherit"
                          component={Link}
                          to="/cart"
                          className={classes.cartCmp}
                          >
                              <Badge badgeContent={totalItems} color="secondary">
                                  <ShoppingCart />
                              </Badge>
                          </IconButton>
                  </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar

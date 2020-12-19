import React from 'react'
import 
{AppBar, Toolbar, IconButton, Badge,Typography} from '@material-ui/core'
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
                <Typography variant="h6" style={{textDecoration: 'none', padding: '3px', borderRadius: '2%'}} component={Link} to="/" className={classes.titleT} color="inherit">
                    <img src={img1} alt="Commmerce.js" height="25px"
                    className={classes.image} style={{borderRadius: '60%'}}/>&nbsp;
                    E-Commerce Products Pick One!
                </Typography>
                <div className={classes.grow}/>
                    {location.pathname === '/' && (
                          <div className={classes.buttonN}>
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

import React from 'react'
import {Typography, List, ListItem, ListItemText} from '@material-ui/core'

const Review = ({checkoutToken}) => {
    return (
        <div>
         <Typography variant="h6" gutterBottom>Order summary</Typography>   
         <List disablePadding>
             <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 67%)'}}>
            {checkoutToken.live.line_items.map((product) => (
                <ListItem style={{padding: '10px 0'}} key={product.name}>
                    <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}/>
                </ListItem>
            ))}
            {checkoutToken.line_items.map((item) => (
                <Typography variant="body2">{item.price.formatted_with_symbol}</Typography>
            ))}
            <ListItem style={{padding: '10px 0'}}>
                <ListItemText primary="Total"/>
                <Typography variant="subtitle1" style={{fontWeight: 700}}>
                    {checkoutToken.live.subtotal.formatted_with_symbol}
                </Typography>
            </ListItem>
         </div>
         </List>
        </div>
    )
}

export default Review

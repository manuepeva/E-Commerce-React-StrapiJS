import React, {useState, useEffect} from 'react'
import {CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button}
from '@material-ui/core'
import useStyles from './stylesCheckout'
import AddressForm from './adressForm/AddressForm'
import PaymentForm from '../checkout/paymentForm/PaymentForm'
import {commerce} from '../../lib/commerce'


const steps = ['Shipping Address', 'Payment Details']


const Checkout = ({cart}) => {
    const [activeStep, setActiveSte] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const classes = useStyles()

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                console.log(token, 'token from token')
                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
            }
        }
        generateToken()
    }, [cart])

    const Confirmation = () => {
        <div>Confirmation</div>
    }


    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken}/> 
    : <PaymentForm />


    return (
        <CssBaseline>
            <div className={classes.toolbar}/>   
            <main className={classes.layout}>
                <Paper className={classes.paper} variant="outlined" elevation={5}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </CssBaseline>
    )
}

export default Checkout

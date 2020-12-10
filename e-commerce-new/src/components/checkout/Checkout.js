import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button}
from '@material-ui/core'
import useStyles from './stylesCheckout'
import AddressForm from '../checkout/adressForm/AddressForm'
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
    }, [])

    const Confirmation = () => {
        <div>Confirmation</div>
    }


    const Form = () => activeStep === 0 
    ? <AddressForm /> : <PaymentForm />
    return (
        <AddressForm>
            <div className={classes.toolbar}/>   
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        console.log(steps, 'steps from checkout')
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </AddressForm>
    )
}

export default Checkout

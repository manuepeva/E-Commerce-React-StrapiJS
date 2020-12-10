import React, {useState} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button}
from '@material-ui/core'
import useStyles from './stylesCheckout'
import AddressForm from '../checkout/adressForm/AddressForm'
import PaymentForm from '../checkout/paymentForm/PaymentForm'

const steps = ['Shipping Address', 'Payment Details']


const Checkout = () => {
    const [activeStep, setActiveSte] = useState(1)
    const classes = useStyles()

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

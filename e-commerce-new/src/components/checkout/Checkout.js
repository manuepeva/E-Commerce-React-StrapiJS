import React, {useState, useEffect} from 'react'
import {CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button}
from '@material-ui/core'
import useStyles from './stylesCheckout'
import AddressForm from './adressForm/AddressForm'
import PaymentForm from '../checkout/paymentForm/PaymentForm'
import {commerce} from '../../lib/commerce'


const steps = ['Shipping Address', 'Payment Details']


const Checkout = ({cart, order, handleCaptureCheckout, error}) => {
    const [activeStep, setActiveSte] = useState(0)
    const [token, setToken] = useState({})
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const classes = useStyles()

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                console.log(token, 'ldldld---')
                setCheckoutToken(token)
            } catch (error) {
                console.log(error, 'error from generate token')
            }
        }
        generateToken()
    }, [cart])

    const nextStep = () => setActiveSte((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveSte((prevActiveStep) => prevActiveStep - 1)
    
    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const Confirmation = () => {
        <div>Confirmation</div>
    }


    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next}/> 
    : <PaymentForm 
    shippingData={shippingData} 
    checkoutToken={checkoutToken} 
    nextStep={nextStep}
    backStep={backStep}
    handleCaptureCheckout={handleCaptureCheckout}
    />


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

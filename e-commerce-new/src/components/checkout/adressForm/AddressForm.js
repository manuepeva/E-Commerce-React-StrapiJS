import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import CustomTextField from '../customTextField/CustomTextField'
import { commerce } from '../../../lib/commerce'

const AddressForm = ({ checkoutToken }) => {
    const [countriess, setCountries] = useState({})
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubDivisions, setShippingSubDivisions] = useState([])
    const [shippingSubDivision, setShippingSubDivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const methods = useForm()
    let checkToken = checkoutToken.id
    const countries = Object.entries(countriess)
    const subdivisions = Object.entries(shippingSubDivisions)
    // let options = shippingOptions.map(() => )
    // const subdivisions = Object.entries(shippingSubDivisions).map(([code, name])=> 
    // {id: code; label: name})
    const cre = shippingSubDivision
    console.log(cre, '..._ss!')
    const fetchShippingCountries = async (checkoutTokenId) => {
        const dat = commerce.services.localeListShippingCountries(checkoutTokenId.id).then((res) =>
            setCountries(res.countries))
        let lm = commerce.services.localeListShippingCountries(checkoutTokenId.id).then((res) =>
            setShippingCountries(res.countries[1]))
        let lg = commerce.services.localeListShippingCountries(checkoutTokenId.id).then((res) =>
            setShippingCountry((Object.keys(res.countries))))
    }
    const fetchSubDivisions = async (countryCode) => {
        const response = await commerce.services.localeListSubdivisions(countryCode).then((res) =>
            setShippingSubDivision(Object.keys(res.subdivisions)[1]))
        const lg = await commerce.services.localeListSubdivisions(countryCode).then((res) =>
            setShippingSubDivisions(Object.values(res.subdivisions)))
        let lx = await commerce.services.localeListSubdivisions(countryCode).then((res) => 
        console.log(res, 'res....'))
    }
    const fetchShippingOptions = async (checkToken, country) => {
        const options = await commerce.checkout.getShippingOptions(checkToken, {
            country,
        }).then((res) => setShippingOptions(res))
        let fm = await commerce.checkout.getShippingOptions(checkToken, {
            country,
        }).then((res) => setShippingOption(res[0].id))
    }
    useEffect(() => {
        fetchShippingCountries(checkoutToken)
    }, [])
    
    useEffect(() => {
        if (shippingCountry) {
            fetchSubDivisions(shippingCountry)
        }
    }, [shippingCountry])
    useEffect(() => {
        if (shippingSubDivision) {
            fetchShippingOptions(checkoutToken.id, shippingCountry)
        }
    }, [shippingSubDivision])
    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form >
                    <Grid container spacing={1} xs={12} sm={6}>
                        <CustomTextField required name="firstName" label="First Name" />
                        <CustomTextField required name="lastName" label="Last Name" />
                        <CustomTextField required name="address1" label="Address" />
                        <CustomTextField required name="email" label="Email" />
                        <CustomTextField required name="city" label="City" />
                        <CustomTextField required name="zip" label="ZIP / Postal Code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country, id) => (
                                    <MenuItem key={id} value={country[0]}>
                                        {country[1]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubDivision} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)}>
                                {subdivisions.map((id, name) => (
                                    <MenuItem key={id} value={id[0]}>
                                        {id[1]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid> */}
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm

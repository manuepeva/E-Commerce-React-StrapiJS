import React, {useState, useEffect} from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import { useForm, FormProvider} from 'react-hook-form'
import CustomTextField from '../customTextField/CustomTextField'
import {commerce} from '../../../lib/commerce'

const AddressForm = ({checkoutToken}) => {
    const [countriess, setCountries] = useState({})
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubDivisions, setShippingSubDivisions] = useState([])
    const [shippingSubDivision, setShippingSubDivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const methods = useForm()
    
   let countries = Object.entries(countriess)
   console.log(shippingCountry, 'before return')
   let subdivisions = Object.entries(shippingSubDivisions)

    // const subdivisions = Object.entries(shippingSubDivisions).map(([code, name])=> 
    // {id: code; label: name})

    const fetchShippingCountries = async (checkoutTokenId) => {
        const dat = commerce.services.localeListShippingCountries(checkoutTokenId.id).then((res) => 
        setCountries(res.countries))
        let lm = commerce.services.localeListShippingCountries(checkoutTokenId.id).then((res)=> 
        setShippingCountries(res.countries))
        let lg = commerce.services.localeListShippingCountries(checkoutTokenId.id).then((res) =>
        setShippingCountry((Object.keys(res.countries))))
    }
    const fetchSubDivisions = async (countryCode) => {
        const response = await commerce.services.localeListSubdivisions(countryCode).then((res) => 
        setShippingSubDivision(Object.values(res.subdivisions)))
        const lg = await commerce.services.localeListSubdivisions(countryCode).then((res)=> 
        setShippingSubDivisions(res.subdivisions))
    }
    useEffect(() => {
        fetchShippingCountries(checkoutToken)
    }, [])

    useEffect(() => {
        if(shippingCountry) {
            fetchSubDivisions(shippingCountry)
        }
    }, [shippingCountry])
    return (
        <>
          <Typography variant="h6" gutterBottom>Shipping Address</Typography>
          <FormProvider {...methods}>
              <form >
                  <Grid container spacing={1} xs={12} sm={6}>
                    <CustomTextField required name="firstName" label="First Name"/>
                    <CustomTextField required name="lastName" label="Last Name"/>
                    <CustomTextField required name="address1" label="Address"/>
                    <CustomTextField required name="email" label="Email"/>
                    <CustomTextField required name="city" label="City"/>
                    <CustomTextField required name="zip" label="ZIP / Postal Code"/>
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
                        {subdivisions.map((sub, id) => (
                            <MenuItem key={id} value={sub[0]}>
                                {sub[1]}
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

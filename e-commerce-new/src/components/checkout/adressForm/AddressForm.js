import React, {useState, useEffect} from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import { useForm, FormProvider} from 'react-hook-form'
import CustomTextField from '../customTextField/CustomTextField'
import {commerce} from '../../../lib/commerce'

const AddressForm = ({checkoutToken}) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubDivisions, setShippingSubDivisions] = useState([])
    const [shippingSubDivision, setShippingSubDivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const methods = useForm()

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.lis
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }
    useEffect(() => {
        fetchShippingCountries(checkoutToken)
    }, [])
    return (
        <>
          <Typography variant="h6" gutterBottom>Shipping Address</Typography>
          <FormProvider {...methods}>
              <form >
                  <Grid container spacing={3}>
                    <CustomTextField required name="firstName" label="First Name"/>
                    <CustomTextField required name="lastName" label="Last Name"/>
                    <CustomTextField required name="address1" label="Address"/>
                    <CustomTextField required name="email" label="Email"/>
                    <CustomTextField required name="city" label="City"/>
                    <CustomTextField required name="zip" label="ZIP / Postal Code"/>
                    {/* <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.label}
                            </MenuItem>
                            ))}
                        </Select>
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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

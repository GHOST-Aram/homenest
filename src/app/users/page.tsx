"use client"
import React, { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import { 
    Box, 
    Button, 
    FormControl, 
    FormControlLabel, 
    FormHelperText, 
    FormLabel, 
    Radio, 
    RadioGroup 
} from '@mui/material'

const createUser = async(data: Object) =>{
    const response = await fetch('/users/api', {
        'method': 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response
}
const SignUpForm = () => {
    const [status, setStatus] = useState('idle')
    const [formData, setFormData] = useState({
        fullName:'', 
        email: '', 
        password1: '', 
        password2: '', 
        role:'tenant'
    })


    const collectFormData = (event: ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <main className='py-16 px-8'>
            <form action="" >
                <Paper elevation={8} className='p-8 w-full space-y-4 md:w-4/5 lg:w-3/5 m-auto'>
                    <h1 className='text-center text-blue-600 font-md text-2xl'>
                        Welcome to Homenest
                    </h1>
                    
                   
                    <Box className='w-full flex flex-col lg:flex-row gap-4 justify-space-between'>
                        <FormControl fullWidth>
                            <TextField placeholder='Full name' sx={{width: '100%'}} 
                                required 
                                label='Full Name'
                                variant='outlined'
                                type='text' 
                                value={formData.fullName} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { collectFormData(e) }} 
                                name = {'fullName'}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField placeholder='Email' sx={{width: '100%'}}
                                required 
                                label='Email'
                                variant='outlined'
                                type='email' 
                                value={formData.email} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => collectFormData(e)} 
                                name ='email'
                            />
                        </FormControl>
                    </Box>
                    <Box className='w-full flex flex-col lg:flex-row gap-4 justify-space-between'>
                        <FormControl fullWidth>
                            
                            <TextField placeholder='Password' sx={{width: '100%'}}
                                required 
                                type='password' 
                                label='Password'
                                variant='outlined'
                                value={formData.password1} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => collectFormData(e)} 
                                name='password1'
                            />
                            <FormHelperText>Enter an aplhanumeric password of length 8-24</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField placeholder='Confirm Password' sx={{width: '100%'}}
                                required 
                                label='Confirm Password'
                                variant='outlined'
                                type='password' 
                                value={formData.password2} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => collectFormData(e)} 
                                name='password2'
                            />
                            <FormHelperText>Repeat password.</FormHelperText>
                        </FormControl>
                    </Box>
                    <FormControl fullWidth>
                        <FormLabel>Sign Up as</FormLabel>
                        <RadioGroup 
                            defaultValue={'tenant'} 
                            value={formData.role} 
                            name='role' 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => collectFormData(e)}
                            className='flex flex-row'
                        >
                            <FormControlLabel value={'tenant'} control={<Radio />} label={'Tenant'}/>
                            <FormControlLabel value={'landlord'} control={<Radio />} label={'Landlord'}/>
                        </RadioGroup>
                    </FormControl> 
                    <Button 
                        className='w-full bg-blue-700 text-white'
                        variant='contained' 
                        onClick={async()=> {
                            setStatus('loading')
                            console.log('started')
                            const response = await createUser({
                                name: formData.fullName,
                                email: formData.email,
                                password: formData.password1,
                                role: formData.role
                            })
                            const location = response.headers.get('Location')
                            console.log(await response.json())
                            console.log(location)
                            console.log(response.status)
                            setStatus('done')
                        }}
                    >
                        Sign Up
                    </Button>
                </Paper>
            </form>
        </main>
    )
}

export default SignUpForm
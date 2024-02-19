"use client"
import React, { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import { Box, Button } from '@mui/material'


const SignUpForm = () => {
    const [formData, setFormData] = useState({
        fullName:'', email: '', password1: '', password2: ''
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
                        <TextField placeholder='Full name' sx={{width: '100%'}} 
                            required type='text' 
                            value={formData.fullName} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { collectFormData(e) }} 
                            name = {'fullName'}
                        />
                        <TextField placeholder='Email' sx={{width: '100%'}}
                            required type='email' 
                            value={formData.email} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => collectFormData(e)} 
                            name ='email'
                        />
                    </Box>
                    <Box className='w-full flex flex-col lg:flex-row gap-4 justify-space-between'>
                        <TextField placeholder='Password' sx={{width: '100%'}}
                            required type='password' 
                            value={formData.password1} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => collectFormData(e)} 
                            name='password1'
                        />
                        <TextField placeholder='Confirm Password' sx={{width: '100%'}}
                            required type='password' 
                            value={formData.password2} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => collectFormData(e)} 
                            name='password2'
                        />
                    </Box>
                    <Button 
                        className='w-full bg-blue-700 text-white'
                        variant='contained' 
                        onClick={()=> console.log(formData)}
                    >
                        Sign Up
                    </Button>
                </Paper>
            </form>
        </main>
    )
}

export default SignUpForm
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const RightContainer = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'2rem'} pr={'1rem'}>
        <Typography variant='h2'>
            Are You Ready To Have Some Fun Time
        </Typography>
        <Typography variant='body1'>
            Click the button below to start your fun time!
        </Typography>
        <NavLink to='/signup'><Button>Get Started</Button></NavLink>
        <Typography variant='body1'>
            Already have an account? Click the button below!
        </Typography>
        <NavLink to='/login'><Button>Sign In</Button></NavLink>
    </Box>
  )
}

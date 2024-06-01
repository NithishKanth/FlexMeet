import { SignIn, SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='grid w-screen h-screen place-content-center '>
        <SignUp/>
    </main>
  )
}

export default SignUpPage
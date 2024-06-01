import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='grid w-screen h-screen place-content-center '>
        <SignIn/>
    </main>
  )
}

export default SignInPage
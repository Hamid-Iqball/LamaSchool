'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Image from 'next/image'

function loginPage() {
  return (
    <div className='flex items-center justify-center h-screen bg-lamaSkyLight'>
        <SignIn.Root>
            <SignIn.Step name="start" className='bg-white rounded-md p-12 shadow-2xl flex flex-col gap-2 text-black'>
                <h1 className='text-xl font-bold rounded-md flex items-center gap-2'>
                    <Image src="/logo.png" alt='' width={24} height={24} />
                    SchoolLAMA
                </h1>
                <h2 className='text-gray-400'>Sign in to your account</h2>
                <Clerk.GlobalError className='text-sm text-red-400'/>
                
            
                    <Clerk.Field name="identifier" className='flex flex-col gap-2'>
                        <Clerk.Label className='text-xs text-gray-500'>
                            UserName
                        </Clerk.Label>
                        <Clerk.Input 
                            type='text' 
                            name='identifier' 
                            required 
                            className='p-1 rounded-md ring-1 ring-gray-300'/>
                        {/* FieldError inside Field */}
                        <Clerk.FieldError className='text-xs text-red-400'/>
                    </Clerk.Field>

                    <Clerk.Field name="password" className='flex flex-col gap-2'>
                        <Clerk.Label className='text-xs text-gray-500'>
                            Password
                        </Clerk.Label>
                        <Clerk.Input 
                            type='password'  
                            name='password' 
                            required 
                            className='p-1 rounded-md ring-1 ring-gray-300'/>
                        {/* FieldError inside Field */}
                        <Clerk.FieldError className='text-xs text-red-400'/>
                    </Clerk.Field>

                    <SignIn.Action submit className='p-1 bg-blue-500 text-white rounded-md text mt-2'>
                        Sign In
                    </SignIn.Action>
         
                {/* End Form */}
            </SignIn.Step>
        </SignIn.Root>
    </div>
  )
}

export default loginPage

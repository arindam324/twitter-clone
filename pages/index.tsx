import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useNhostClient, useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import Button from '../components/Button'

const Home: NextPage = () => {
  const router = useRouter()

  const nhost = useNhostClient()
  const { isAuthenticated } = useAuthenticationStatus()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home')
    }
  }, [isAuthenticated])

  return (
    <div className='flex min-h-screen flex-col '>
      <Head>
        <title>twitter. it's what's happening</title>
        <link rel='icon' href='/twitter.ico' />
      </Head>
      <main className='bg-black p-8 text-white w-full min-h-screen'>
        {!isAuthenticated && (
          <div>
            <Image src='/twitter.svg' width={60} height={60} alt='logo' />
            <h1 className='text-4xl mt-6 font-bold'>
              Happening <br /> now
            </h1>
            <p className='font-semibold text-xl mt-8'>Join Twitter Today.</p>
            <div className='w-[80%] mt-4 space-y-4'>
              <Button
                onClick={() =>
                  nhost.auth.signIn({
                    provider: 'google',
                  })
                }
                color='#000'
                bg='#fff'
              >
                <Image src='/google.svg' width={20} height={20} />
                <p>Sign up with Google</p>
              </Button>
              <Button color='#000' bg='#fff'>
                <Image src='/GitHub.png' width={20} height={20} />
                <p>Sign up with Github</p>
              </Button>
              <div className='divider'>or</div>
              <Button bg='#228be6' outlineColor='#228be6'>
                <p>Sign up with email</p>
              </Button>

              <div>
                <h3 className='text-xl font-semibold'>Already have an account</h3>
                <Button outlineColor='#fff' color='#228be6' bg='#000'>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home

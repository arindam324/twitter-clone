import Image from 'next/image'
import { useSignOut } from '@nhost/nextjs'
import { HiOutlineSparkles } from 'react-icons/hi'
import { useUserContext } from '../Providers/UserProvider'

const Header = () => {
  const userContext = useUserContext()
  const { signOut } = useSignOut()
  return (
    <header className='flex p-4 items-center justify-between'>
      <div className='avatar flex items-center space-x-4'>
        <div onClick={() => signOut()} className='rounded-full cursor-pointer'>
          {userContext && <Image src={userContext?.avatarUrl} width={40} height={40} />}
        </div>
        <p className='text-xl font-semibold'>Home</p>
      </div>
      <HiOutlineSparkles size={20} className='cursor-pointer' />
    </header>
  )
}

export default Header

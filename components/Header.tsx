import Image from 'next/image'
import { HiOutlineSparkles } from 'react-icons/hi'
import { useUserContext } from '../Providers/UserProvider'

const Header = () => {
  const userContext = useUserContext()
  return (
    <header className='flex p-4 items-center justify-between'>
      <div className='avatar flex items-center space-x-4'>
        <div className='rounded-full'>
          {userContext && <Image src={userContext.user.image} width={40} height={40} />}
        </div>
        <p className='text-xl font-semibold'>Home</p>
      </div>
      <HiOutlineSparkles size={20} className='cursor-pointer' />
    </header>
  )
}

export default Header

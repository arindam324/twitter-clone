import Image from 'next/image'

const Avatar: React.FC<{ src: string; size: number }> = ({ src, size }) => {
  return <Image src={src} width={size} height={size} className='rounded-full' />
}

export default Avatar

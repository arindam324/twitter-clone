import Image from 'next/image'

const Avatar: React.FC<{ src: string | undefined; size: number }> = ({ src, size }) => {
  if (src) {
    return <Image src={src} width={size} height={size} className='rounded-full' />
  }
  return <div>No src Provided</div>
}

export default Avatar

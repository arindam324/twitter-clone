import { ReactNode } from 'react'

const Button: React.FC<{
  children: ReactNode
  bg: string
  color?: string
  outlineColor?: string
  onClick?: () => void
}> = ({ children, bg, color, outlineColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ background: bg, color: color, outlineColor: outlineColor }}
      className='px-8 py-2 w-full outline font-bold text-sm outline-1 flex items-center justify-center space-x-2  my-2 rounded-xl'
    >
      {children}
    </button>
  )
}

export default Button

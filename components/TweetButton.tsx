const TweetButton: React.FC<{ isDisable: boolean; onClick?: () => void }> = ({
  isDisable,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isDisable ? 'bg-blue-400 text-gray-300' : 'bg-blue-500 text-white'
      }  cursor-pointer x font-semibold text-sm w-20 h-8 rounded-xl`}
    >
      Tweet
    </button>
  )
}

export default TweetButton

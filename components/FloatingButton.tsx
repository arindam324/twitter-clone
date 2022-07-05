import Link from "next/link";
import { GiFeather } from "react-icons/gi";

const FloatingButton = () => {
  return (
    <Link href="/createTweet">
      <div className="w-16 h-16 cursor-pointer bg-blue-600 rounded-full flex items-center justify-center absolute bottom-4 right-4">
        <GiFeather size={30} className="text-white" />
      </div>
    </Link>
  );
};

export default FloatingButton;

import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { useState } from "react";

const TweetFooter: React.FC<{
  comment: number;
  retweet: number;
  favorites: number;
}> = ({ comment, retweet, favorites }) => {
  const [isFavourite, setFavourite] = useState<boolean>(false);

  return (
    <div className="flex mt-2  items-center justify-between">
      <div className="flex items-center space-x-2">
        <FaRegComment size={18} />
        <p>{comment}</p>
      </div>
      <div className="flex items-center space-x-2">
        <AiOutlineRetweet size={18} />

        <p>{retweet}</p>
      </div>
      <div
        onClick={() => setFavourite(!isFavourite)}
        className="flex items-center space-x-2"
      >
        {isFavourite ? (
          <AiFillHeart size={"18"} color="red" />
        ) : (
          <AiOutlineHeart size={18} />
        )}
        <p>{favorites}</p>
      </div>
      <div>
        <FiShare size={18} />
      </div>
    </div>
  );
};

export default TweetFooter;

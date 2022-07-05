import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useUserContext } from "../Providers/UserProvider";

import TweetButton from "../components/TweetButton";

const createTweet = () => {
  const [isDisable, setDisable] = useState<boolean>(true);

  const router = useRouter();

  const OnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisable(e.target.value.length === 0);
  };

  const user = useUserContext();

  return (
    <div>
      <Head>
        <title>Create Tweet</title>
        <link rel="icon" href="/twitter.ico" />
      </Head>
      <main className="bg-black w-full min-h-screen p-4">
        <div className="flex items-center justify-between">
          <BsArrowLeft
            size={20}
            className="cursor-pointer"
            onClick={() => router.back()}
          />

          <TweetButton isDisable={isDisable} />
        </div>
        <div className="flex space-x-4 mt-4">
          <div>
            {user && (
              <Image
                src={user.avatar}
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
          </div>
          <input
            onChange={OnInputChange}
            className="bg-black text-xl  w-full text-white focus:outline-none "
            placeholder="what's happening"
          />
        </div>
      </main>
    </div>
  );
};

export default createTweet;

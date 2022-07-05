import { lazy, Suspense } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "../../Providers/UserProvider";

import FloatingButton from "../../components/FloatingButton";
import Header from "../../components/Header";
import { TweetData } from "../../Data/Tweet";

const Tweet = lazy(() => import("../../components/Tweet"));

const Home: NextPage = () => {
  const user = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>Home / Twitter</title>
        <link rel="icon" href="/twitter.ico" />
      </Head>
      <main className="bg-black relative w-full text-white min-h-screen">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="divide-y divide-gray-500 ">
            {TweetData.map((item) => (
              <Tweet key={item.id} {...item} />
            ))}
          </div>
        </Suspense>
        <FloatingButton />
      </main>
    </div>
  );
};

export default Home;

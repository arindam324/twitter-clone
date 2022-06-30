import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "../Providers/UserProvider";

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
      <main className="bg-black w-full min-h-screen"></main>
    </div>
  );
};

export default Home;

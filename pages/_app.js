import "../styles/globals.css";
import magicAuth from "../lib/majic-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/loading/Loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      // setIsLoading(true);
      const isLoggedIn = await magicAuth.user.isLoggedIn();
      if (!isLoggedIn) {
        // setIsLoading(false);
        router.push("/login");
      } else {
        // setIsLoading(false);
        router.push("/");
      }
    };

    checkIsLoggedIn();
  }, [router]);

  useEffect(() => {
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  if (isLoading) {
    return <Loading />;
  }
  return <Component {...pageProps} />;
}

export default MyApp;

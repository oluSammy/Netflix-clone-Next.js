import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import magicKey from "../lib/majic-client";

const login = () => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  const handleLoginWithEmail = async () => {
    setErrMsg("");
    if (!email) {
      return setErrMsg("Please enter your email");
    }

    if (email !== "olumorinsammy@gmail.com") {
      return setErrMsg("Email not found");
    }

    try {
      setIsLoading(true);
      const didTOken = await magicKey.auth.loginWithMagicLink({ email });
      console.log(didTOken);

      if (didTOken) {
        // setIsLoading(false);
        router.push("/");
      }
    } catch (err) {
      setIsLoading(false);
      // Handle errors if required!
      console.error(err, "somethn went wrong");
    }

    console.log("login with email");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Signin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/" passHref>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/icons/netflix.svg"
                alt="netflix"
                width="138px"
                height="30px"
              />
            </div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            className={styles.emailInput}
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={styles.userMsg}>{errMsg}</p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            {isLoading ? "Loading..." : "Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default login;

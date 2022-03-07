import React, { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import magicAuth from "../../lib/majic-client";

const Nav = () => {
  const router = useRouter();

  const [showDropdown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropDown = () => {
    setShowDropDown(!showDropdown);
  };

  const handleSignout = async () => {
    try {
      await magicAuth.user.logout();
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUssername = async () => {
      try {
        const { email, publicAddress } = await magicAuth.user.getMetadata();
        setUsername(email);
      } catch (err) {
        console.log(err);
        // Handle errors if required!
      }
    };
    fetchUssername();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={(e) => handleOnClickHome(e)}>
            Home
          </li>
          <li
            className={styles.navItem2}
            onClick={(e) => handleOnClickMyList(e)}
          >
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropDown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/icons/expand.svg"
                alt="expand dropdown button"
                width="24px"
                height="24px"
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <p className={styles.linkName} onClick={handleSignout}>
                    Signout
                  </p>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;

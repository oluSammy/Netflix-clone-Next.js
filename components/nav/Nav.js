import React, { useState } from "react";
import styles from "./Nav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const Nav = ({ username }) => {
  const router = useRouter();

  const [showDropdown, setShowDropDown] = useState(false);

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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/" passHref>
          <div className={styles.logoWrapper}>
            <Image src="/static/icons/netflix.svg" alt="netflix"  width="138px" height="30px" />
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
              <Image src="/static/icons/expand.svg" alt="expand dropdown button" width="24px" height="24px" />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link className={styles.linkName} href="/login">
                    Signout
                  </Link>
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

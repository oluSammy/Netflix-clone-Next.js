import React from "react";
import styles from "./banner.module.css";
import Image from "next/image";

const Banner = ({ title, subTitle, imgUrl }) => {
  const handlePlay = () => {
    console.log("play ~~~");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handlePlay}>
              <Image
                src="/static/icons/play_arrow.svg"
                alt="play"
                width="32px"
                height="32px"
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
          //   width: "100%",
          //   height: "100%",
          //   position: "absolute",
          //   //   top: 0,
          //   backgroundSize: "cover",
          //   backgroundPosition: "50% 50%",
        }}
      ></div>
    </div>
  );
};

export default Banner;

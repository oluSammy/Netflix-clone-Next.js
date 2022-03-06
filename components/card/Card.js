import React, { useState } from "react";
import styles from "./Card.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import cls from "classnames";

const Card = ({
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80",
  size = "medium",
  id,
}) => {
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const handleError = () => {
    console.log("hii Error");
    setImgSrc("/static/images/clifford-dog.jpeg");
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div style={{ marginRight: "5px" }}>
      <motion.div
        className={cls(classMap[size], styles.imgMotionWrapper)}
        whileHover={{ ...scale }}
        onHoverStart={(e) => {}}
        onHoverEnd={(e) => {}}
      >
        <Image
          src={imgSrc}
          alt="card image"
          width="300px"
          height="300px"
          layout="fill"
          onError={handleError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;

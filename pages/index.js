import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/Banner";
import Nav from "../components/nav/Nav";
import SectionCards from "../components/card/Section-cards";
import { getVideos } from "../lib/videos";
import magicKey from "../lib/majic-client";

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney");
  const travelVideos = await getVideos("travel");
  const ronaldoVideos = await getVideos("ronaldo");
  const productivityVideos = await getVideos("productivity");
  const popularVideos = await getVideos("popular", true);
  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      ronaldoVideos,
    },
  };
}

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
  ronaldoVideos,
}) {
  console.log({ magicKey });

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix clone!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Nav username="olusammy" />
        <Banner
          title="Clifford the red dog"
          subTitle="A very cute dog"
          imgUrl="/static/images/clifford-dog.jpeg"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards title="Ronaldo" videos={ronaldoVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </main>
    </div>
  );
}

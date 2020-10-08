import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, scale: 0.1 },
  visible: { opacity: 1, scale: 1 },
};

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Next App Server Side Props</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>My Playlist youtube about Programmer</h1>

        <motion.ul
          initial="hidden"
          animate={["visible"]}
          variants={variants}
          transition={{ bounceDamping: 1, duration: 0.8 }}
          style={{ maxWidth: 700, background: "#f8f2" }}
        >
          {data.items.map((item) => {
            const { id, snippet = {} } = item;
            const {
              title,
              thumbnails,
              publishedAt,
              resourceId,
              description,
            } = snippet;
            const { medium = {} } = thumbnails;
            const published = new Date(publishedAt).toLocaleDateString(
              "pt-br",
              {
                dateStyle: "full",
              }
            );
            return (
              <motion.li
                transition={{ duration: 0.3 }}
                whileHover={{
                  scale: [1, 1.5, 0.9],
                  rotate: [0, 10, 0],
                }}
                whileTap={{ scale: 0.9 }}
                key={id}
              >
                <Link href={`/video/${[resourceId.videoId]}`}>
                  <a>
                    <img
                      width={medium.width}
                      height={medium.height}
                      src={medium.url}
                      alt="image"
                    />

                    <h3>{title} </h3>
                    <motion.p animate={{ scale: 1 }}>
                      {description.slice(0, 150)}...
                    </motion.p>
                    <p>{published}</p>
                  </a>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </main>
    </div>
  );
}

const YOUTUBE_PLAYLIST_URL =
  "https://www.googleapis.com/youtube/v3/playlistItems";

export async function getServerSideProps() {
  const res = await fetch(
    `${YOUTUBE_PLAYLIST_URL}?part=snippet&playlistId=PL3AdiJpyw-Wokse3S668DbU6hOKXXIAw8&maxResults=20&key=${process.env.API_KEY_YOUTUBE}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

import React from "react";

import useSWR from "swr";
import { useRouter } from "next/router";

function Video({ video }) {
  console.log(video);
  return (
    <div>
      {video.items.map((item) => {
        const { channelTitle, description, title, thumbnails } = item.snippet;
        const { standard } = thumbnails;
        return (
          <>
            <p> Canal: {channelTitle}</p>
            <p>Título: {title}</p>
            <p>Descrição: {description.substr(0, 100)} ...</p>
            <a>
              <img
                src={standard.url}
                alt={title}
                width={standard.width}
                height={standard.height}
              />
            </a>
          </>
        );
      })}
    </div>
  );
}

// const YOUTUBE_PLAYLIST_URL =
//   "https://www.googleapis.com/youtube/v3/playlistItems";

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts

//   const res = await fetch(
//     `${YOUTUBE_PLAYLIST_URL}?part=snippet&playlistId=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&maxResults=20&key=${process.env.API_KEY_YOUTUBE}`
//   );
//   const data = await res.json();

//   // Get the paths we want to pre-render based on posts
//   const paths = data.items.map(
//     (video) => `/video/${video.snippet.resourceId.videoId}`
//   );

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${params.videoId}&key=${process.env.API_KEY_YOUTUBE}`
  );
  const video = await res.json();

  // Pass post data to the page via props
  return { props: { video } };
}

export default Video;

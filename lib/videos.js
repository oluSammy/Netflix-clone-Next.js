import videoData from "../data/videos.json";

export const getVideos = async (searchQuery, isPopular) => {
  const YT_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

  const url = isPopular
    ? `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=20&key=${YT_API_KEY}`
    : `${BASE_URL}/search?part=snippet&maxResults=25&q=${searchQuery}%20trailer&key=${YT_API_KEY}`;
  try {
    const response = await fetch(url);

    const data = await response.json();

    if (data?.error) {
      console.error(e, "youtube API error");
      return [];
    }

    return data.items.map((video) => {
      return {
        title: video.snippet.title,
        imgUrl: video.snippet.thumbnails.high.url,
        id: video.id.videoId || video.id,
      };
    });
  } catch (e) {
    console.error(e, "video lib error");
    return [];
  }
};

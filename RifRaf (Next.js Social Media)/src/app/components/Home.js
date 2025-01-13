import React, { useEffect } from 'react';
import TwoCents from './TwoCents';
import Vplayer from './Player';
import { fetchInitialPosts } from '../api/handlers';

const Home = ({ showComments, video, videos, setVideo, setVideos }) => {
  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    const result = await fetchInitialPosts();
    setVideos(result || []);
    setVideo(result[0]);
  };

  return (
    <div>
      <Vplayer showComments={showComments}/>
      {showComments && ( <TwoCents video={video} videos={videos} setVideo={setVideo} /> )}
    </div>
  );
}

export default Home;

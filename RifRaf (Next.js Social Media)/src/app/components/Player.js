import React, { useState } from 'react';
import Player from 'react-player';
import { PiCoins } from "react-icons/pi";
import { RiHeart3Line, RiHeart3Fill, RiAccountCircleFill, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const Vplayer = ({ video, videos, setVideo, setVideos }) => {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [showComments, setShowComments] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [vidIndex, setVidIndex] = useState(0);

  const handleVideoChange = (direction) => {
    const newIndex = (vidIndex + direction + videos.length) % videos.length;
    setVidIndex(newIndex);
    setVideo(videos[newIndex]);
  };
  
  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds);
  };
  
  const handleLike = () => {
    const updatedVideo = { ...video, Likes: video.Likes + 1, Liked: true };
    const updatedVideos = videos.map((vid) =>
      vid.Name === video.Name ? updatedVideo : vid
    );
    setVideo(updatedVideo);
    setVideos(updatedVideos);
  };
  
  const openComments = () => {
    setShowComments(!showComments);
  };  

  return (
    <div>
      <div className='player'>
        <Player url={video.Link} playing={playing} volume={volume} onProgress={handleProgress} width='100%' height='100%' controls />
      </div>
      <div>
        <RiAccountCircleFill className='fixed-icon' style={{ top: '10px', left: '10px' }} size={30} />
        <PiCoins className='fixed-icon' style={{ top: '10px', left: '55px' }} size={17} onClick={openComments}/>
        {video.Liked ? (
          <RiHeart3Fill className='fixed-icon' style={{ top: '10px', left: '90px' }} size={17} />
        ) : (
          <RiHeart3Line className='fixed-icon' style={{ top: '10px', left: '90px' }} size={17} onClick={handleLike} />
        )}
        <label style={{ position: 'fixed', top: '30px', left: '80px', width: '38px', zIndex: '3', textAlign: 'center', fontSize: '12px' }} >
          {video.Likes}
        </label>
        <RiArrowUpSLine className='fixed-icon' style={{ top: '10px', right: '10px' }} size={25} onClick={() => handleVideoChange(-1)} />
        <RiArrowDownSLine className='fixed-icon' style={{ top: '40px', right: '10px' }} size={25} onClick={() => handleVideoChange(1)} />
      </div>
    </div>
  )
};

export default Vplayer;
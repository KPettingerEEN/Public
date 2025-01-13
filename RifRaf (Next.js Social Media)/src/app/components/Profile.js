import React, { useState, useEffect } from 'react';
import TwoCents from './TwoCents';
import Vplayer from './Player';
import Protabs from './Protabs';
import { RiUpload2Line } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { fetchProfile, fetchUploads, fetchFavs, fetchShared, fetchPhoto, fetchThumbnails, handleProfileUpdate } from '../api/handlers';

const Profile = ({ showComments }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [profile, setProfile] = useState({ Uname: localStorage.getItem('profile'), Headline: '', Bio: '' });
  const [uploads, setUploads] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [profilePic, setProfilePic] = useState('');
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => { getProfile(); getUploads(); getFavs(); getShared(); getPhoto(); getThumbs(); }, []);

  const getProfile = async () => { const result = await fetchProfile(profile); setProfile(result); };
  const getUploads = async () => { const result = await fetchUploads(profile); setUploads(result); setVideos(result || []); };
  const getFavs = async () => { const result = await fetchFavs(profile); setFavorites(result); setVideos(result || []); };
  const getShared = async () => { const result = await fetchShared(profile); setReposts(result); setVideos(result || []); };
  const getPhoto = async () => { const result = await fetchPhoto(profile); setProfilePic(result); };
  const getThumbs = async () => { const result = await fetchThumbnails(profile); setThumbnails(result); };
  const updateProfile = async () => { await handleProfileUpdate(profile); setShowEdit(false); };

  return (
    <div>
      <div 
        style={{ position: 'fixed', top: '10px', left: '10px', backgroundImage: `url(${profilePic})`, height: '40px', width: '40px', borderRadius: '20px', backgroundPosition: 'center', backgroundSize: 'cover' }}
      />
      <FaUserEdit  className='fixed-icon' style={{ top: '10px', right: '10px' }} size={25} onClick={() => setShowEdit(!showEdit)} />
      <label style={{ position: 'fixed', top: '13px', left: '56px', fontSize: '14px', textDecoration: 'underline'  }}>{profile.Uname}</label>
      <label style={{ position: 'fixed', top: '33px', left: '56px', fontSize: '14px' }}>{profile.Headline}</label>
      <div 
        style={{ position: 'fixed', top: '60px', left: '15px', right: '15px', height: '75px', backgroundColor: 'rgb(200, 200, 200)', color: 'rgb(30, 30, 30)', borderRadius: '4px' }}
      >
        <label style={{ position: 'fixed', top: '65px', left: '20px', fontSize: '13px', textDecoration: 'underline', fontWeight: 'bolder' }}>Bio</label>
        <label style={{ position: 'fixed', top: '85px', left: '20px', fontSize: '13px' }}>{profile.Bio}</label>
      </div>
      <Protabs uploads={uploads} favorites={favorites} reposts={reposts} thumbnails={thumbnails} setPlayVideo={setPlayVideo}/>
      {playVideo && ( <Vplayer showComments={showComments}/> )}
      {showComments && ( <TwoCents video={video} videos={videos} setVideo={setVideo} /> )}
      {showEdit && (
        <div className='editpro'>
          <h4 style={{ marginBottom: '10px', marginTop: '0px' }} >Edit Profile</h4>
          <label>
            Headline: <input style={{ width: '99%', padding: '3px', border: 'solid 1px rgb(200,200,200)', borderRadius: '5px', backgroundColor: 'rgb(255, 255, 255)' }} ></input>
          </label>
          <div className='spacer'/>
          <label>
            Bio: 
            <textarea 
              style={{ minWidth: '98%', maxWidth: '98%', padding: '3px', border: 'solid 1px rgb(200,200,200)', borderRadius: '5px', maxHeight: '50px', minHeight: '50px',
                backgroundColor: 'rgb(255, 255, 255)'  }} 
            ></textarea>
          </label>
          <div className='spacer'/>
          <div className='spacer'/>
          <label>Picture:</label>
          <div 
            style={{ position: 'fixed', bottom: '110px', left: '15px', backgroundImage: `url(${profilePic})`, height: '60px', width: '60px', borderRadius: '30px', 
            backgroundPosition: 'center', backgroundSize: 'cover' }}
          />
          <button 
            style={{ position: 'fixed', bottom: '110px', left: '85px', right: '15px', backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(30,30,30)', 
            border: 'solid 1px rgb(200,200,200)', borderRadius: '8px', padding: '10px' }}
          >
            <RiUpload2Line size={30} />
            <div className='spacer'/>
            Upload Photo
          </button>
          <div className='spacer'/>
          <button onClick={updateProfile}>Update Profile</button>
        </div>
      )}
    </div>
  )
}

export default Profile;
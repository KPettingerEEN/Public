import React, { useState } from 'react';
import { RiUpload2Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";

const Protabs = ({ uploads, favorites, reposts, setPlayVideo, setVideo }) => {
  const [tab, setTab] = useState('Favorites');
  return (
    <div>
      <div style={{ position: 'fixed', top: '150px', left: '0px', right: '0px', bottom: '35px', backgroundColor: 'rgba(0,0,0,0)', zIndex: '2', borderTop: 'solid 1px white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px', height: '20px', borderBottom: 'solid 1px white' }}>
          <RiUpload2Fill className='fixed-icon-2' style={{ marginLeft: '10px' }} onClick={() => setTab('Uploads')}/>
          <FaStar className='fixed-icon-2' style={{ flex: '0 1 auto', margin: '0 auto' }} onClick={() => setTab('Favorites')}/>
          <FaRegShareFromSquare className='fixed-icon-2' style={{ marginRight: '10px' }} onClick={() => setTab('Reposts')}/>
        </div>
      </div>
      <div style={{ position: 'fixed', top: '180px', left: '0px', right: '0px', bottom: '35px', backgroundColor: 'rgb(200, 200, 200)', zIndex: '3' }}>
        {tab === 'Uploads' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            {uploads.map((upload, index) => (
              <div 
                key={index} 
                style={{ backgroundImage: `url(${thumbnails/upload.Thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '120px', width: '100%', zIndex: '3', cursor: 'pointer', border: 'solid 1px rgba(130, 130, 130, .5)', borderRadius: '4px' }}
                onClick={() => { setPlayVideo(true); setVideo(upload); }}
              >
                <label style={{ position: 'relative', bottom: '-100px', left: '5px', color: 'rgb(145, 145, 145)' }}>{upload.Likes}</label>
              </div>
            ))}
          </div>
        )}
        {tab === 'Favorites' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            {favorites.map((favorite, index) => (
              <div
                key={index} 
                style={{ backgroundImage: `url(${thumbnails/favorite.Thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '120px', width: '100%', zIndex: '3', cursor: 'pointer',
                  border: 'solid 1px rgba(130, 130, 130, .5)', borderRadius: '4px'
                }}
                onClick={() => {setPlayVideo(true); setVideo(favorite)}}
              >
                <label style={{ position: 'relative', bottom: '-100px', left: '5px', color: 'rgb(145, 145, 145)' }}>{favorite.Likes}</label>
              </div>
            ))}
          </div>
        )}
        {tab === 'Reposts' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '2px'
          }}>
            {reposts.map((repost, index) => (
              <div 
                key={index} 
                style={{ backgroundImage: `url(${thumbnails/repost.Thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '120px', width: '100%', zIndex: '3', cursor: 'pointer',
                  border: 'solid 1px rgba(130, 130, 130, .5)', borderRadius: '4px'
                }}
                onClick={() => {setPlayVideo(true); setVideo(repost)}}
              >
                <label style={{ position: 'relative', bottom: '-100px', left: '5px', color: 'rgb(145, 145, 145)' }}>{repost.Likes}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
};

export default Protabs;
import React, { useState, useEffect } from 'react';
import { RiInformationFill } from "react-icons/ri";
import { fetchProfile, fetchSettings, handleSaveChanges } from '../api/handlers';

const Settings = () => {
  const [savedSettings, setSavedSettings] = useState({});
  const [user, setUser] = useState({});
  const [infoVET, setInfoVET] = useState(false);
  const profile = localStorage.getItem('profile');

  useEffect(() => {
    getProfile();
    getSettings();
  }, []);

  const getProfile = async () => {
    const result = await fetchProfile(profile);
    setUser(result);
  };

  const getSettings = async () => {
    const result = await fetchSettings(profile);
    setSavedSettings(result);
  };

  const saveAll = async () => {
    await handleSaveChanges(profile);
  };

  return (
    <div 
      style={{ position: 'fixed', top: '0px', bottom: '35px', left: '0px', right: '0px', 
      backgroundColor: 'white', color: 'rgb(30,30,30)', zIndex: '6', overflow: 'auto' }}
    >
      <h4 style={{ margin: '15px', marginTop: '10px' }} >App Settings</h4>
      <label style={{ marginLeft: '10px' }} >
        Dark Theme:
        <label className="switch" style={{ left: '22px' }} >
          <input 
            type='checkbox' 
            checked={savedSettings.ThemeDark}
            onChange={(e) => setSavedSettings({ ...savedSettings, ThemeDark: e.target.checked })}
          />
          <span className="slider"></span>
        </label>
      </label>
      <div className='spacer'/>
      <label style={{ marginLeft: '10px' }} >
        Notifications:
        <label className="switch" style={{ left: '23px' }} >
          <input 
            type='checkbox' 
            checked={savedSettings.Notifications}
            onChange={(e) => setSavedSettings({ ...savedSettings, Notifications: e.target.checked })}
          />
          <span className="slider"></span>
        </label>
      </label>
      <div className='spacer'/>
      <label style={{ marginLeft: '10px' }} >
        Default VET:
        <label className="switch" style={{ left: '26px' }} >
          <input 
            type='checkbox' 
            checked={savedSettings.DefaultVet}
            onChange={(e) => setSavedSettings({ ...savedSettings, DefaultVet: e.target.checked })}
          />
          <span className="slider"></span>
        </label>
      </label>
      <RiInformationFill className='fixed-icon-2' style={{ position: 'fixed', left: '210px' }} size={20} onClick={() => setInfoVET(!infoVET)} />
      <div className='spacer'/>
      {infoVET && (
        <div className='btn1' style={{ top: '180px', bottom: '150px', left: '5px', right: '5px', zIndex: '8', backgroundColor: 'rgb(200,200,200)' }} onClick={() => setInfoVET(!infoVET)} >
          <h3>Viewer Engagement Tool</h3>
          The VET is a system that creators can use that allows them to automatically respond to comments for their posts on various platforms, including RifRaf!
          Using the VET on RifRaf is free, but if you want to use it for example on a Facebook post, then you will have to subscribe for VET and link your
          Facebook account. This has been integrated with several social media and content platforms, so be sure to check it out!
        </div>
      )}
      <h4 style={{ margin: '15px', marginTop: '10px' }} >Account Settings</h4>
      <label style={{ marginLeft: '10px' }} >
        Email: <input 
          style={{ position: 'fixed', left: '70px', width: '150px' }} 
          placeholder={user.Email} 
          value={user.Email}
          onChange={(e) => setUser({ ...user, Email: e.target.value })}
        />
      </label>
      <div className='spacer'/>
      <label style={{ marginLeft: '10px' }} >
        Phone: <input 
          style={{ position: 'fixed', left: '70px', width: '150px' }} 
          placeholder={user.Phone} 
          value={user.Phone}
          onChange={(e) => setUser({ ...user, Phone: e.target.value })}
        />
      </label>
      <div className='spacer'/>
      <button 
        className='btn1' 
        style={{ bottom: '100px', left: '5px', right: '5px' }} 
        onClick={saveAll}
      >
        Save Changes
      </button>
      <button className='btn1' style={{ bottom: '70px', left: '5px', right: '5px' }} >Reset Password</button>
      <button className='btn1' style={{ bottom: '40px', left: '5px', right: '5px' }} >Delete Account</button>
    </div>
  );
};

export default Settings;

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const Options = () => {
    const organization = localStorage.getItem('organization');
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [elapsedTime, setElapsedTime] = useState({ hours: 0, minutes: 0 });
    const [cumulativeTime, setCumulativeTime] = useState({ hours: 0, minutes: 0 });

    useEffect(() => {
        // Set default local storage items for testing purposes
        if (!localStorage.getItem('profiles')) {
          const defaultProfiles = [
            { 'Name': 'John Doe', 'Title': 'Test User', 'Username': 'john.doe', 'Role': 'User', 'DateHired': '11-17-2024', 'FullTime': 'Yes', 'Leave': 0, 'PTO': 0 },
            { 'Name': 'Jane Smith', 'Title': 'Test User', 'Username': 'jane.smith', 'Role': 'User', 'DateHired': '11-17-2024', 'FullTime': 'Yes', 'Leave': 0, 'PTO': 0 }
          ];
          localStorage.setItem('profiles', JSON.stringify(defaultProfiles));
        }
    
        if (!localStorage.getItem('tables')) {
          const defaultTables = {
            Home: [
              { label: 'January', value: 100 },
              { label: 'February', value: 200 }
            ]
          };
          localStorage.setItem('tables', JSON.stringify(defaultTables));
        }
    
        const fetchProfiles = () => {
          try {
            const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
            setProfileData(profiles);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchProfiles();
    }, [organization]);  
    
    useEffect(() => {
        const savedClockedIn = JSON.parse(localStorage.getItem('isClockedIn'));
        const savedStartTime = localStorage.getItem('startTime');
        const savedCumulativeTime = JSON.parse(localStorage.getItem('cumulativeTime'));
        setIsClockedIn(savedClockedIn);
        setStartTime(savedStartTime ? new Date(savedStartTime) : null);
        setCumulativeTime(savedCumulativeTime || { hours: 0, minutes: 0 });
    }, []);
    
    useEffect(() => {
        let timer;
        if (isClockedIn) {
            timer = setInterval(() => {
            const now = new Date();
            const start = new Date(localStorage.getItem('startTime'));
            const elapsed = now - start;

            const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));

            setElapsedTime({ hours, minutes });
            }, 60000);
        } else {
            setElapsedTime({ hours: 0, minutes: 0 });
        }

        return () => clearInterval(timer);
    }, [isClockedIn]);
    
    useEffect(() => {
        const resetCumulativeTime = () => {
            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const millisecondsUntilReset = startOfDay.setHours(24, 0, 0, 0) - now;

            setTimeout(() => {
            setCumulativeTime({ hours: 0, minutes: 0 });
            localStorage.setItem('cumulativeTime', JSON.stringify({ hours: 0, minutes: 0 }));
            }, millisecondsUntilReset);
        };

        resetCumulativeTime();
    }, []);

    const handleClockInChange = (event) => {
        const isChecked = event.target.checked;
        setIsClockedIn(isChecked);
        if (isChecked) {
          const currentTime = new Date();
          setStartTime(currentTime);
          localStorage.setItem('startTime', currentTime.toString());
          localStorage.setItem('isClockedIn', JSON.stringify(true));
        } else {
          const now = new Date();
          const start = new Date(localStorage.getItem('startTime'));
          const elapsed = now - start;
    
          const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    
          const totalHours = cumulativeTime.hours + hours;
          const totalMinutes = cumulativeTime.minutes + minutes;
    
          const updatedHours = totalHours + Math.floor(totalMinutes / 60);
          const updatedMinutes = totalMinutes % 60;
    
          const newCumulativeTime = { hours: updatedHours, minutes: updatedMinutes };
    
          setCumulativeTime(newCumulativeTime);
          localStorage.setItem('cumulativeTime', JSON.stringify(newCumulativeTime));
    
          setStartTime(null);
          localStorage.setItem('startTime', null);
          localStorage.setItem('isClockedIn', JSON.stringify(false));
          setElapsedTime({ hours: 0, minutes: 0 });
        }
    };
    
    const handleSignOut = () => {
        setProfileData([]);
        localStorage.setItem('username', '');
        localStorage.removeItem('organization');
        navigate('/');
    };

    const currentUser = profileData.find((profile) => profile.Username === localStorage.getItem('username'));

    return (
        <div className="options">
          <nav>
            <h3 style={{marginLeft: '-10px'}}>{currentUser ? currentUser.Name : 'No User'}</h3>
          </nav>
          <button className='contentbutton' onClick={handleSignOut}>Sign Out</button>
          <div className='spacer-3'/>
          {currentUser && (
            <div>
              <div className='spacer-3'/>
              <label style={{fontWeight: 'bold', fontSize: '14px', width: '50%', color: '#384e65'}}>
                Title: <span style={{fontWeight: 'bold', fontSize: '12px', color: 'GrayText'}}>{currentUser.Title}</span>
              </label>
              <div className='spacer-3'/>
              <label style={{fontWeight: 'bold', fontSize: '14px', width: '50%', color: '#384e65'}}>
                Role: <span style={{fontWeight: 'bold', fontSize: '12px', color: 'GrayText'}}>{currentUser.Role}</span>
              </label>
              <div className='spacer-3'/>
              <label style={{fontWeight: 'bold', fontSize: '14px', width: '50%', marginTop: '0px', color: '#384e65'}}>
                Username: <span style={{fontWeight: 'bold', fontSize: '12px', color: 'GrayText'}}>{currentUser.Username}</span>
              </label>
              <div className='spacer-3'/>
              <label style={{fontWeight: 'bold', fontSize: '14px', width: '50%', marginTop: '0px', color: '#384e65'}}>
                Sick: <span style={{fontWeight: 'bold', color: 'GrayText'}}>{currentUser.Leave} Hrs</span>
              </label>
              <label style={{fontWeight: 'bold', fontSize: '14px', width: '50%', marginLeft: '20px', color: '#384e65'}}>
                PTO: <span style={{fontWeight: 'bold', color: 'GrayText'}}>{currentUser.PTO} hrs</span>
              </label>
              <div className='spacer-3'/>
              <div className='spacer-4' style={{height: '5px'}}/>
              <label style={{fontWeight: 'bold', fontSize: '14px', width: '50%', color: '#384e65'}}>
                Clocked In:
                <label className="switch-2">
                  <input type='checkbox' checked={isClockedIn} onChange={handleClockInChange} />
                  <span className="slider"></span>
                </label>
                <div style={{float: 'right', marginRight: '150px', width: '20px'}}>
                {isClockedIn && (
                  <DatePicker
                    placeholderText="-"
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    readOnly
                    className='custom-datepicker'
                  />
                )}
                </div>
              </label>
              {isClockedIn && (
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#384e65', marginTop: '10px', marginLeft: '10px' }}>
                  Time Clocked In: {elapsedTime.hours}h {elapsedTime.minutes}m
                </div>
              )}
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#384e65', marginTop: '10px', marginLeft: '10px' }}>
                Total Time Today: {cumulativeTime.hours}h {cumulativeTime.minutes}m
              </div>
              <div className='spacer-3'/>
              <label style={{fontWeight: 'bold', fontSize: '14px', width: '50%', color: '#384e65'}}>
                Schedule: <span style={{fontWeight: 'bold', color: 'GrayText'}}>Shift 1</span>
              </label>
              <div className='spacer-3'/>
            </div>
          )}
        </div>
      );
    };
    
    export default Options;
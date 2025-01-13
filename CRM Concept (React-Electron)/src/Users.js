import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';

const Users = () => {
    const [profileData, setProfileData] = useState([{}]);
    const [selectedUser, setSelectedUser] = useState('');
    const [showUser, setShowUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const organization = localStorage.getItem('organization');
    
    const handleNewUser = () => {
        setShowUser(!showUser);
        setEditUser(false);
    };
    const handleRowClick = (profileName) => {
        setSelectedUser(profileName);
        handleEditUser();
    };
    const handleEditUser = () => {
        setEditUser(!editUser);
        setShowUser(false);
    };

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

    return (
    <div className="tab">
        <nav>
            <h3>User Manager</h3>
        </nav>
        <button className='contentbutton' onClick={handleNewUser}>New User</button>
        <div className="spacer-3"/>
        <div>
        <label>Search for Users:
            <input></input>
        </label>
        {showUser && (
            <div className="form-modal">
            <nav>
                <h3>New User</h3>
            </nav>
            <button className='contentbutton' onClick={() => setShowUser(false)}>Create</button>
            <label>
                Full Name: <input style={{position: 'relative', right: '-33px'}}/>
            </label>
            <label>
                Title: <input style={{position: 'relative', right: '-70px'}}/>
            </label>
            <label>
                Username: <input style={{position: 'relative', right: '-30px'}}/>
            </label>
            <label>
                Role: <input style={{position: 'relative', right: '-68px'}}/>
            </label>
            <label>
                Date Hired: <input style={{position: 'relative', right: '-27px'}}/>
            </label>
            <label>
                Full Time
                <label className="switch-2" style={{marginLeft: '110px', marginTop: '-15px'}}>
                <input type='checkbox'/>
                <span className="slider"></span>
                </label>
            </label>
            </div>
        )}
        {editUser && (
            <div className="form-modal">
            <nav>
                <h3>Edit User</h3>
            </nav>
            <button className='contentbutton' onClick={() => setEditUser(false)}>Update</button>
            <label>
                Full Name: 
                {profileData.find((profile) => profile.Name === selectedUser) && (
                <input style={{position: 'relative', right: '-33px'}} value={profileData.find((profile) => profile.Name === selectedUser).Name} />
                )}
            </label>
            <label>
                Title: 
                {profileData.find((profile) => profile.Name === selectedUser) && (
                <input style={{position: 'relative', right: '-70px'}} value={profileData.find((profile) => profile.Name === selectedUser).Title}/>
                )}
            </label>
            <label>
                Username:
                {profileData.find((profile) => profile.Name === selectedUser) && (
                <input style={{position: 'relative', right: '-30px'}} value={profileData.find((profile) => profile.Name === selectedUser).Username}/>
                )}
            </label>
            <label>
                Role: 
                {profileData.find((profile) => profile.Name === selectedUser) && (
                <input style={{position: 'relative', right: '-68px'}} value={profileData.find((profile) => profile.Name === selectedUser).Role}/>
                )}
            </label>
            <div className='spacer-3' style={{marginTop: '-8px'}}/>
            <label>
                Hired:
                <div style={{marginLeft: '103px', marginTop: '-27px'}}>
                {profileData.find((profile) => profile.Name === selectedUser) && (
                <DatePicker 
                    selected={profileData.find((profile) => profile.Name === selectedUser).DateHired}
                />
                )}
                </div>
            </label>
            <div className='spacer-3' style={{marginTop: '-10px'}}/>
            <label>
                Full Time: 
                {profileData.find((profile) => profile.Name === selectedUser) && (
                <label className="switch-2" style={{marginLeft: '110px', marginTop: '-15px'}}>
                    <input type='checkbox' value={profileData.find((profile) => profile.Name === selectedUser).FullTime}/>
                    <span className="slider"></span>
                </label>
                )}
            </label>
            </div>
        )}
        <table>
            <thead>
            <tr>
                <th>Full Name</th>
                <th>Title</th>
                <th>Username</th>
                <th>User Role</th>
                <th>Date Hired</th>
                <th>Full Time</th>
                <th>Sick Leave</th>
                <th>PTO</th>
            </tr>
            </thead>
            <tbody>
            {profileData.map((profile, index) => (
                <tr key={index} onClick={() => {handleRowClick(profile.Name)}}>
                <td>{profile.Name}</td>
                <td>{profile.Title}</td>
                <td>{profile.Username}</td>
                <td>{profile.Role}</td>
                <td>{profile.DateHired}</td>
                <td>{profile.FullTime}</td>
                <td>{profile.Leave}</td>
                <td>{profile.PTO}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default Users;
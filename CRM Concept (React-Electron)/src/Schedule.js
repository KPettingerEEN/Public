import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';

const Schedule = () => {
    const [profileData, setProfileData] = useState([{}]);
    const [showShifts, setShowShifts] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [newSchedule, setNewSchedule] = useState(true);
    const [showWeek, setShowWeek] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [shifts, setShifts] = useState([{
      "Name":'Shift 1',
      "Days":5,
      "ST1":'',
      "ET1":'',
      "ST2":'',
      "ET2":'',
      "ST3":'',
      "ET3":'',
      "ST4":'',
      "ET4":'',
      "ST5":'',
      "ET5":'',
    }]);
    const organization = localStorage.getItem('organization');

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
    const handleWeekMenu = () => {
        setShowWeek(!showWeek);
    };
    const handleSchedule = () => {
    setShowSchedule(!showSchedule);
    };
    const handleShifts = () => {
        setShowShifts(!showShifts);
    };

    return (
        <div className="tab">
        <nav>
          <h3>Schedules</h3>
        </nav>
        <div className="content-block-3">
          <h3>Overview</h3>
          <div className="spacer-2"/>
          <div className="spacer-3"/>
          <p>
            You can edit Employee schedules from this interface here.
            If you have just created a user, they will still populate
            for search so that you can begin scheduling them as soon 
            as possible!
          </p>
        </div>
        <div className="spacer-3"/>
        <div className="spacer-3"/>
        <nav>
          <h3>Shifts</h3>
        </nav>
        <div className="spacer-3"/>
        {showShifts && (
          <div className="form-modal">
            <nav>
              <h3>Create A New Shift</h3>
            </nav>
            <button className='contentbutton' onClick={() => setShowShifts(false)}>Create</button>
            <div className='spacer-3'/>
            <label>
              Shift Name: <input/>
            </label>
            <label>
              Select Days <button className='contentbutton-3' onClick={handleWeekMenu}>{`>`}</button>
            </label>
            {showWeek && (
              <div className='dropdown2'>
                <label>
                  <input type='checkbox'></input> Mon
                </label>
                <label>
                  <input type='checkbox'></input> Tue
                </label>
                <label>
                  <input type='checkbox'></input> Wed
                </label>
                <label>
                  <input type='checkbox'></input> Thu
                </label>
                <label>
                  <input type='checkbox'></input> Fri
                </label>
                <label>
                  <input type='checkbox'></input> Sat
                </label>
                <label>
                  <input type='checkbox'></input> Sun
                </label>
              </div>
            )}
            <label>
              Start Time 1:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
            <label>
              End Time 1:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
            <label>
              Start Time 2:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
            <label>
              End Time 2:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
            <label>
              Start Time 3:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
            <label>
              End Time 3:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
            <label>
              Start Time 4:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
            <label>
              End Time 4:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
            <label>
              Start Time 5:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
            <label>
              End Time 5:
              <DatePicker
                placeholderText="-"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </label>
          </div>
        )}
        <label>Search Shifts: 
          <input></input>
        </label>
        <button className='contentbutton-3' onClick={handleShifts}>New Shift</button>
        <button className='contentbutton-3'>Delete Shift</button>
        <table>
          <th>Shift Name</th>
          <th>Days</th>
          <th>Start Time 1</th>
          <th>End Time 1</th>
          <th>Start Time 2</th>
          <th>End Time 2</th>
          <th>Start Time 3</th>
          <th>End Time 3</th>
          <th>Start Time 4</th>
          <th>End Time 4</th>
          <th>Start Time 5</th>
          <th>End Time 5</th>
          <tr>
            <td>Shift 1</td>
            <td>5</td>
            <td>6:30 AM</td>
            <td>8:15 AM</td>
            <td>8:30 AM</td>
            <td>10:30 AM</td>
            <td>11:30 AM</td>
            <td>1:45 PM</td>
            <td>2:00 PM</td>
            <td>3:30 PM</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </table>
        {showSchedule && newSchedule && (
          <div className='form-modal'>
            <nav>
              <h3>Add User to Schedule</h3>
            </nav>
            <button className='contentbutton' onClick={() => setShowSchedule(false)}>Add</button>
            <label>
              User:
                <select>
                  <option value=''>Select User</option>
                  {profileData.map((profile, index) => (
                  <option key={index} value={profile.Name}>{profile.Name}</option>
                  ))}
                </select>
            </label>
            {shifts.map((shift, index) => (
            <div>
              <label>
                Mon:
              </label>
              <select>
              <option value=''>Select Shift</option>
                <option key={index} value={shift.Name}>{shift.Name}</option>
              </select>
              <label>
                Tue:
              </label>
              <select>
              <option value=''>Select Shift</option>
                <option key={index} value={shift.Name}>{shift.Name}</option>
              </select>
              <label>
                Wed:
              </label>
              <select>
              <option value=''>Select Shift</option>
                <option key={index} value={shift.Name}>{shift.Name}</option>
              </select>
              <label>
                Thu:
              </label>
              <select>
              <option value=''>Select Shift</option>
                <option key={index} value={shift.Name}>{shift.Name}</option>
              </select>
              <label>
                Fri:
              </label>
              <select>
              <option value=''>Select Shift</option>
                <option key={index} value={shift.Name}>{shift.Name}</option>
              </select>
              <label>
                Sat:
              </label>
              <select>
              <option value=''>Select Shift</option>
                <option key={index} value={shift.Name}>{shift.Name}</option>
              </select>
              <label>
                Sun:
              </label>
              <select>
              <option value=''>Select Shift</option>
                <option key={index} value={shift.Name}>{shift.Name}</option>
              </select>
            </div>
            ))}
          </div>
        )}
        {showSchedule && !newSchedule && (
          <div className='form-modal'>
            <nav>
              <h3>Update Schedule</h3>
            </nav>
            <button className='contentbutton' onClick={() => setShowSchedule(false)}>Update</button>
          </div>
        )}
        <nav>
          <h3>Schedule</h3>
        </nav>
        <div className="spacer-3"/>
        <label>Search Users:
          <input></input>
        </label>
        <button className='contentbutton-3' onClick={() => {handleSchedule(); setNewSchedule(true)}}>New User</button>
        <table>
          <th>Name</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
          <tr onClick={() => {handleSchedule(); setNewSchedule(false)}}>
            <td>John Doe</td>
            <td>Shift 1</td>
            <td>Shift 1</td>
            <td>Shift 1</td>
            <td>Shift 1</td>
            <td>Shift 1</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </table>
      </div>
    )
};

export default Schedule;
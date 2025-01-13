import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';

const Tasks = () => {
    const [dateAssigned, setDateAssigned] = useState('');
    const [dateDue, setDateDue] = useState('');
    const [users, setUsers] = useState([
        {
            name: 'John Doe',
            tasks: [
            { taskName: 'Task 1', details: 'This is where details would go...' },
            { taskName: 'Task 2', details: 'This is where details would go...' }
            ]
        },
        {
            name: 'Jane Smith',
            tasks: [
            { taskName: 'Task 1', details: 'This is where details would go...' },
            { taskName: 'Task 2', details: 'This is where details would go...' }
            ]
        },
        {
            name: 'Jake F. Statefarm',
            tasks: [
            { taskName: 'Task 1', details: 'This is where details would go...' },
            { taskName: 'Task 2', details: 'This is where details would go...' }
            ]
        }
    ]);

    const addUser = () => {
    const newUser = {
        name: `User ${users.length + 1}`,
        tasks: [
        { taskName: `Task ${users.length + 1}-1`, details: 'This is where details would go...' },
        { taskName: `Task ${users.length + 1}-2`, details: 'This is where details would go...' }
        ]
    };
    setUsers([...users, newUser]);
    };
    const removeUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    };
    const handleAssigned = (e) => {
    const duedate = e.target.value;
    setDateDue(duedate);
    };

    return (
        <div>
        <nav>
          <h3>Task Boards</h3>
          <input style={{marginLeft: '80px'}} placeholder='Search...'/>
        </nav>
        <button className='contentbutton' onClick={addUser}>New User</button>
        <div className='spacer-3'/>
        <div className='spacer-3'/>
        <label style={{marginLeft: '35px'}}>
          Below you will find an example task board that you can use to get started.
        </label>
        <div className='content-block-4' style={{flexDirection: 'column'}}>
          <div className='spacer-3'/>
          <nav>
            <h3>First Board</h3>
            <input style={{marginLeft: '20px'}} placeholder='Search...'/>
            <button className='contentbutton' style={{marginTop: '60px', position: 'relative', right: '-50px'}}>New Task</button>
          </nav>
          <div className='spacer-3'/>
          <div style={{display: 'grid', gridTemplateColumns: `repeat(${users.length}, 1fr)`, gap: '10px'}}>
            {users.map((user, index) => (
              <div key={index} style={{ width: '200px', display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ color: '#426284', padding: '5px', fontWeight: 'bold' }}>{user.name}</label>
                {user.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className='taskblock'>
                    <div style={{ backgroundColor: '#426284', padding: '3px', color: 'white' }}>
                      <label>{task.taskName}:</label>
                    </div>
                    <div className='spacer-3'/>
                    <label>Details:</label>
                    <div className='spacer-4' style={{marginBottom: '-20px'}} />
                    <p style={{ marginLeft: '5px' }}>{task.details}</p>
                    <div className='spacer-3' />
                    <label>
                      State:
                      <select>
                        <option value=''>Select Status</option>
                        <option value='Not Started'>Not Started</option>
                        <option value='Working'>Working</option>
                        <option value='Delayed'>Delayed</option>
                        <option value='Complete'>Complete</option>
                      </select>
                    </label>
                    <div className='spacer-3' />
                    <label>
                      Date Assigned:
                      <DatePicker
                        placeholderText="-"
                        selected={dateAssigned}
                        className='custom-datepicker'
                        readOnly
                      />
                    </label>
                    <label>
                      Date Due:
                      <DatePicker
                        placeholderText="-"
                        selected={dateDue}
                        onChange={handleAssigned}
                        className='custom-datepicker'
                      />
                    </label>
                    <div className='spacer-3' />
                  </div>
                ))}
                <div className='spacer-3'/>
                <button style={{ 
                  backgroundColor: 'white', 
                  color: '#426284', 
                  padding: '5px', 
                  fontWeight: 'bold', 
                  border: '1px solid #ccc', 
                  borderRadius: '3px' }} 
                  onClick={() => removeUser(index)}
                >
                  Remove User
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
};

export default Tasks;
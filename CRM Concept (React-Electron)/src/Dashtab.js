import React, { useState, useEffect } from 'react';

const Dashtab = () => {
    const organization = localStorage.getItem('organization');
    const [profileData, setProfileData] = useState([{}]);
    const [activeTab, setActiveTab] = useState('');
    const [dashScheme, setDashScheme] = useState([{
        'name': 'Org Dash',
        'layout': [
            {
            "type": 'content-block-4',
            "header": 'Large Block',
            "value": 'text',
            "content": 'This is a basic Text Block that you can edit to get started!'
            }
        ]
    }]);
    const [blockData, setBlockData] = useState([{"type":'', "header": '', "value": '', "content": []}]);
    const [editIndex, setEditIndex] = useState(null);
    const [newBlock, setNewBlock] = useState(false);
    const [logTabs, setLogTabs] = useState([]);

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

    const handleNewBlock = () => {
        setNewBlock(!newBlock);
    };
    const handleBlockData = (e) => {
    const { name, value } = e.target;
    setBlockData(prevState => ({
        ...prevState,
        [name]: value
    }));
    };
    const handleAddBlock = () => {
    const newLayout = [...dashScheme[0].layout, blockData];
    const newScheme = [{
        ...dashScheme[0],
        layout: newLayout
    }];
    setDashScheme(newScheme);
    setBlockData({"type":'', "header": '', "value": '', "content": []});
    setNewBlock(false);
    };
    const handleDeleteBlock = (index) => {
    const updatedLayout = dashScheme[0].layout.filter((_, i) => i !== index);
    const updatedDashScheme = [{ ...dashScheme[0], layout: updatedLayout }];
    setDashScheme(updatedDashScheme);
    };
    const handleEditBlock = (index) => {
    setBlockData(dashScheme[0].layout[index]);
    setEditIndex(index);
    };
    const handleSaveBlock = () => {
    const newLayout = dashScheme[0].layout.map((block, index) =>
        index === editIndex ? blockData : block
    );
    const newDashScheme = [{ ...dashScheme[0], layout: newLayout}];
    setDashScheme(newDashScheme);
    setBlockData([{"type":'', "header": '', "value": '', "content": []}]);
    setEditIndex(null);
    };

    return (
        <div>
        <nav>
          <h3>{activeTab}</h3>
        </nav>
        <button className="contentbutton" onClick={handleNewBlock}>New Block</button>
        {newBlock && (
          <div className="form-modal">
            <nav>
            <h3>Add a New Content Block</h3>
            </nav>
            <button className='contentbutton' onClick={handleAddBlock}>Create</button>
            <div className='spacer-3' />
            <label>Block Header</label>
            <div className='spacer-3' />
            <input
              name="header"
              placeholder="Header for Block"
              value={blockData.header}
              onChange={handleBlockData}
            />
            <div className='spacer-3' />
            <label>Block Type & Content Value:</label>
            <div className='spacer-3' />
            <select
              name="type"
              value={blockData.type}
              onChange={handleBlockData}
            >
              <option value=''></option>
              <option value='content-block'>Left Block</option>
              <option value='content-block-2'>Right Block</option>
              <option value='content-block-3'>Long Block</option>
              <option value='content-block-4'>Large Block</option>
            </select>
            <select
              name="value"
              value={blockData.value}
              onChange={handleBlockData}
            >
              <option value=''></option>
              <option value='text'>Text</option>
              <option value='image'>Image</option>
              <option value='value'>Value</option>
              <option value='barchart'>Bar Chart</option>
              <option value='linechart'>Line Chart</option>
              <option value='plotchart'>Plot Chart</option>
            </select>
            <div className='spacer-3' />
            {blockData.value === 'text' && (
              <div>
                <label>Text Contents</label>
                <div className='spacer-3' />
                <textarea
                  name="content"
                  placeholder="Text Content for Block"
                  value={blockData.content}
                  onChange={handleBlockData}
                />
              </div>
            )}
            {(blockData.value === 'value' || blockData.value === 'barchart' || blockData.value === 'linechart' || blockData.value === 'plotchart') && (
              <div>
                <label>Select Log</label>
                <div className='spacer-3' />
                {logTabs.map((tab, index) => (
                  <select name="content" value={blockData.content} key={index} onChange={handleBlockData}>
                    <option value=''></option>
                    <option value={tab}>{tab}</option>
                  </select>
                ))}
              </div>
            )}
          </div>
        )}
        {dashScheme && dashScheme.map((scheme, index) => (
          <div key={index}>
            {scheme.layout && scheme.layout.map((item, idx) => (
              <div className="tab" key={idx}>
                <div className={item.type}>
                  <div className="dropdown">
                    <div className="dropbtn">options</div>
                    <div className="dropdown-content">
                      <button onClick={() => handleEditBlock(index)}>Edit</button>
                      <button onClick={() => handleDeleteBlock(index)}>Delete</button>
                    </div>
                  </div>
                  <h3>{item.header}</h3>
                  <div className="spacer-4" />
                  {item.content}
                </div>
                {editIndex !== null && (
                  <div className="form-modal">
                  <button onClick={handleSaveBlock}>Save</button>
                  <div className='spacer-3' />
                  <h3>Edit Content Block</h3>
                  <div className='spacer-3' />
                  <label>Block Header</label>
                  <div className='spacer-3' />
                  <input
                    name="header"
                    placeholder="Header for Block"
                    value={blockData.header}
                    onChange={handleBlockData}
                  />
                  <div className='spacer-3' />
                  <label>Block Type & Content Value:</label>
                  <div className='spacer-3' />
                  <select
                    name="type"
                    value={blockData.type}
                    onChange={handleBlockData}
                  >
                    <option value=''></option>
                    <option value='content-block'>Left Block</option>
                    <option value='content-block-2'>Right Block</option>
                    <option value='content-block-3'>Long Block</option>
                    <option value='content-block-4'>Large Block</option>
                  </select>
                  <select
                    name="value"
                    value={blockData.value}
                    onChange={handleBlockData}
                  >
                    <option value=''></option>
                    <option value='text'>Text</option>
                    <option value='image'>Image</option>
                    <option value='value'>Value</option>
                    <option value='barchart'>Bar Chart</option>
                    <option value='linechart'>Line Chart</option>
                    <option value='plotchart'>Plot Chart</option>
                  </select>
                  <div className='spacer-3' />
                  {blockData.value === 'text' && (
                    <div>
                      <label>Text Contents</label>
                      <div className='spacer-3' />
                      <textarea
                        name="content"
                        placeholder="Text Content for Block"
                        value={blockData.content}
                        onChange={handleBlockData}
                      />
                    </div>
                  )}
                  {(blockData.value === 'value' || blockData.value === 'barchart' || blockData.value === 'linechart' || blockData.value === 'plotchart') && (
                    <div>
                      <label>Select Log</label>
                      <div className='spacer-3' />
                      {logTabs.map((tab, index) => (
                        <select name="content" value={blockData.content} key={index} onChange={handleBlockData}>
                          <option value=''></option>
                          <option value={tab}>{tab}</option>
                        </select>
                      ))}
                    </div>
                  )}
                </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
};

export default Dashtab;
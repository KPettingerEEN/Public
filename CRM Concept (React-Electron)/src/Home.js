import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, BarElement, Chart } from 'chart.js';
import './App.css';
import logo from './logo32.png';
import Users from './Users';
import Schedule from './Schedule';
import Dashtab from './Dashtab';
import Tasks from './Tasks';
import Options from './Options';
import Logtab from './Logtab';

Chart.register(CategoryScale, LinearScale, BarElement);

function Home() {
  //Objects and Main States
  const [profileData, setProfileData] = useState([{}]);
  const tabs = ['Home', 'Logs', 'Dashboards', 'Workflows', 'WFM'];
  const [dashTabs, setDashTabs] = useState(['Org Dash']);
  const [logTabs, setLogTabs] = useState([]);
  const [wfmTabs] = useState(['Users', 'Docs', 'Events', 'Scheduling']);
  const [flowTabs] = useState(['Tasks', 'Flows', 'Alerts']);
  const [activeTab, setActiveTab] = useState('Home');
  const [dashtab, setDashtab] = useState('');
  const [logtab, setLogtab] = useState('');
  const [wfmTab, setWfmTab] = useState('');
  const [flowTab, setFlowTab] = useState('');
  const [formName, setFormName] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [newBoard, setNewBoard] = useState(false);
  const [dashName, setDashName] = useState('');

  //Show States
  const [showFormModal, setShowFormModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDashTabs, setShowDashTabs] = useState(false);
  const [showLogTabs, setShowLogTabs] = useState(false);
  const [showWfmTabs, setShowWfmTabs] = useState(false);
  const [showFlowTabs, setShowFlowTabs] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showNewDoc, setShowNewDoc] = useState(false);

  //Other Variables and Actions
  const navigate = useNavigate();
  const organization = localStorage.getItem('organization');
  localStorage.setItem('username', 'john.doe');

  //Effects
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
    console.log('Active Tab:', activeTab);

    if (activeTab) {
      const fetchTableData = () => {
        try {
          const tables = JSON.parse(localStorage.getItem('tables')) || {};
          setTableData(tables[activeTab] || []);
        } catch (error) {
          console.error('Error fetching table data:', error);
        }
      };
      fetchTableData();
    }

    if (activeTab === 'Dashboards') {
      setShowDashTabs(true);
      setShowLogTabs(false);
      setShowWfmTabs(false);
      setShowFlowTabs(false);
    } else if (activeTab === 'Logs') {
      setShowDashTabs(false);
      setShowLogTabs(true);
      setShowWfmTabs(false);
      setShowFlowTabs(false);
    } else if (activeTab === 'WFM') {
      setShowDashTabs(false);
      setShowLogTabs(false);
      setShowWfmTabs(true);
      setShowFlowTabs(false);
    } else if (activeTab === 'Workflows') {
      setShowDashTabs(false);
      setShowLogTabs(false);
      setShowWfmTabs(false);
      setShowFlowTabs(true);
    } else {
      setShowDashTabs(false);
      setShowLogTabs(false);
      setShowWfmTabs(false);
      setShowFlowTabs(false);
    }
  }, [activeTab]);

  //Logs
  const handleShowCreate = () => {
    setShowCreate(!showCreate);
    setShowOptions(false);
  };
  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleCreateForm = () => {
    if (formName.trim()) {
      setLogTabs([...logTabs, formName]);
      setLogtab(formName);
      setFormFields([]);
      setShowFormModal(true);
      setShowCreate(false);
      setFormName('');
      setActiveTab(formName);
    }
  };

  //WFM
  const handleEvents = () => {
    setShowEvents(!showEvents);
  };
  const handleNewDoc = () => {
    setShowNewDoc(!showNewDoc);
  };

  //Dashboards
  const handleNewBoard = () => {
    setNewBoard(!newBoard)
  };
  const handleAddBoard = () => {
    const newDashTabs = [...dashTabs, dashName];
    setDashTabs(newDashTabs);
    setDashName('');
    handleNewBoard();
  };
  const handleAddChart = () => {
    setShowChartModal(true);
  };

  //Needs Work
  const handleSaveChart = () => {
    // Logic to save chart configuration based on selected columns
    setShowChartModal(false);
  };
  
  //Chart Types
  const BarChart = ({ data }) => {
    const chartData = {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: 'Metrics',
          data: data.map(item => item.value),
          backgroundColor: 'rgba(0, 67, 138, 1)',
        },
      ],
    };
    return <Bar data={chartData} />;
  };

  return (
    <div className="app-container">
      <div className="nav-bar">
        <button className="sign-out-button" onClick={handleShowOptions}>
          <img src={logo} alt="Logo" />
        </button>
      </div>
      <div className="side-panel">
        {tabs.map((tab, index) => (
          <div key={index}>
            <button onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
            {showDashTabs && tab === 'Dashboards' && (
              dashTabs.map((dashTab, idx) => (
                <div className="sub-panel">
                  <button key={idx} onClick={() => {setActiveTab(dashTab); setDashtab(dashTab)}}>
                    {dashTab}
                  </button>
                </div>
              ))
            )}
            {showLogTabs && tab === 'Logs' && (
              logTabs.map((logTab, idx) => (
                <div className="sub-panel">
                  <button key={idx} onClick={() => {setActiveTab(logTab); setLogtab(logTab)}}>
                    {logTab}
                  </button>
                </div>
              ))
            )}
            {showWfmTabs && tab === 'WFM' && (
              wfmTabs.map((wfmTab, idx) => (
                <div className="sub-panel">
                  <button key={idx} onClick={() => {setActiveTab(wfmTab); setWfmTab(wfmTab)}}>
                    {wfmTab}
                  </button>
                </div>
              ))
            )}
            {showFlowTabs && tab === 'Workflows' && (
              flowTabs.map((flowTab, idx) => (
                <div className="sub-panel">
                  <button key={idx} onClick={() => {setActiveTab(flowTab); setWfmTab(flowTab)}}>
                    {flowTab}
                  </button>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
      <div className="main-content">
        {activeTab === 'Home' && (
          <div>
            <nav>
              <h3>Workspace Home</h3>
            </nav>
            <div className="content-block">
              <h3>How To Articles</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                Check out our How To Articles for LAWS so that you can start building
                your company's workspaces.
              </p>
            </div>
            <div className="content-block-2">
              <h3 onClick={() => setActiveTab('Dashboards')}>Dashboards</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                Check out your Organization's Dashboards here. You can build Dashboards
                with Tables that are created automatically when you build a new Data Log.
                Check out the Data Logs section to start building a new log.
              </p>
            </div>
            <div className="content-block">
              <h3 onClick={() => setActiveTab('Logs')}>Data Logs</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                Check out your Organiztion's Data Logs here. There is much more you can do with
                your data, so be sure to check out the How To Articles if you need more guidance
                on what can be done with your data logs.
              </p>
            </div>
            <div className="content-block-2">
              <h3 onClick={() => setActiveTab('WFM')}>Workforce</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                Check out your Organization's Workforce Management section. This is a
                predesigned workspace that is meant for helping you to manage your employee's
                work metrics.
              </p>
            </div>
            <div className="content-block-3">
              <h3>Knowledge Base</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                Check out your Organization's Knowledge Base for work related information and
                process guidance.
              </p>
            </div>
          </div>
        )}
        {activeTab === 'Dashboards' && (
          <div>
            <nav>
              <h3>Dashboard Manager</h3>
            </nav>
            <button className="contentbutton" onClick={handleNewBoard}>New Board</button>
            <div className="content-block-3">
              <h3>Creating Dashboards</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                You can create new Dashboards from this interface. Go ahead
                and give it a try by click on the "New Board" button in the top 
                right of this tab!
              </p>
            </div>
            {newBoard && (
              <div className="form-modal">
                <nav>
                  <h3>Create A New Dashboard</h3>
                </nav>
                <div className='spacer-3'/>
                <input placeholder="Name Your Dashboard" value={dashName} onChange={(e) => setDashName(e.target.value)}></input>
                <button className='contentbutton-3' onClick={handleAddBoard}>Create</button>
              </div>
            )}
          </div>
        )}
        {activeTab === 'Logs' && (
          <div>
            <nav>
              <h3>Data Logs</h3>
            </nav>
            <button className="contentbutton" onClick={handleShowCreate}>New Log</button>
            <div className="content-block-3">
              <h3>Creating Data Logs</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                You can create new Data Logs from this interface here! Go ahead
                and give it a try by click on the "New Log" button in the top 
                right of this tab!
              </p>
            </div>
          </div>
        )}
        {activeTab === 'WFM' && (
          <div>
            <nav>
              <h3>Workforce Manager</h3>
            </nav>
            <div className="content-block">
              <h3>WFM Articles</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                Check out our WFM Articles for LAWS so that you can start building
                your company's workforce.
              </p>
            </div>
            <div className="content-block-2">
              <h3 onClick={() => setActiveTab('Users')}>Users</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                You can manage your workspace users all from one easy to use interface!
              </p>
            </div>
            <div className="content-block">
              <h3 onClick={() => setActiveTab('Docs')}>Docs</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                You can add different documents for easy access to everyone in your
                organization!
              </p>
            </div>
            <div className="content-block-2">
              <h3 onClick={() => setActiveTab('Events')}>Events</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                Use this interface to set up different events for your organization!
              </p>
            </div>
            <div className="content-block-3">
              <h3 onClick={() => setActiveTab('Scheduling')}>Scheduling</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                Check out the scheduling system for easy schedule management!
              </p>
            </div>
          </div>
        )}
        {activeTab === 'Users' && (
          <Users/>
        )}
        {activeTab === 'Docs' && (
          <div>
            <nav>
              <h3>Document Manager</h3>
            </nav>
            <button className="contentbutton" onClick={handleNewDoc}>Add Doc</button>
            <div className="content-block-3">
              <h3>Overview</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                You can add new Documents from this interface here! Go ahead
                and give it a try by click on the "New Doc" button in the top 
                right of this tab!
              </p>
            </div>
            {showNewDoc && (
              <div className="form-modal">
                <nav>
                  <h3>Add a New Document</h3>
                </nav>
              </div>
            )}
          </div>
        )}
        {activeTab === 'Events' && (
          <div>
            <nav>
            <h3>Event Manager</h3>
            </nav>
            <button className="contentbutton" onClick={handleEvents}>New Event</button>
            <div className="content-block-3">
            <div className='spacer-3'/>
              <h3>Overview of Events</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                You can create new Events from this interface here! Go ahead
                and give it a try by click on the "New Event" button in the top 
                right of this tab!
              </p>
            </div>
            <div className="content-block">
              <h3>Current Events</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                This Will Show A List of Current Events
              </p>
            </div>
            <div className="content-block-2">
              <h3>Upcoming Events</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                This Will Show A List of Upcoming Events
              </p>
            </div>
            {showEvents && (
              <div className="form-modal">
                <nav>
                  <h3>Create a New Event</h3>
                </nav>
                <button className='contentbutton' onClick={() => setShowEvents(false)}>Create</button>
                <div className='spacer-3'/>
                <label>
                  Event Name: <input/>
                </label>
                <label>
                  Event Start: <input type='date'/>
                </label>
                <label>
                  Event End: <input type='date'/>
                </label>
                <label>
                  Event Icon:
                  <select>
                    <option value=''>Select Option</option>
                  </select>
                </label>
                <label>
                  Members:
                  <select>
                    <option value=''>Select Option</option>
                  </select>
                </label>
                <label>
                  Event Details:
                </label>
                <textarea/>
              </div>
            )}
          </div>
        )}
        {activeTab === 'Scheduling' && (
          <Schedule/>
        )}
        {activeTab === 'Workflows' && (
          <div>
            <nav>
              <h3>Workflow Manager</h3>
            </nav>
            <button className="contentbutton">New Flow</button>
            <div className="spacer-3"/>
            <div className="content-block-3">
              <h3 onClick={() => setActiveTab('Tasks')}>Task Manager</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                You can create Task Boards for your different teams and projects
                with this easy to use interface!
              </p>
            </div>
            <div className="content-block">
              <h3 onClick={() => setActiveTab('Flows')}>Workflows</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                You can create custom flow charts for business flows like process
                and methodology flows, call and chat or bot flow planning, marketing
                strategy, as well as anything else you can think of!
              </p>
            </div>
            <div className="content-block-2">
              <h3 onClick={() => setActiveTab('Alerts')}>Alert Automation</h3>
              <div className="spacer-2"/>
              <div className="spacer-3"/>
              <p>
                This component is not yet functioning but will be added in the future
                for things like Task Manager task reminders, KPI Alerts, and automated
                analasys of a selected Log column to compare things like averages and
                differences against values and arguments that you set.
              </p>
            </div>
          </div>
        )}
        {activeTab === 'Tasks' && (
          <Tasks/>
        )}
        {activeTab === 'Flows' && (
          <div>
            <nav>
              <h3>{activeTab}</h3>
            </nav>
          </div>
        )}
        {activeTab === logtab && (
          <Logtab/>
        )}
        {activeTab === dashtab && (
          <Dashtab/>
        )}
        {showChartModal && (
          <div className="form-modal">
            <nav>
            <h2>Create Chart</h2>
            </nav>
            <label>Select Chart Type</label>
            <select>
              <option value=''></option>
              <option value='Single Value'>Single Value</option>
              <option value='Bar Graph'>Bar Graph</option>
              <option value='Plot Chart'>Plot Chart</option>
              <option value='Line Chart'>Line Chart</option>
            </select>
            <label>Select Chart Values</label>
            <select onChange={(e) => setChartData({ ...chartData, column: e.target.value })}>
              <option value=''></option>
              {formFields.map((field, index) => (
                <option key={index} value={field.name}>{field.name}</option>
              ))}
            </select>
            <select onChange={(e) => setChartData({ ...chartData, column: e.target.value })}>
              <option value=''></option>
              {formFields.map((field, index) => (
                <option key={index} value={field.name}>{field.name}</option>
              ))}
            </select>
            <button onClick={handleSaveChart}>Save Chart</button>
          </div>
        )}
        {showOptions && (
          <Options/>
        )}
        {showCreate && (
          <div className="form-modal">
            <nav>
            <h3>Name Your New Log</h3>
            </nav>
            <input
              type="text"
              placeholder="Enter Log name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
            <button className='contentbutton-3' onClick={handleCreateForm}>Create Log</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';

const Logtab = () => {
    const [activeTab, setActiveTab] = useState('');
    const [showDataForm, setShowDataForm] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [formName, setFormName] = useState('');

    const handleNewLog = () => {
        setShowDataForm(!showDataForm);
        setShowFormModal(false);
    };
    const handleAddField = () => {
        setFormFields([...formFields, { name: '', type: '' }]);
    };
    const handleFieldChange = (index, e) => {
        const newFields = [...formFields];
        newFields[index][e.target.name] = e.target.value;
        setFormFields(newFields);
    };
    const handleAddData = () => {
        setShowFormModal(true);
    };
    const handleSaveData = () => {
        const newData = formFields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
        }, {});
        
        const tables = JSON.parse(localStorage.getItem('tables')) || {};
        const updatedTableData = [...(tables[activeTab] || []), newData];
        tables[activeTab] = updatedTableData;
        localStorage.setItem('tables', JSON.stringify(tables));
        setTableData(updatedTableData);
        setShowFormModal(false);
    };

    //Needs work
    const handleSaveForm = () => {
        const formData = {
          formName,
          fields: formFields
        };
        const forms = JSON.parse(localStorage.getItem('forms')) || [];
        forms.push(formData);
        localStorage.setItem('forms', JSON.stringify(forms));
        alert('Form and table created successfully!');
        setShowFormModal(false);
    };
    const handleFieldOption = (index, e) => {
        //Needs Logic
    };

    return (
        <div>
        <nav>
          <h3>{activeTab}</h3>
        </nav>
        <button className='contentbutton' >Make Chart</button>
        <button className='contentbutton' onClick={handleAddData}>Edit Table</button>
        <button className='contentbutton' onClick={handleNewLog}>New Log</button>
        <div className="spacer"/>
        <table>
          <thead>
            <tr>
              {formFields.map((field, index) => (
                <th key={index}>{field.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {formFields.map((field, fieldIndex) => (
                  <td key={fieldIndex}>{row[field.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {showFormModal && (
          <div className="form-modal">
            <nav>
              <h3>Add Fields to Your Log</h3>
            </nav>
            <button className='contentbutton' onClick={activeTab !== 'Home' ? handleSaveData : handleSaveForm}>Save</button>
            <button className='contentbutton' onClick={handleAddField}>Add Field</button>
            <div className="spacer-3"/>
            {formFields.map((field, index) => (
              <div key={index}>
                <label>Field Name</label>
                <input
                  type="text"
                  name="name"
                  value={field.name}
                  onChange={(e) => handleFieldChange(index, e)}
                />
                <select
                  name="type"
                  value={field.type}
                  onChange={(e) => handleFieldChange(index, e)}
                >
                  <option value="">Select Option</option>
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                  <option value="email">Email</option>
                  <option value="select">Select</option>
                  <option value="slider">Slider</option>
                  <option value="id">ID</option>
                  <option value="textarea">Text Area</option>
                </select>
                {field.type === 'select' && (
                  <div>
                  <button className='contentbutton-2'>Add Option</button>
                    <div>
                      <label>Options:</label>
                      <input type="text" name="option" value={field.options} onChange={(e) => handleFieldOption(index, e)}/>
                    </div>
                  </div>
                )}
                {field.type === 'id' && (
                  <div>
                    <label>ID Label:</label>
                    <input 
                      type="text" 
                      name="id" 
                      value=''
                      placeholder="3-6 Letters with No Spaces..."
                      onChange={(e) => handleFieldOption(index, e)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {showDataForm && (
          <div className="form-modal">
            <nav>
            <h3>New Item for {activeTab}</h3>
            </nav>
            <button className='contentbutton' onClick={() => setShowDataForm(false)}>Submit</button>
            <div className="spacer-4"/>
            {formFields.map((field, index) => (
              <label key={index}>
                {field.name}: {
                  field.type === 'text' && (
                    <input type='text'></input>
                  )
                }
                {
                  field.type === 'id' && (
                    <text style={{marginLeft: '5px'}}>ID - 00{index + 1}</text>
                  )
                }
                {
                  field.type === 'select' && (
                    <select>
                      <option value=''>Select Option</option>
                    </select>
                  )
                }
                {
                  field.type === 'date' && (
                    <input type='date'/>
                  )
                }
                {
                  field.type === 'email' && (
                    <input type='email'/>
                  )
                }
                {
                  field.type === 'textarea' && (
                    <textarea />
                  )
                }
                {
                  field.type === 'slider' && (
                    <label className="switch">
                      <input type='checkbox' />
                      <span className="slider"></span>
                    </label>
                  )
                }
              </label>
            ))}
          </div>
        )}
      </div>
    )
};

export default Logtab;
// src/App.js

import React, { useState } from 'react';
import './Customer.css';
import Popup from './Popup';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [segmentName, setSegmentName] = useState('');

  const availableSchemas = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const handleSaveSegment = () => {
    setShowPopup(true);
  };

  const handleAddSchema = (schema) => {
    setSelectedSchemas([...selectedSchemas, schema]);
  };

  const handleRemoveSchema = (schema) => {
    setSelectedSchemas(selectedSchemas.filter((s) => s.value !== schema.value));
  };

  const handleSegmentNameChange = (name) => {
    setSegmentName(name);
  };

  const handleSubmit = () => {
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map((s) => ({ [s.value]: s.label })),
    };

    fetch('https://webhook.site/YOUR_WEBHOOK_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setShowPopup(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <button onClick={handleSaveSegment}>Save segment</button>
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onAddSchema={handleAddSchema}
          onRemoveSchema={handleRemoveSchema}
          onSubmit={handleSubmit}
          selectedSchemas={selectedSchemas}
          availableSchemas={availableSchemas.filter(
            (schema) => !selectedSchemas.find((s) => s.value === schema.value)
          )}
          segmentName={segmentName}
          onSegmentNameChange={handleSegmentNameChange}
        />
      )}
    </div>
  );
}

export default App;

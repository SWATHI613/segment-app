// src/Popup.js

import React, { useState } from 'react';
import './Customer.css';

function Popup({
  onClose,
  onAddSchema,
  onRemoveSchema,
  onSubmit,
  selectedSchemas,
  availableSchemas,
  segmentName,
  onSegmentNameChange,
}) {
  const [newSchema, setNewSchema] = useState('');

  const handleAddSchemaClick = () => {
    const schema = availableSchemas.find((s) => s.value === newSchema);
    if (schema) {
      onAddSchema(schema);
      setNewSchema('');
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Save Segment</h2>
        <label>
          Segment Name:
          <input
            type="text"
            value={segmentName}
            onChange={(e) => onSegmentNameChange(e.target.value)}
          />
        </label>
        <label>
          Add schema to segment:
          <select
            value={newSchema}
            onChange={(e) => setNewSchema(e.target.value)}
          >
            <option value="">Select schema</option>
            {availableSchemas.map((schema) => (
              <option key={schema.value} value={schema.value}>
                {schema.label}
              </option>
            ))}
          </select>
          <button onClick={handleAddSchemaClick}>+Add new schema</button>
        </label>
        <div className="selected-schemas">
          {selectedSchemas.map((schema) => (
            <div key={schema.value} className="selected-schema">
              <label>
                {schema.label}:
                <select
                  value={schema.value}
                  onChange={(e) =>
                    onRemoveSchema({ ...schema, value: e.target.value })
                  }
                >
                  <option value={schema.value}>{schema.label}</option>
                  {availableSchemas.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
        </div>
        <button onClick={onSubmit}>Save segment</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;

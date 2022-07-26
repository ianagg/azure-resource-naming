import React from 'react';
import { useState } from 'react';

function DataBlock({
  label,
  keyName,
  displayValues,
  event,
  defaultValue = '',
}) {
  const [data, setData] = useState(defaultValue);
  const handleEvent = (e) => {
    setData(e.target.value);
    event(keyName, e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      {displayValues && (
        <select value={data} onChange={(e) => handleEvent(e)}>
          {Array.from(displayValues.entries()).map((entry) => {
            const [key, value] = entry;
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
        </select>
      )}
      {!displayValues && (
        <input type="text" value={data} onChange={(e) => handleEvent(e)} />
      )}
    </div>
  );
}

export default DataBlock;

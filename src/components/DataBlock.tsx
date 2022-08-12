import { ChangeEvent } from 'react';
import { useState } from 'react';
import HelpfulLabel from './HelpfulLabel';

interface DataBlockProps {
  label: string;
  content: string;
  keyName: string;
  displayValues?: Map<string, string>;
  onDataChange: (key: string, data: string) => void;
  defaultValue?: string;
}

function DataBlock({
  label,
  content,
  keyName,
  displayValues,
  onDataChange,
  defaultValue = '',
}: DataBlockProps) {
  const [data, setData] = useState(defaultValue);
  const handleEvent = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setData(e.target.value);
    onDataChange(keyName, e.target.value);
  };

  return (
    <>
      <HelpfulLabel label={label} content={content} />
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
        <input
          data-testid="inputField"
          type="text"
          value={data}
          onChange={(e) => handleEvent(e)}
        />
      )}
    </>
  );
}

export default DataBlock;

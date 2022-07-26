import ResourceForm from './ResourceForm';
import { useState } from 'react';

function ResourceName() {
  const [resourceName, setResourceName] = useState('');
  const handleChange = (resourceValues, joinChar = '-') => {
    setResourceName(resourceValues.filter((s) => s).join(joinChar));
  };

  return (
    <div>
      <p>{resourceName}</p>
      <ResourceForm onChange={handleChange} />
    </div>
  );
}

export default ResourceName;

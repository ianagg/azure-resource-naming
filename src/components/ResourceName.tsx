import ResourceForm from './ResourceForm';
import { useState } from 'react';

function ResourceName() {
  const [resourceName, setResourceName] = useState('');
  const handleChange = (resourceValues: string[]) => {
    const joinChar = '-';
    setResourceName(resourceValues.filter((s) => s).join(joinChar));
  };

  const isNameExists = Boolean(resourceName);
  return (
    <div className='name'>     
        {isNameExists && <span className='value'>{resourceName}</span>}
        {!isNameExists && <span className='placeholder'>{'your-resource-name'}</span>}
      <ResourceForm onResourceChange={handleChange} />
    </div>
  );
}

export default ResourceName;

import React from 'react';
import { useState } from 'react';
import regionsJson from '../data/regions';
import DataBlock from './DataBlock';
import ResourceType from './ResourceType';

function ResourceForm(props) {
  const [resourceValues, setResourceValues] = useState({
    resourceType: '',
    businessUnit: '',
    appName: '',
    subscriptionType: '',
    env: '',
    region: '',
    instance: '',
  });

  const environments = new Map();
  environments.set('', '');
  environments.set('dev', 'development');
  environments.set('stage', 'staging');
  environments.set('prod', 'production');
  environments.set('test', 'tes');

  const regions = new Map();
  regions.set('', '');
  regionsJson.map((region) =>
    regions.set(region.name, region.regionalDisplayName)
  );

  const onChange = (key, data) => {
    resourceValues[key] = data;
    setResourceValues(resourceValues);
    props.onChange(Object.values(resourceValues));
  };

  return (
    <div className="resource">
      <ResourceType keyName={'resourceType'} event={onChange} />
      <DataBlock
        label={'Business unit:'}
        keyName={'businessUnit'}
        event={onChange}
      />
      <DataBlock
        label={'Application or service name:'}
        keyName={'appName'}
        event={onChange}
      />
      <DataBlock
        label={'Subscription type:'}
        keyName={'subscriptionType'}
        event={onChange}
      />
      <DataBlock
        label={'Deployment environment:'}
        keyName={'env'}
        displayValues={environments}
        event={onChange}
      />
      <DataBlock
        label={'Region:'}
        keyName={'region'}
        displayValues={regions}
        event={onChange}
      />
      <DataBlock label={'Instance:'} keyName={'instance'} event={onChange} />
    </div>
  );
}

export default ResourceForm;

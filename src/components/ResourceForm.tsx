import { useState } from 'react';
import regionsJson from '../data/regions.json';
import DataBlock from './DataBlock';
import ResourceType from './ResourceType';

interface ResourceFormProps {
  onResourceChange: (resourceValues: string[]) => void;
}

function ResourceForm({onResourceChange} : ResourceFormProps) {
  const defaultResourceValues = new Map()
  .set('resourceType', '')
  .set('businessUnit', '')
  .set('appName', '')
  .set('subscriptionType', '')
  .set('env', '')
  .set('region', '')
  .set('instance', '');
  
  const [resourceValues, setResourceValues] = useState<Map<string, string> | undefined>(defaultResourceValues);

  const environments = new Map()
  .set('', '')
  .set('dev', 'development')
  .set('stage', 'staging')
  .set('prod', 'production')
  .set('test', 'tes');

  const regions = new Map();
  regions.set('', '');
  regionsJson.map((region) =>
    regions.set(region.name, region.regionalDisplayName)
  );

  const onChange = (key: string, data: string) => {
    resourceValues!.set(key, data);
    setResourceValues(resourceValues);
    onResourceChange(Array.from(resourceValues!.values()));
  };

  return (
    <div className="resource">
      <ResourceType keyName={'resourceType'} onDataChange={onChange} />
      <DataBlock
        label={'Business unit:'}
        content={'Top-level division of your company that owns the subscription or workload the resource belongs to'}
        keyName={'businessUnit'}
        onDataChange={onChange}
      />
      <DataBlock
        label={'Application or service name:'}
        content={'Name of the application, workload, or service that the resource is a part of'}
        keyName={'appName'}
        onDataChange={onChange}
      />
      <DataBlock
        label={'Subscription type:'}
        content={'Summary description of the purpose of the subscription that contains the resource'}
        keyName={'subscriptionType'}
        onDataChange={onChange}
      />
      <DataBlock
        label={'Deployment environment:'}
        content={'The stage of the development lifecycle for the workload that the resource supports'}
        keyName={'env'}
        displayValues={environments}
        onDataChange={onChange}
      />
      <DataBlock
        label={'Region:'}
        content={'The Azure region where the resource is deployed'}
        keyName={'region'}
        displayValues={regions}
        onDataChange={onChange}
      />
      <DataBlock
        label={'Instance:'}
        content={'The inventory numbering'}
        keyName={'instance'}
        onDataChange={onChange} />
    </div>
  );
}

export default ResourceForm;
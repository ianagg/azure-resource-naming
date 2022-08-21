import { useState } from 'react';
import regionsJson from '../data/regions.json';
import DataBlock from './DataBlock';
import ResourceType from './ResourceType';
import '../styles/ResourceForm.css';

interface ResourceFormProps {
  onResourceChange: (nameComponents: string[], resourceId: string) => void;
}

function ResourceForm({ onResourceChange }: ResourceFormProps) {
  const [resourceId, setResourceId] = useState('');
  const defaultResourceValues = new Map()
    .set('resourceType', '')
    .set('businessUnit', '')
    .set('appName', '')
    .set('subscriptionType', '')
    .set('env', '')
    .set('region', '')
    .set('instance', '');

  const [resourceValues, setResourceValues] = useState<Map<string, string>>(
    defaultResourceValues
  );

  const environments = new Map()
    .set('', '')
    .set('dev', 'development')
    .set('stage', 'staging')
    .set('prod', 'production')
    .set('test', 'test');

  const regions = new Map();
  regions.set('', '');
  regionsJson.map((region) =>
    regions.set(region.name, region.regionalDisplayName)
  );

  const onChange = (key: string, data: string) => {
    resourceValues!.set(key, data);
    setResourceValues(resourceValues);
    onResourceChange(nameArray(), resourceId);
  };

  const onResourceTypeChange = (typeData: string, resourceId: string) => {
    resourceValues!.set('resourceType', typeData);
    setResourceValues(resourceValues);
    setResourceId(resourceId);
    onResourceChange(nameArray(), resourceId);
  };

  const nameArray = () => {
    const valuesArr = Array.from(resourceValues!.values());
    return valuesArr.filter((s) => s);
  };

  return (
    <div className="resourceForm">
      <ResourceType onDataChange={onResourceTypeChange} />
      <DataBlock
        label={'Business unit:'}
        content={
          'Top-level division of your company that owns the subscription or workload the resource belongs to'
        }
        keyName={'businessUnit'}
        onDataChange={onChange}
      />
      <DataBlock
        label={'Application name:'}
        content={
          'Name of the application, workload, or service that the resource is a part of'
        }
        keyName={'appName'}
        onDataChange={onChange}
      />
      <DataBlock
        label={'Subscription type:'}
        content={
          'Summary description of the purpose of the subscription that contains the resource'
        }
        keyName={'subscriptionType'}
        onDataChange={onChange}
      />
      <DataBlock
        label={'Deployment environment:'}
        content={
          'The stage of the development lifecycle for the workload that the resource supports'
        }
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
        content={'Instance number'}
        keyName={'instance'}
        onDataChange={onChange}
      />
    </div>
  );
}

export default ResourceForm;

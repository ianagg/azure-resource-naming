import { useState } from 'react';
import regionsJson from '../data/regions.json';
import DataBlock from './DataBlock';
import ResourceType from './ResourceType';
import '../styles/ResourceForm.css'

interface ResourceFormProps {
  onResourceChange: (name: string, isValid: boolean, errors: string[]) => void;
}

function ResourceForm({onResourceChange} : ResourceFormProps) {
  const [joinChar, setJoinChar] = useState<string | undefined>();
  const [regex, setRegex] = useState<string | undefined>();
  const [errors, setErrors] = useState<string[]>([]);

  const defaultResourceValues = new Map()
  .set('resourceType', '')
  .set('businessUnit', '')
  .set('appName', '')
  .set('subscriptionType', '')
  .set('env', '')
  .set('region', '')
  .set('instance', '');
  
  const [resourceValues, setResourceValues] = useState<Map<string, string>>(defaultResourceValues);

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
    validate(resourceValues, joinChar, regex, errors);
  };

  const onResourceTypeChange = (typeData: string, joinChar?: string, regex?: string, errors?: string[]) => {  
    setJoinChar(joinChar);
    setRegex(regex);
    setErrors(errors?? []);

    resourceValues!.set('resourceType', typeData);
    setResourceValues(resourceValues);
    
    validate(resourceValues, joinChar, regex, errors);
  }

  const validate = (resourceValues: Map<string,string>, joinChar?: string, regex?: string, errors?: string[]) => {
    const valuesArr = Array.from(resourceValues!.values());
    const name = valuesArr.filter((s) => s).join(joinChar?? "");
    if (regex) {
      const regexExp = new RegExp(regex);
      const isValid = regexExp.test(name);
      onResourceChange(name, isValid, errors?? []);
    } else 
    {
      onResourceChange(name, true, []);
    }
  }

  return (
    <div className="resourceForm">
      <ResourceType onDataChange={onResourceTypeChange} />
      <DataBlock
        label={'Business unit:'}
        content={'Top-level division of your company that owns the subscription or workload the resource belongs to'}
        keyName={'businessUnit'}
        onDataChange={onChange}
      />
      <DataBlock
        label={'Application name:'}
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
        content={'Instance number'}
        keyName={'instance'}
        onDataChange={onChange} />
    </div>
  );
}

export default ResourceForm;
import { useState } from 'react';
import providers from '../data/providers.json';
import DataBlock from './DataBlock';
import Recomendation from './Recomendation';

interface ResourceTypeProps {
  onDataChange: (typeData: string, resourceId: string) => void;
}

function ResourceType({ onDataChange }: ResourceTypeProps) {
  const [provider, setProvider] = useState('');
  const [entity, setEntity] = useState('');
  const [listOfEntities, setlistOfEntities] = useState<string[]>([]);
  const [resourceType, setResourceType] = useState('');

  var providersDict: { [key: string]: string[] } = {};
  providers.map((data) => (providersDict[data.provider] = data.entities));

  const onProviderChange = (dataProvider: string) => {
    setProvider(dataProvider);
    if (providersDict[dataProvider])
      setlistOfEntities(providersDict[dataProvider]);
    else setlistOfEntities([]);
    onChange(dataProvider, entity, resourceType);
  };

  const onEntityChange = (dataEntity: string) => {
    setEntity(dataEntity);
    onChange(provider, dataEntity, resourceType);
  };

  const onChange = (
    dataProvider: string,
    dataEntity: string,
    value: string
  ) => {
    setResourceType(value);
    const resourceId = [dataProvider, dataEntity].join('/');
    onDataChange(value, resourceId);
  };

  const onResourceTypeChange = (key: string, value: string) => {
    onChange(provider, entity, value);
  };

  return (
    <>
      <label>Provider:</label>
      <select
        data-testid="provider"
        value={provider}
        onChange={(e) => onProviderChange(e.target.value)}
      >
        <option value=""></option>
        {providers.map((data) => {
          return (
            <option key={data.provider} value={data.provider}>
              {data.provider}
            </option>
          );
        })}
      </select>
      <label>Entity:</label>
      <select
        data-testid="entity"
        value={entity}
        onChange={(e) => onEntityChange(e.target.value)}
      >
        <option value=""></option>
        {listOfEntities.map((ent) => {
          return (
            <option key={ent} value={ent}>
              {ent}
            </option>
          );
        })}
      </select>
      <DataBlock
        label={'Resource type:'}
        content={
          'An abbreviation that represents the type of Azure resource or asset'
        }
        keyName={'resourceType'}
        onDataChange={onResourceTypeChange}
      />
      <Recomendation
        dataProvider={provider}
        dataEntity={entity}
        resourceType={resourceType}
      />
    </>
  );
}

export default ResourceType;

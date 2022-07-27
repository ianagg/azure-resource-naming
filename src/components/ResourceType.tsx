import { useState } from 'react';
import abbr from '../data/abbreviations.json';
import providers from '../data/providers.json';
import HelpfulLabel from './HelpfulLabel';

interface ResourceTypeProps {
  keyName: string
  onDataChange: (key:string, data: string) => void
}

function ResourceType({ keyName, onDataChange } : ResourceTypeProps) {
  const [provider, setProvider] = useState('');
  const [entity, setEntity] = useState('');
  const [listOfEntities, setlistOfEntities] = useState<string[]>([]);
  const [recomendation, setRecomendation] = useState('');
  const [resourceType, setResourceType] = useState('');

  const isMatching = resourceType === recomendation;
  var abbrDict: {[key:string]: string} = {};
  abbr.map((data) => (abbrDict[data.resourceId] = data.abbreviation));

  var providersDict: {[key:string]: string[]} = {};
  providers.map((data) => (providersDict[data.provider] = data.entities));

  const onProviderChange = (dataProvider: string) => {
    setProvider(dataProvider);
    if (providersDict[dataProvider])
      setlistOfEntities(providersDict[dataProvider]);
    else setlistOfEntities([]);
    addRecomendation(dataProvider, entity);
  };

  const onEntityChange = (dataEntity: string) => {
    setEntity(dataEntity);
    addRecomendation(provider, dataEntity);
  };

  const addRecomendation = (dataProvider: string , dataEntity: string) => {
    const resourceId = [dataProvider, dataEntity].join('/');
    setRecomendation(abbrDict[resourceId]);
  };

  const onChange = (value: string) => {
    setResourceType(value);
    onDataChange(keyName, value);
  };

  return (
    <>
      <label>Provider:</label>
      <select
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
      <select value={entity} onChange={(e) => onEntityChange(e.target.value)}>
        <option value=""></option>
        {listOfEntities.map((ent) => {
          return (
            <option key={ent} value={ent}>
              {ent}
            </option>
          );
        })}
      </select>
      <HelpfulLabel
        label={'Resource type:'}
        content={'An abbreviation that represents the type of Azure resource or asset'}
      />
      <input
        type="text"
        value={resourceType}
        onChange={(e) => onChange(e.target.value)}
      />
      {!isMatching && recomendation && (
        <p className="recomendation">
          Recomended value for resource type: <b>{recomendation}</b>
        </p>
      )}
    </>
  );
}

export default ResourceType;
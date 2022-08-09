import { useState } from 'react';
import abbr from '../data/abbreviations.json';
import providers from '../data/providers.json';
import validations from '../data/validation.json';
import HelpfulLabel from './HelpfulLabel';

interface ResourceTypeProps {
  onDataChange: (typeData: string, joinChar?: string, regex?: string, errors?: string[]) => void
}

interface Validation {
  joinChar: string,
  regex: string,
  errors: string[],
}

function ResourceType({ onDataChange } : ResourceTypeProps) {
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

  var validationsDict: {[key:string]: Validation} = {};
  validations.map((data) => (validationsDict[data.resourceId] = {joinChar: data.joinChar, regex: data.regex, errors: data.errors} as Validation));

  const onProviderChange = (dataProvider: string) => {
    setProvider(dataProvider);
    if (providersDict[dataProvider])
      setlistOfEntities(providersDict[dataProvider]);
    else setlistOfEntities([]);
    addRecomendation(dataProvider, entity);

    onChange(dataProvider, entity, resourceType);
  };

  const onEntityChange = (dataEntity: string) => {
    setEntity(dataEntity);
    addRecomendation(provider, dataEntity);
    onChange(provider, dataEntity, resourceType);
  };

  const addRecomendation = (dataProvider: string , dataEntity: string) => {
    const resourceId = [dataProvider, dataEntity].join('/');
    setRecomendation(abbrDict[resourceId]);
  };

  const onChange = (dataProvider: string, dataEntity: string, value: string) => {
    setResourceType(value);
    const resourceId = [dataProvider, dataEntity].join('/');
    const validationRule = validationsDict[resourceId];
    if (validationRule) {
      onDataChange(value, validationRule.joinChar, validationRule.regex, validationRule.errors);
    } else {
      onDataChange(value);
    } 
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
        onChange={(e) => onChange(provider, entity, e.target.value)}
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
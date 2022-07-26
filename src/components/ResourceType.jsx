import React from 'react';
import { useState } from 'react';
import abbr from '../data/abbreviations';
import providers from '../data/providers';

function ResourceType({ keyName, event }) {
  const [provider, setProvider] = useState('');
  const [entity, setEntity] = useState('');
  const [listOfEntities, setlistOfEntities] = useState([]);
  const [recomendation, setRecomendation] = useState('');
  const [resourceType, setResourceType] = useState('');

  const isMatching = resourceType === recomendation;
  var abbrDict = {};
  abbr.map((data) => (abbrDict[data.resourceId] = data.abbreviation));

  var providersDict = {};
  providers.map((data) => (providersDict[data.provider] = data.entities));

  const onProviderChange = (provider) => {
    setProvider(provider);
    if (providersDict[provider]) setlistOfEntities(providersDict[provider]);
    else setlistOfEntities([]);
    addRecomendation(provider, entity);
  };

  const onEntityChange = (entity) => {
    setEntity(entity);
    addRecomendation(provider, entity);
  };

  const addRecomendation = (provider, entity) => {
    const resourceId = [provider, entity].join('/');
    setRecomendation(abbrDict[resourceId]);
    if (!resourceType) {
      onChange(abbrDict[resourceId]);
    }
  };

  const onChange = (value) => {
    setResourceType(value);
    event(keyName, value);
  };

  return (
    <div>
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
      <label>Resource type:</label>
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
    </div>
  );
}

export default ResourceType;

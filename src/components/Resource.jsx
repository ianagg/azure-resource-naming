import React from 'react'
import { useState } from 'react'
import regions from "../data/regions";

function Resource() {
  const [resourceType, setResourceType] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');
  const [appName, setAppName] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [instance, setInstance] = useState('');
  const [env, setEnv] = useState('');
  const [region, setRegion] = useState('');

  const [resourceName, setResourceName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const resourceValues = [
      resourceType,
      businessUnit,
      appName,
      subscriptionType,
      env,
      region,
      instance,
    ];
    setResourceName(resourceValues.filter((s) => s).join('-'));
  };

  return (
    <div className="resource">
      <h2>Generate resource name</h2>
      <form onSubmit={handleSubmit}>
        <label>Resource type:</label>
        <input
          type="text"
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
        />
        <label>Business unit:</label>
        <input
          type="text"
          value={businessUnit}
          onChange={(e) => setBusinessUnit(e.target.value)}
        />
        <label>Application ot service name:</label>
        <input
          type="text"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
        />
        <label>Subscription type:</label>
        <input
          type="text"
          value={subscriptionType}
          onChange={(e) => setSubscriptionType(e.target.value)}
        />
        <label>Deployment environment:</label>
        <select
            value={env}
            onChange={(e) => setEnv(e.target.value)}
          >
            <option value=""></option>
            <option value="dev">development</option>
            <option value="stage">staging</option>
            <option value="prod">production</option>
            <option value="test">test</option>
        </select>
        <label>Region:</label>
        <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value=""></option>
            {
              regions.map((region) => {
                return <option value={region.name}>{region.regionalDisplayName}</option> 
              })
            }
        </select>
        <label>Instance:</label>
        <input
          type="number"
          value={instance}
          onChange={(e) => setInstance(e.target.value)}
        />
        {<button>Generate name</button>}
      </form>
      <p>{resourceName}</p>
    </div>
  );
}

export default Resource

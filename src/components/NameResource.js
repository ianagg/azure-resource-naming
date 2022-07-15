import { useState } from "react";

function NameResource() {
    const [ resourceType, setResourceType] = useState('');
    const [ businessUnit, setBusinessUnit] = useState('');
    const [ appName, setAppName] = useState('');
    const [ subscriptionType, setSubscriptionType] = useState('');
    const [ instance, setInstance] = useState('');

    const [ resourceName, setResourceName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const resourceValues = [
            resourceType,
            businessUnit,
            appName,
            subscriptionType,
            instance
        ];
        setResourceName(resourceValues.filter(s => s).join('-')); 
    }

    return (
    <div className="nameResource">
        <h2>Generate resource name</h2>
         <form onSubmit={handleSubmit}>
          <label>Resource type:</label>
          <input
            type="text"
            value={ resourceType }
            onChange={ (e) => setResourceType(e.target.value) }
          />
          <label>Business unit:</label>
          <input
            type="text"
            value={ businessUnit }
            onChange={ (e) => setBusinessUnit(e.target.value) }
          />
          <label>Application ot service name:</label>
          <input
            type="text"
            value={ appName }
            onChange={ (e) => setAppName(e.target.value) }
          />
          <label>Subscription type:</label>
          <input
            type="text"
            value={ subscriptionType }
            onChange={ (e) => setSubscriptionType(e.target.value) }
          />
          <label>Instance:</label>
          <input
            type="text"
            value={ instance }
            onChange={ (e) => setInstance(e.target.value) }
          />
          { <button>Generate name</button> }
          <p>{ resourceName }</p>
         </form>
    </div>
    );
}
 
export default NameResource;
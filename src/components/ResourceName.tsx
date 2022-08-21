import ResourceForm from './ResourceForm';
import { useState } from 'react';
import { Copy20Regular, Checkmark24Regular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-components';
import '../styles/ResourceResult.css';
import ValidationError from './ValidationError';

function ResourceName() {
  const [resourceName, setResourceName] = useState('');
  const [nameArray, setNameArray] = useState<string[]>([]);
  const [resourceId, setResourceId] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const delay = 1000;

  const handleChange = (nameArray: string[], resourceId: string) => {
    setNameArray(nameArray);
    setResourceId(resourceId);
  };

  const handleValidation = (isValid: boolean, name: string) => {
    setIsNameValid(isValid);
    setResourceName(name);
  };

  const copyToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  const handleCopyClick = (copyText: string) => {
    copyToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, delay);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isNameExists = Boolean(resourceName);
  return (
    <>
      <ResourceForm onResourceChange={handleChange} />
      <div className="resourceResult">
        <div className={isNameValid ? 'resourceName' : 'invalidName'}>
          <p>
            {isNameExists && <span className="value">{resourceName} </span>}
            {!isNameExists && (
              <span className="placeholder">{'your-resource-name'}</span>
            )}
          </p>
          <Tooltip
            content="Copied!"
            relationship="description"
            visible={visible && isCopied}
            onVisibleChange={(_ev, data) => setVisible(data.visible)}
            withArrow
            hideDelay={delay}
          >
            <button
              data-testid="copyButton"
              onClick={() => handleCopyClick(resourceName)}
              disabled={!isNameValid || !resourceName}
            >
              <span className="container">
                {isCopied ? <Checkmark24Regular /> : <Copy20Regular />}
              </span>
            </button>
          </Tooltip>
        </div>
        <ValidationError
          nameComponents={nameArray}
          resourceId={resourceId}
          onValidate={handleValidation}
        />
      </div>
    </>
  );
}

export default ResourceName;

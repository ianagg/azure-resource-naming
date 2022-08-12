import ResourceForm from './ResourceForm';
import { useState } from 'react';
import { Copy20Regular, Checkmark24Regular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-components';
import '../styles/ResourceResult.css';

function ResourceName() {
  const [resourceName, setResourceName] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const delay = 1000;

  const handleChange = (name: string, isValid: boolean, errors: string[]) => {
    setResourceName(name);
    setIsNameValid(isValid);
    setValidationErrors(errors);
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
        <div className="resourceValidation">
          {!isNameValid && (
            <ul data-testid="validationErrors">
              {validationErrors.map((err) => {
                return <li key={err}>{err}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default ResourceName;

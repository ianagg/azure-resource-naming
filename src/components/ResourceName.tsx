import ResourceForm from './ResourceForm';
import { useState } from 'react';
import { Copy20Regular, Checkmark24Regular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-components';
import '../styles/ResourceResult.css'

function ResourceName() {
  const [resourceName, setResourceName] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const delay = 1000;

  const handleChange = (resourceValues: string[]) => {
    const joinChar = '-';
    setResourceName(resourceValues.filter((s) => s).join(joinChar));
  };

  const copyToClipboard = async (text: string) =>  {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = (copyText: string) => {
    if (!copyText) return;
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
  }

  const isNameExists = Boolean(resourceName);
  return (
    <>    
    <ResourceForm onResourceChange={handleChange} />
      <div className='resourceResult'>
      <div className='resourceName'>
        <p>
          {isNameExists && <span className='value'>{resourceName} </span>}
          {!isNameExists && <span className='placeholder'>{'your-resource-name'}</span>}
        </p>
        <Tooltip
          content="Copied!"
          relationship="description"
          visible={visible && isCopied}
          onVisibleChange={(_ev, data) => setVisible(data.visible)}
          withArrow
          hideDelay={delay}
        >
        <button onClick={() => handleCopyClick(resourceName)}>
          <span className='container'>{ isCopied ? <Checkmark24Regular/> : <Copy20Regular/>}</span>
        </button>
      </Tooltip>
      </div>
      <div className="resourceValidation">
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p>
      </div>
    </div>
    </>
  );
}

export default ResourceName;

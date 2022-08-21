import { useEffect } from 'react';
import validations from '../data/validation.json';
import { Validation } from './Validation';

interface ValidationProps {
  nameComponents: string[];
  resourceId: string;
  onValidate: (isValid: boolean, name: string) => void;
}

function ValidationError({
  nameComponents: nameArray,
  resourceId,
  onValidate,
}: ValidationProps) {
  var validationsDict: { [key: string]: Validation } = {};
  validations.map(
    (data) => (validationsDict[data.resourceId] = data as Validation)
  );

  const validation = validationsDict[resourceId] ?? new Validation();
  const name = nameArray.join(validation.joinChar);
  let isValid =
    name.length >= validation.minLength && name.length <= validation.maxLength;

  const validate = (regexStr: string | undefined) => {
    if (regexStr) {
      const regex = new RegExp(regexStr);
      isValid &&= regex.test(name);
    }
  };

  validate(validation.regex);
  validate(validation.startChar);
  validate(validation.endChar);

  useEffect(() => {
    onValidate(isValid, name);
  }, [isValid, name, onValidate]);

  return (
    <div className="resourceValidation">
      {!isValid && (
        <ul data-testid="validationErrors">
          {validation.errors.map((err) => {
            return <li key={err}>{err}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default ValidationError;

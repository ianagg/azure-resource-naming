import abbr from '../data/abbreviations.json';
import { useState, useEffect, useMemo } from 'react';

interface RecomendationProps {
  dataProvider: string;
  dataEntity: string;
  resourceType: string;
}

function Recomendation({
  dataProvider,
  dataEntity,
  resourceType,
}: RecomendationProps) {
  const [recomendation, setRecomendation] = useState('');
  const isMatching = resourceType === recomendation;

  const abbrDict: { [key: string]: string } = useMemo(() => {
    const temp: { [key: string]: string } = {};
    abbr.map((data) => (temp[data.resourceId] = data.abbreviation));
    return temp;
  }, []);

  const resourceId = [dataProvider, dataEntity].join('/');
  useEffect(() => {
    setRecomendation(abbrDict[resourceId]);
  }, [abbrDict, resourceId]);

  return (
    <>
      {!isMatching && recomendation && (
        <p data-testid="recomendation" className="recomendation">
          Recomended value for resource type: <b>{recomendation}</b>
        </p>
      )}
    </>
  );
}

export default Recomendation;

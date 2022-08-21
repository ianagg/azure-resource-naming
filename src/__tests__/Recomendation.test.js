import { render, screen } from '@testing-library/react';
import ResourceType from '../components/ResourceType';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test('recomendation should be rendered when present', () => {
  render(
    <ResourceType
      onDataChange={() => {
        return;
      }}
    />
  );

  userEvent.selectOptions(
    screen.getByTestId('provider'),
    screen.getByRole('option', { name: 'Microsoft.AnalysisServices' })
  );

  userEvent.selectOptions(
    screen.getByTestId('entity'),
    screen.getByRole('option', { name: 'servers' })
  );

  const suggestion = screen.getByTestId('recomendation');
  expect(suggestion).toBeInTheDocument();
});

test('ecomendation should be hidden when requirements are met', () => {
  render(
    <ResourceType
      onDataChange={() => {
        return;
      }}
    />
  );

  userEvent.selectOptions(
    screen.getByTestId('provider'),
    screen.getByRole('option', { name: 'Microsoft.AnalysisServices' })
  );

  userEvent.selectOptions(
    screen.getByTestId('entity'),
    screen.getByRole('option', { name: 'servers' })
  );

  const inputField = screen.getByRole('textbox');
  userEvent.type(inputField, 'as');

  const suggestion = screen.queryByTestId('recomendation');
  expect(suggestion).not.toBeInTheDocument();
});

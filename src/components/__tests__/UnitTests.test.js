import { render, screen } from '@testing-library/react';
import ResourceName from '../ResourceName';
import ResourceType from '../ResourceType';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test('copy button should be inactive on render', () => {
  render(<ResourceName />);
  const copyButton = screen.getByTestId('copyButton');
  expect(copyButton).toBeDisabled();
});

test('copy button should be active when data is present', () => {
  render(<ResourceName />);
  const copyButton = screen.getByTestId('copyButton');
  const inputField = screen.getAllByTestId('inputField')[0];
  userEvent.type(inputField, 'data');
  expect(copyButton).toBeEnabled();
});

test('copy button should be inactive when data is invalid', () => {
  render(<ResourceName />);
  const copyButton = screen.getByTestId('copyButton');

  userEvent.selectOptions(
    screen.getByTestId('provider'),
    screen.getByRole('option', { name: 'Microsoft.AnalysisServices' })
  );

  userEvent.selectOptions(
    screen.getByTestId('entity'),
    screen.getByRole('option', { name: 'servers' })
  );

  expect(copyButton).toBeDisabled();
});

test('error should be rendered when data is invalid', () => {
  render(<ResourceName />);
  userEvent.selectOptions(
    screen.getByTestId('provider'),
    screen.getByRole('option', { name: 'Microsoft.AnalysisServices' })
  );

  userEvent.selectOptions(
    screen.getByTestId('entity'),
    screen.getByRole('option', { name: 'servers' })
  );

  const error = screen.getByTestId('validationErrors');
  expect(error).toBeInTheDocument();
});

test('error should be removed when data is valid', () => {
  render(<ResourceName />);
  userEvent.selectOptions(
    screen.getByTestId('provider'),
    screen.getByRole('option', { name: 'Microsoft.AnalysisServices' })
  );
  userEvent.selectOptions(
    screen.getByTestId('entity'),
    screen.getByRole('option', { name: 'servers' })
  );

  const inputField = screen.getAllByTestId('inputField')[0];
  userEvent.type(inputField, 'validname');

  const error = screen.queryByTestId('validationErrors');
  expect(error).not.toBeInTheDocument();
});

test('suggestion should be rendered when present', () => {
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

  const suggestion = screen.getByTestId('suggestion');
  expect(suggestion).toBeInTheDocument();
});

test('suggestion should be hidden when requirements are met', () => {
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

  const suggestion = screen.queryByTestId('suggestion');
  expect(suggestion).not.toBeInTheDocument();
});

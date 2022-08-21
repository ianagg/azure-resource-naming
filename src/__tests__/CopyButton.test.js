import { render, screen } from '@testing-library/react';
import ResourceName from '../components/ResourceName';
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

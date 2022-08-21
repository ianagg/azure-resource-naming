import { render, screen } from '@testing-library/react';
import ResourceName from '../components/ResourceName';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

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

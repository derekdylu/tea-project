import { render, screen } from '@testing-library/react';
import Error from './Containers/Error';

test('renders the not-found page', () => {
  render(<Error />);
  expect(screen.getByText(/error/i)).toBeInTheDocument();
});

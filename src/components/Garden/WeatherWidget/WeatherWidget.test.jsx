import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import WeatherWidget from './WeatherWidget';

describe('WeatherWidget', () => {
  it('renders correctly', () => {
    render(<WeatherWidget />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<WeatherWidget />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('updates postcode state when typing in input field', () => {
    render(<WeatherWidget />);
    const input = screen.getByLabelText('Enter your postcode to get the latest weather information:');
    fireEvent.change(input, { target: { value: '12345' } });
    expect(input.value).toBe('12345');
  });
})
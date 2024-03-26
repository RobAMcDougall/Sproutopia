import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import GrowthCalendarHarvest from './GrowthCalendarHarvest';

describe('GrowthCalendarHarvest', () => {
  it('renders without crashing', () => {
    render(<GrowthCalendarHarvest />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<GrowthCalendarHarvest />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays correct calendar months', () => {
    render(<GrowthCalendarHarvest />);
    const calendar = screen.getByTestId('calendar');
    
    
    expect(calendar.children.length).toBe(12);

   
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach((month, index) => {
      expect(calendar.children[index]).toHaveTextContent(month);
    });
  });

  it('highlights harvest months correctly', () => {
    render(<GrowthCalendarHarvest />);
    const calendar = screen.getByTestId('calendar');

   
    const harvestMonthsIndices = [2, 3, 4];
    harvestMonthsIndices.forEach(index => {
      expect(calendar.children[index]).toHaveClass('harvest-month');
    });

    
    const nonHarvestMonthsIndices = [0, 1, 5, 6, 7, 8, 9, 10, 11];
    nonHarvestMonthsIndices.forEach(index => {
      expect(calendar.children[index]).not.toHaveClass('harvest-month');
    });
  });
});
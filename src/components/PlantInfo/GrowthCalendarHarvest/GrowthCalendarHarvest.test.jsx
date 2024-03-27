import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import GrowthCalendarHarvest from './GrowthCalendarHarvest';

describe('GrowthCalendarHarvest', () => {
    

    it('renders without crashing', () => {
        render(<GrowthCalendarHarvest />);
    });

   
});
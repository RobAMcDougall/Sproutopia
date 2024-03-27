import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from './Calendar';

describe('Calendar', () => {

    it('renders without crashing', () => {
        render(<Calendar />);
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Calendar />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('displays the correct month and year in the header', () => {
        render(<Calendar />);
        const headerElement = screen.getByRole('heading', { name: /January 2022/i });
        expect(headerElement).toBeInTheDocument();
    });


});



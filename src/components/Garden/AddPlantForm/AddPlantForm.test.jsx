import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import AddPlantForm from './AddPlantForm';

describe('AddPlantForm', () => {
  it('renders without crashing', () => {
    render(<AddPlantForm />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<AddPlantForm />);
    expect(asFragment()).toMatchSnapshot();
  });
  

});

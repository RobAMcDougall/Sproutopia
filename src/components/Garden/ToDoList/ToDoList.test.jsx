import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ToDoList from './ToDoList';


describe('ToDoList', () => {
    it('renders without crashing', () => {
        render(<ToDoList />);
    })

    it('matches snapshot', () => {
        const { asFragment } = render(<ToDoList />);
        expect(asFragment()).toMatchSnapshot();
    })

    it('adds a new task when "Add Task" button is clicked', () => {
        render(<ToDoList />);
        
        const inputElement = screen.getByPlaceholderText('Add new task');
        const addButton = screen.getByText('Add Task');
        
        fireEvent.change(inputElement, { target: { value: 'New Task' } });
        fireEvent.click(addButton);
        
        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

   

})
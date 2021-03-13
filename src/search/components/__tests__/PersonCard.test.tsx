import { screen } from '@testing-library/react';

import { render } from '../../../tests';
import { Person } from '../../store';

import { PersonCard } from '../PersonCard';

const testPerson: Person = {
  name: 'Luke Skywalker',
  height: 172,
  mass: 77,
  hairColor: 'blond',
  skinColor: 'fair',
  eyeColor: 'blue',
  birthYear: '19BBY',
  gender: 'male',
};

describe('PersonCard', () => {
  it('should render nothing when no person selected', () => {
    render(<PersonCard />, { initialState: { search: { selectedOption: null } } });

    expect(screen.queryByTestId('person-card')).not.toBeInTheDocument();
  });

  it('should render person card with person data when person selected', async () => {
    render(<PersonCard />, { initialState: { search: { selectedOption: testPerson } } });

    expect(screen.queryByTestId('person-card')).toBeInTheDocument();

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(await screen.findByText('172')).toBeInTheDocument();
    expect(await screen.findByText('77')).toBeInTheDocument();
    expect(await screen.findByText('blond')).toBeInTheDocument();
    expect(await screen.findByText('fair')).toBeInTheDocument();
    expect(await screen.findByText('blue')).toBeInTheDocument();
    expect(await screen.findByText('19BBY')).toBeInTheDocument();
    expect(await screen.findByText('male')).toBeInTheDocument();
  });
});

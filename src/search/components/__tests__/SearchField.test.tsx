import * as reactRedux from 'react-redux'
import { screen, fireEvent } from '@testing-library/react';

import { SearchField } from '../SearchField';

import { render } from '../../../tests';


describe('SearchField', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchMock.mockClear()
  });
  it('should dispatch searchStart when user types', async () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    render(<SearchField />, { initialState: { search: { options: [] } } });

    const input = await screen.findByRole('textbox');

    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(dummyDispatch).toBeCalledTimes(1);
    expect(dummyDispatch.mock.calls[0][0].payload).toBe('Luke')
  });

  it('should show hint when opened and number data count is more then options length', async () => {
    const options = [...Array(10)].map((_, index) => ({ name: `${index}` }));
    render(<SearchField />, { initialState: { search: { options, count: 11 } } });

    const input = await screen.findByRole('textbox');

    fireEvent.click(input);

    expect(await screen.findByText('10 of 11 options are displayed')).toBeInTheDocument();
  });

  it('should dispatch select when user clicks on option', async () => {
    const options = [...Array(10)].map((_, index) => ({ name: `${index}` }));

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    render(<SearchField />, { initialState: { search: { options } } });

    const input = await screen.findByRole('textbox');
    fireEvent.mouseDown(input);

    const option = await screen.findByText('3');
    fireEvent.click(option);

    expect(dummyDispatch.mock.calls[1][0].payload).toStrictEqual({ name: '3' })
  });
});

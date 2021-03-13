import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import * as rxjsAjax from 'rxjs/ajax';
import { searchEpic, searchStart, searchComplete, searchReducer } from '../slice';

describe('search slice', () => {
  describe('searchEpic', () => {
    const ajaxMock = jest.spyOn(rxjsAjax, 'ajax');

    beforeEach(() => {
      ajaxMock.mockClear()
    });

    it('should dispatch search complete on request success', async () => {
      ajaxMock.mockReturnValue(of({ response: { count: 0, results: [] } } as rxjsAjax.AjaxResponse));

      const actions$ = ActionsObservable.of(searchStart('Luke'));

      const result = await searchEpic(actions$).toPromise();

      expect(result.type).toBe(searchComplete.toString());
    });
  });

  describe('reducer', () => {
    const initialState: ReturnType<typeof searchReducer> = {
      loading: false,
      count: 0,
      options: [],
      selectedOption: null,
    };

    it('should return the initial state', () => {
      expect(searchReducer(undefined, { type: '' })).toStrictEqual(initialState);
    });

    it('should handle searchStart', () => {
      expect(searchReducer(undefined, { type: searchStart.toString(), payload: 'Luke' }))
        .toStrictEqual({
          ...initialState,
          loading: true,
          error: undefined,
        });
    });
  })
});

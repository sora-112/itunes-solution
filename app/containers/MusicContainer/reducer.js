/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: musicContainerTypes, Creators: musicContainerCreators } = createActions({
    requestGetResults: ['query'],
    successGetResults: ['data'],
    failureGetResults: ['error'],
    clearResults: []
});
export const initialState = { query: null, results: [], resultsError: null };



/* eslint-disable default-case, no-param-reassign */
export const musicContainerReducer = (state = initialState, action) =>
    produce(state, draft => {
        console.log(action)
        switch (action.type) {
            case musicContainerTypes.REQUEST_GET_RESULTS:
                draft.query = action.query;
                break;
            case musicContainerTypes.CLEAR_RESULTS:
                return initialState;
            case musicContainerTypes.SUCCESS_GET_RESULTS:
                console.log("inside reducer")
                draft.resultsData = action.data;
                break;
            case musicContainerTypes.FAILURE_GET_RESULTS:
                console.log("hi")
                draft.resultsError = get(action.resultsError, 'message', 'something_went_wrong');
                break;
        }
    });

export default musicContainerReducer;

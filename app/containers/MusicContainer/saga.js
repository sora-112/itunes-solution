import { put, call, takeLatest } from 'redux-saga/effects';
import { getResults } from '@services/repoApi';
import { musicContainerTypes, musicContainerCreators } from './reducer';

const { REQUEST_GET_RESULTS } = musicContainerTypes;
const { successGetResults, failureGetResults } = musicContainerCreators;
export function* getMusicResults(action) {

  const response = yield call(getResults, action.query);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetResults(data));
  } else {
    yield put(failureGetResults(data));
  }
}
// Individual exports for testing
export default function* musicContainerSaga() {
  yield takeLatest(REQUEST_GET_RESULTS, getMusicResults);
}
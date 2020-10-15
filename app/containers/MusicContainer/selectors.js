import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectMusicContainerDomain = state => state.musicContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectMusicContainer = () =>
    createSelector(
        selectMusicContainerDomain,
        substate => substate
    );

export const selectResultsData = () =>
    createSelector(
        selectMusicContainerDomain,
        substate => get(substate, 'resultsData', null)
    );

export const selectResultsError = () =>
    createSelector(
        selectMusicContainerDomain,
        substate => get(substate, 'resultsError', null)
    );

export const selectQuery = () =>
    createSelector(
        selectMusicContainerDomain,
        substate => get(substate, 'query', null)
    );

export default selectMusicContainer;

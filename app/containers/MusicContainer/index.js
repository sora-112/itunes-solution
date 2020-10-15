import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input, Row, Col, Divider } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { selectMusicContainer, selectResultsData, selectResultsError, selectQuery } from './selectors';
import { musicContainerCreators } from './reducer';
import saga from './saga';
import Clickable from '@components/Clickable';
import T from '@components/T';


const { Search } = Input;
const { Meta } = Card;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth}px;
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const ResultContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    width: 100%;
    margin: 20px auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function MusicContainer({
    dispatchResults,
    dispatchClearResults,
    intl,
    resultsData = {},
    resultsError = null,
    query,
    maxwidth,
    padding
}) {
    useInjectSaga({ key: 'musicContainer', saga });

    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const loaded = get(resultsData, 'results', null) || resultsError;


        if (loading && loaded) {
            setLoading(false);
        }
    }, [resultsData])

    useEffect(() => {
        if (query && !resultsData?.results?.length) {
            setLoading(true)
            dispatchResults(query);
        }
    }, []);
    const handleOnChange = rName => {
        if (!isEmpty(rName)) {
            dispatchResults(rName);
            setLoading(true);

        } else {
            dispatchClearResults();
        }
    };
    const debouncedHandleOnChange = debounce(handleOnChange, 200);

    const refreshPage = () => {
        history.push('stories');
        window.location.reload();
    };
    const renderResultList = () => {
        const items = get(resultsData, 'results', []);
        const totalCount = get(resultsData, 'resultCount', 0);
        return (
            (items.length !== 0 || loading) && (
                <Skeleton loading={loading} active>
                    <CustomCard>

                        {totalCount !== 0 && (
                            <div>
                                <T id="matching_results" values={{ totalCount }} />
                            </div>
                        )}

                        <Row>
                            {items.map((result, index) => (
                                <Col key={index} xs={24} xl={6}>
                                    {/* <CustomCard key={index}>
                                    <T id="track_name" values={{ name: result.trackName }} />

                                </CustomCard> */}
                                    <Card
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={<img alt="example" src={result.artworkUrl100.replace('/100x100bb', '/250x250bb')} />}
                                    >
                                        <Meta title={intl.formatMessage({ id: 'track_name' }, { name: result.trackName })} description={intl.formatMessage({ id: 'artist_name' }, { name: result.artistName })} />
                                    </Card>,
                                </Col>
                            ))}
                        </Row>
                    </CustomCard>
                </Skeleton>
            )
        );
    };
    const renderErrorState = () => {
        let resultError;
        if (resultsError) {

            resultError = resultsError;
        } else if (!get(resultsData, 'resultCount', 0)) {
            resultError = 'result_search_default';
        }

        return (
            !loading &&
            resultError && (
                <CustomCard color={resultsError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'result_list' })}>
                    <T id={resultError} />
                </CustomCard>
            )
        );
    };
    return (
        <ResultContainer maxwidth={maxwidth} padding={padding}>

            <T marginBottom={10} id="search_itunes" />
            <Search
                data-testid="search-bar"
                defaultValue={query}
                type="text"
                onChange={evt => debouncedHandleOnChange(evt.target.value)}
                onSearch={searchText => debouncedHandleOnChange(searchText)}
            />
            {renderErrorState()}

            {renderResultList()}
        </ResultContainer>

    )
}
MusicContainer.propTypes = {
    dispatchResults: PropTypes.func,
    dispatchClearResults: PropTypes.func,
    intl: PropTypes.object,
    resultsData: PropTypes.shape({
        results: PropTypes.array,
        resultCount: PropTypes.number
    }),
    query: PropTypes.string,
    history: PropTypes.object,
    maxwidth: PropTypes.number,
    padding: PropTypes.number
};

MusicContainer.defaultProps = {
    maxwidth: 500,
    padding: 20
};


const mapStateToProps = createStructuredSelector({
    musicContainer: selectMusicContainer(),
    resultsData: selectResultsData(),
    resultsError: selectResultsError(),
    query: selectQuery()
});

function mapDispatchToProps(dispatch) {
    const { requestGetResults, clearResults } = musicContainerCreators;
    return {
        dispatchResults: query => dispatch(requestGetResults(query)),
        dispatchClearResults: () => dispatch(clearResults())
    };
}


const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    injectIntl,
    withConnect,
)(MusicContainer);



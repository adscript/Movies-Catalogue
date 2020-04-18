import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loadMoviesList } from '../modules/actions'
import MovieTable from '../components/MoviesTable';
import SearchBox from './SearchBox';

const MoviesList = ({
    totalResults,
    movies,
    loadMoviesList,
    keyword,
    page,
}) => {
    const [isFetching, setIsFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = (cb = () => { }) => {
        if (totalResults <= movies.length) {
            setHasMore(false);
            return;
        }
        return loadMoviesList({ s: keyword, page: page + 1 }, cb)
    }

    return (
        <div className="p-4">
            <SearchBox setIsFetching={setIsFetching} isFetching={isFetching} />
            
            {isFetching ?
                <div className="d-flex align-items-center my-5">
                    <strong>Loading...</strong>
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>
                :
                totalResults ?
                    <MovieTable movies={movies} fetchMoreData={fetchMoreData} hasMore={movies.length < 10 ? false : hasMore} />
                    :
                    <MovieTable movies={[]} />
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.movies
})

const mapDispatchToProps = dispatch => ({
    loadMoviesList: ({ s, page }, cb) => dispatch(loadMoviesList({ s, page }, cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList)

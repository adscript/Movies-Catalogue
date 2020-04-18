import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loadMoviesList } from '../modules/actions'
import useDebounce from '../components/useDebounce'

const SearchBox = ({
    loadMoviesList,
    setIsFetching,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    useEffect(
        () => {
            setIsFetching(true);
            loadMoviesList({ s: debouncedSearchTerm, page: 1 }, () => setIsFetching(false))
        },
        [debouncedSearchTerm, loadMoviesList, setIsFetching]
    );

    return (
        <input
            className="form-control mr-2 "
            type="search"
            placeholder="Enter Movie Title Here ..."
            aria-label="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    loadMoviesList: ({ s, page }, cb) => dispatch(loadMoviesList({ s, page }, cb))
})

export default connect(null, mapDispatchToProps)(SearchBox)

import React from 'react'
import { connect } from 'react-redux'
import MovieTable from '../components/MoviesTable';

const FavoriteList = ({
    favMovies,
}) => {
    return (
        <div className="p-4 mt-4">
            <MovieTable movies={favMovies} column={['Title', 'Year', 'Language', 'favorite']}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.movies
})

export default connect(mapStateToProps, null)(FavoriteList)

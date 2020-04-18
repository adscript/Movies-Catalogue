import React, { useState } from 'react'
import { connect } from 'react-redux'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { addFavMovie, removeMovie, loadMovieDetail, toggleModal } from '../modules/actions'

function MoviesItem({
    data,
    column,
    addFavMovie,
    removeMovie,
    toggleModal,
    loadMovieDetail
}) {
    const [favStatus, setFavStatus] = useState(data.favorite)
    const handleFavorite = (id) => {
        if (!favStatus) {
            addFavMovie(id)
            setFavStatus(true)
        } else {
            removeMovie(id)
            setFavStatus(false)
        }
    }

    const handleDetails = (id) => {
        loadMovieDetail(id)
    }

    return (
        <tr>
            <th
                scope="row"
                style={{ cursor: 'pointer' }}
                onClick={() => handleDetails(data.imdbID)}
            >
                { data[column[0]] }
            </th>
            <td>{data[column[1]]}</td>
            <td>{data[column[2]]}</td>
            <td onClick={() => handleFavorite(data.imdbID)} style={{ cursor: 'pointer' }}>
                {favStatus ? <AiFillStar /> : <AiOutlineStar />}
            </td>
        </tr >
    )
}

const mapStateToProps = (state) => ({
    ...state.movies
})

const mapDispatchToProps = dispatch => ({
    addFavMovie: (id) => dispatch(addFavMovie(id)),
    removeMovie: (id) => dispatch(removeMovie(id)),
    loadMovieDetail: (id, cb) => dispatch(loadMovieDetail(id,cb)),
    toggleModal: () => dispatch(toggleModal()), 
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesItem)

import React from 'react'
import { connect } from 'react-redux'
import { toggleModal } from '../modules/actions'

const MoviesDetail = ({
    movie,
    toggleModal
}) => {

    const handleClick = () => {
        toggleModal()
    }

    return (
        <div className="d-flex justify-content-center">
        <div className="card my-3 p-3" style={{overflowY:'auto', maxHeight:'80vh', width: '100%'}}>
            <div className="row">
                <div className="col-md-4 mt-4 d-flex justify-content-center">
                    <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://www.lexingtonvenue.com/media/poster-placeholder.jpg'} className="card-img rounded mx-auto d-block" alt="" style={{maxWidth: '25vw', height: 'auto', objectFit: 'cover'}}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title">{movie.Title} ({movie.Year})</h5>
                            <button type="button" className="ml-2 mb-1 close" onClick={handleClick}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <p className="card-text">Released : {movie.Released}</p>
                        <p className="card-text">Genre : {movie.Genre}</p>
                        <p className="card-text">Director : {movie.Director}</p>
                        <p className="card-text">Writer : {movie.Writer}</p>
                        <p className="card-text">Actors : {movie.Actors}</p>
                        <p className="card-text">Plot : {movie.Plot}</p>
                        <p className="card-text">Awards : {movie.Awards}</p>
                        <p className="card-text">Country : {movie.Country}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.movies
})

const mapDispatchToProps = dispatch => ({
    toggleModal: () => dispatch(toggleModal()), 
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesDetail)

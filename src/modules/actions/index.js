import {
    LOAD_MOVIES_SUCCESS,
    LOAD_MOVIE_SUCCESS,
    LOAD_MOVIE_FAILURE,
    ADD_MOVIE,
    REMOVE_MOVIE,
    TOGGLE_MODAL
} from '../constants'

import axios from 'axios'
const apikey = '56432f77'
const API_URL = `http://www.omdbapi.com/?apikey=${apikey}`


// start load movie by ID
const loadMovieSuccess = (movie) => {
    return { type: LOAD_MOVIE_SUCCESS, movie }
}

const loadMovieFailure = () => { return { type: LOAD_MOVIE_FAILURE } }

export const loadMovieDetail = (i, cb = () => { }) => {
    return dispatch => {
        return axios
            .get(`${API_URL}&i=${i}`)
            .then(function (response) {
                cb()
                dispatch(loadMovieSuccess(response.data));
                dispatch(toggleModal());
            })
            .catch(function (error) {
                console.log(error);
                cb()
                dispatch(loadMovieFailure())
            })
    }
}
// end load movie

// start load movie by search
const loadMoviesSuccess = (results, params) => {
    let { totalResults, Search } = results;
    return { type: LOAD_MOVIES_SUCCESS, totalResults, Search, keyword: params.s, page: params.page }
}

const loadMoviesFailure = () => { return { type: LOAD_MOVIE_FAILURE } }

export const loadMoviesList = (params, cb = () => { }) => {
    return dispatch => {
        let { s, page } = params
        return axios
            .get(`${API_URL}&s=${s}&page=${page}`)
            .then(function (response) {
                cb()
                if (response.status === 200) {
                    const favMovies = JSON.parse(localStorage.getItem('movies')) || []
                    if (response.data.Search)
                        response.data.Search.map(item => item.favorite = favMovies.map(favItem => favItem.imdbID).includes(item.imdbID))
                    dispatch(loadMoviesSuccess(response.data, params));
                }
                else
                    dispatch(loadMoviesFailure())
            })
            .catch(function (error) {
                console.log(error);
                cb()
                dispatch(loadMoviesFailure())
            })
    }
}
//end load

// add movie to favorite
const addMovie = (results) => {
    return { type: ADD_MOVIE, movie: results }
}

export const addFavMovie = id => {
    return dispatch => {
        return axios
            .get(`${API_URL}&i=${id}`)
            .then(function (response) {
                response.data.favorite = true
                dispatch(addMovie(response.data));
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
//end add movie

// remove movie from favorite
export const removeMovie = (id) => {
    return { type: REMOVE_MOVIE, movie: { imdbID: id } }
}
//end remove movie

//showModal
export const toggleModal = () => {
    return { type: TOGGLE_MODAL }
}
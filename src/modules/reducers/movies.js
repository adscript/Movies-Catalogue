import { 
    LOAD_MOVIE_FAILURE, 
    LOAD_MOVIE_SUCCESS, 
    LOAD_MOVIES_SUCCESS,
    ADD_MOVIE, 
    REMOVE_MOVIE,
    TOGGLE_MODAL,
} from "../constants";

const initState = {
    keyword : '',
    page: 1,
    movies: [],
    movie: {},
    favMovies: JSON.parse(localStorage.getItem('movies')) || [],
    totalResults: 0,
    showModal: false,
}

const movies = (state = initState, action) => {
    let { type, Search, totalResults, movie, keyword, page } = action;
    switch (type) {
        case LOAD_MOVIES_SUCCESS:
            return {
                ...state,
                totalResults,
                movies: (page > 1) ? [...state.movies, ...Search] : Search,
                page,
                keyword,
            }

        case LOAD_MOVIE_SUCCESS : 
            return {
                ...state,
                movie,
            }
        
        case ADD_MOVIE:
            localStorage.setItem('movies', JSON.stringify([...state.favMovies, movie]))
            return {
                ...state,
                favMovies: [movie, ...state.favMovies]
            }
        
        case REMOVE_MOVIE:
            localStorage.setItem('movies', JSON.stringify([...state.favMovies.filter(item => (item.imdbID !== movie.imdbID))]))
            return {
                ...state,
                favMovies: [...state.favMovies.filter(item => (item.imdbID !== movie.imdbID))],
            }
        
        case TOGGLE_MODAL:
            return {
                ...state,
                showModal: !state.showModal
            }

        case LOAD_MOVIE_FAILURE:
            return {
                ...state,
                movie: {}
            }
        default:
            return state
    }
}

export default movies;
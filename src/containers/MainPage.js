import React, { useState } from 'react'
import {connect} from 'react-redux'
import NavTabs from '../components/NavTabs'
import MoviesList from './MoviesList'
import FavoriteList from './FavoriteList'
import MoviesDetail from './MoviesDetail'

function MainPage({
    showModal
}) {
    const [activeTabs, setActiveTabs] = useState('Search movies')
    return (
        <div className="row mt-3">
            <div className="col-xs-1 col-sm-1 col-md-2 col-lg-3" />
            <div className="card col-xs-10 col-sm-10 col-md-8 col-lg-6">
                <NavTabs activeTabs={activeTabs} setActiveTabs={setActiveTabs} />
                {showModal ? <MoviesDetail /> : (activeTabs === 'Search movies') ? <MoviesList /> : <FavoriteList />}
            </div> 
            <div className=" col-xs-1 col-sm-1 col-md-2 col-lg-3" />
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.movies
})

export default connect(mapStateToProps, null)(MainPage)
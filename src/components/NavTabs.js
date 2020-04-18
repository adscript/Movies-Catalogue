import React from 'react'

export default function NavTabs({
    activeTabs,
    setActiveTabs,
}) {
    const handleClick = (e) => {
        e.preventDefault()
        setActiveTabs(e.target.innerHTML)
    }

    return (
        <ul className="nav nav-tabs mt-3">
            <li className="nav-item" onClick={handleClick}>
                <a className={`nav-link ${activeTabs === 'Search movies' ? 'active' : ''}`} href="/">Search movies</a>
            </li>
            <li className="nav-item" onClick={handleClick}>
                <a className={`nav-link ${activeTabs === 'My Favorites' ? 'active' : ''}`} href="/" >My Favorites</a>
            </li>
        </ul>
    )
}

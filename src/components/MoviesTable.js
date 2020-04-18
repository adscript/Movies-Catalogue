import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import MoviesItem from '../components/MoviesItem'

export default function MoviesTable({
    movies,
    fetchMoreData = () => { },
    hasMore = false,
    column = ['Title', 'Year', 'imdbID', 'favorite'],
}) {
    return (
        <div id="scrollableDiv" style={{ marginTop: 10, width: '100%', height: '50vh', overflowY: "auto" }}>
            <InfiniteScroll
                dataLength={movies.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
                scrollableTarget='scrollableDiv'
                style={{ overflow: 'unset' }}
            >
                <table className="table">
                    <thead style={{backgroundColor: 'black', color: 'white'}}>
                        <tr>
                            <th scope="col">{column[0]}</th>
                            <th scope="col">{column[1]}</th>
                            <th scope="col">{column[2]}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody style={{backgroundColor: 'white'}}>
                        {movies.map(item => {
                            return (
                                <MoviesItem key={item.imdbID} data={item} column={column} />
                            )
                        })}
                        {!movies.length && <tr>
                            <th scope="row">No data to show</th>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                        }
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
    )
}

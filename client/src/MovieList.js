import React, { Component } from 'react';

const TMDB_SMALL_POSTER_PATH = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

// A component for displaying a list of movies
class MovieList extends Component {
	constructor(props) {
		super(props);
		this.selectEntry = this.selectEntry.bind(this);
	}

	// Pass a selected movie back to the parent to be processed
	selectEntry(id) {
		this.props.selectMovie(id);
	}

	render() {
		return (
			<div>
				<div className="page-heading">{this.props.title}</div>
				{this.props.list.map((info, index) => {
					return (
						<div key={index}>
							<div className="movie-list-entry">
								<div><img
										src={info.poster_path ? TMDB_SMALL_POSTER_PATH + info.poster_path : '/logo192.png'}
										className="movie-list-entry-poster" alt={info.title || '\u00A0'}
										onClick={this.selectEntry.bind(this, info.id)} /></div>
								<div className="movie-list-entry-description">
									<div className="movie-list-entry-title" value={info.title || '\u00A0'}
											onClick={this.selectEntry.bind(this, info.id)}>{info.title || '\u00A0'}</div>
									<div className="movie-list-entry-overview">{info.overview || '\u00A0'}</div>
								</div>
							</div>
						</div>
					);
				})}
	        </div>
		);
		
	}
}

export default MovieList;
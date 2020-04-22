import React, { Component } from 'react';

const TMDB_BIG_POSTER_PATH = 'https://image.tmdb.org/t/p/w440_and_h660_face';

// A component for displaying details about a single movie
class MovieDetail extends Component {

	// Make the release date a bit nicer than its default format
	getPrettyDate(dateStr) {
		const dateObj = new Date(dateStr);

		return dateObj.toDateString();
	}

	// Alternate the background colors of the cast list entries, to make them more readable
	getCastBackgroundColor(index) {
		return index % 2 === 0 ? '#dddddd' : '#fffffff';
	}

	renderCast(cast) {
		return (
			<div className="movie-detail-cast">
				<div className="movie-detail-cast-heading">Cast</div>
				<p>(<b>Actor</b>/Role)</p>
				{cast.map((value, index) => {
					return (
						<div key={index} className="movie-detail-cast-entry" style={{backgroundColor: this.getCastBackgroundColor(index)}}>
							<div className="movie-detail-cast-name">{value.name || '\u00A0'}</div>
							<div className="movie-detail-cast-character">{value.character || '\u00A0'}</div>
						</div>
					);
				})}
			</div>
		);
	}

	render() {
		return (
			<div>
				<div className="movie-detail-title">{this.props.info.title || '\u00A0'}</div>
				<div className="movie-detail-release">
					{this.props.info.release_date ? ('Release Date: ' + this.getPrettyDate(this.props.info.release_date)) : '\u00A0'}
				</div>
				<div className="movie-detail-description">
					<div className="movie-detail-poster"><img
							src={this.props.info.poster_path ? TMDB_BIG_POSTER_PATH + this.props.info.poster_path : '/logo192.png'}
							className="movie-detail-poster" alt={this.props.info.title || '\u00A0'}/></div>
					<div className="movie-detail-overview">{this.props.info.overview || '\u00A0'}</div>
				</div>
				<div>
					{this.props.info.cast ? this.renderCast(this.props.info.cast) : '\u00A0'}
				</div>
			</div>
		);
	}
}

export default MovieDetail;
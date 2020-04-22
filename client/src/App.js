import React, { Component } from 'react';
import './App.css';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';

const MOVIES_BACKEND = 'http://localhost:9000/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: {},
      searchString: '',
      submittedSearchString: '',
      searchResults: {},
      selectedMovie: {}
    };
    this.handleSearchUpdate = this.handleSearchUpdate.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleGoHome = this.handleGoHome.bind(this);
    this.selectMovie = this.selectMovie.bind(this);
  }

  // Render the main body of the page, consisting of either a list of movies or the details for a single movie
  renderPageContent() {
    const popularResultsList = this.state.popularMovies.results || [];
    const searchResultsList = this.state.searchResults.results || null;

    if (this.state.selectedMovie.title != null) {
      return <MovieDetail info={this.state.selectedMovie} />;
    } else if (searchResultsList != null) {
      if (searchResultsList.length > 0) {
        return <MovieList title={'Search Results for "' + this.state.submittedSearchString + '"'} list={searchResultsList} selectMovie={this.selectMovie} />;
      } else {
        return <div className="page-heading">No results found for "{this.state.submittedSearchString}"</div>;
      }      
    } else {
      return <MovieList title="Popular Movies" list={popularResultsList} selectMovie={this.selectMovie} />;
    }
  }

  // Retrieve a list of popular movies
  getPopularMovies() {
    fetch(MOVIES_BACKEND + 'movies/')
      .then(res => res.json())
      .then(res => this.setState({ popularMovies: res}))
      .catch(err => err);
  }

  // Update the contents of the search bar
  handleSearchUpdate(event) {
    this.setState({searchString: event.target.value});
  }

  // Handle search submission
  handleSearchSubmit(event) {
    if (this.state.searchString) {
      const currSearchString = this.state.searchString
      fetch(MOVIES_BACKEND + 'movies/search?query=' + currSearchString)
      .then(res => res.json())
      .then(res => this.setState({ searchResults: res, selectedMovie: {}, searchString: '', submittedSearchString: currSearchString}))
      .catch(err => err);
    }
    event.preventDefault();
  }

  // Allow the user to go back to the home page, and see the popular movies again
  handleGoHome(event) {
    this.setState({searchString: '', submittedSearchString: '', searchResults: {}, selectedMovie: {}});
  }

  // Select a movie by ID
  selectMovie(movieId) {
    fetch(MOVIES_BACKEND + 'movies/detail?id=' + movieId)
      .then(res => res.json())
      .then(res => this.setState({ selectedMovie: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.getPopularMovies();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Movies! Movies! Movies!</p>
        </header>
        <div className="menu">
          <span className="menu-item" onClick={this.handleGoHome}>Home</span>
          <span className="menu-item">
            <form onSubmit={this.handleSearchSubmit}>
              <input type="text" value={this.state.searchString} className="menu-search" onChange={this.handleSearchUpdate} />
              <input type="submit" value="Search" />
            </form>
          </span>
        </div>
        {this.renderPageContent()}
        <div className="bottom-credit">All movie information appears courtesy of <a href="https://developers.themoviedb.org/3/">The Movie Database API</a>.</div>
      </div>
    );
  };
}

export default App;

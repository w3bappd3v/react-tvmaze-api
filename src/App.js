import { Component } from 'react';
import './App.css';

import { Show } from './components/Show.js';
import { ShowDetails } from './components/ShowDetails.js';

class App extends Component {

  constructor() {
    super()
    this.state = { 
      shows: [],
      searchStr: '',
      showDetails: false,
      show: {}
    }
  }

  updateSearchStr(e) {
    this.setState({ searchStr: e.target.value });
  }

  search () {
    this.setState({ showDetails: false });
    fetch("http://api.tvmaze.com/search/shows?q=" + this.state.searchStr).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ shows: data });
    });
  }

  goToShow (showId) {
    this.setState({ showDetails: true });
    fetch("http://api.tvmaze.com/shows/" + showId).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ show: data });
    });
  }

  render () {
    return (
      <div className="app">
        <div class="header">Show Finder</div>
        <div class="content">
          <div class="search-control-row">
            <input type="text" onChange={ this.updateSearchStr.bind(this) } />
            <button onClick={ this.search.bind(this) }>Search</button>
          </div>
          {
            this.state.showDetails
            ? (
              <p>
                <ShowDetails 
                    name={ this.state.show.name } />
              </p>
            )
            : (
              <div className="shows">
              {this.state.shows.map(show => {
                if(show.show.image) {
                  return <Show goToShow={ this.goToShow.bind(this) } 
                            key={`show-${show.show.id}`}
                            name={show.show.name}
                            id={show.show.id}
                            image={show.show.image.medium} 
                            summary={show.show.summary} />
                } else {
                  return <Show goToShow={ this.goToShow.bind(this) } 
                  key={`show-${show.show.id}`}
                  name={show.show.name}
                  id={show.show.id} 
                  summary={show.show.summary} />
                }
              })}
            </div>
            )
          }
        </div>
      </div>
    );
  }

}

export default App;

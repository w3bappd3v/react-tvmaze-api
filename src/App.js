import { Component } from 'react';
import './App.scss';

import Show from './components/show/Show.js';
import { ShowDetails } from './components/showDetail/ShowDetail.js';

class App extends Component {

  constructor() {
    super()
    this.state = { 
      shows: [],
      searchStr: '',
      showDetails: false,
      show: {},
      timeoutId: 0,
      loading: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.searchStr !== prevState.searchStr) {
      clearTimeout(this.state.timeoutId);
      const timeoutId = setTimeout(() => {
          this.search();
      }, 500);
      this.setState({timeoutId: timeoutId});
    }
  }

  updateSearchStr(e) {
    this.setState({ searchStr: e.target.value });
  }

  search () {
    this.setState({ shows: []});
    this.setState({ loading: true});
    this.setState({ showDetails: false });
    fetch("http://api.tvmaze.com/search/shows?q=" + this.state.searchStr).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ shows: data });
      this.setState({ loading: false});
    });
  }

  goToShow (showId) {
    this.setState({ show: {} })
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
        <div className="header">Show Finder</div>
        <div className="content">
          <div className="search-control-row">
            <label className="search-label" htmlFor="search">Find Shows: </label><input id="search" type="text" onChange={ this.updateSearchStr.bind(this) } />
            { this.state.loading ? ('loading') : ''}
          </div>
          {
            this.state.showDetails
            ? (
              <div key="details">
                <ShowDetails name={ this.state.show.name } />
              </div>
            )
            : (
              <div className="shows" key="shows">
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

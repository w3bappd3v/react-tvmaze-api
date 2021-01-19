import { Component } from 'react';
import './App.css';

import Show from './components/Show.js';
import Button from './components/Button.js';
import { ShowDetails } from './components/ShowDetails.js';

class App extends Component {

  constructor() {
    super()
    this.state = { 
      shows: [],
      searchStr: '',
      showDetails: false,
      show: {},
      timeoutId: 0,
      btnText: 'Search'
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
    this.setState({ btnText: 'Loading...'});
    this.setState({ showDetails: false });
    fetch("http://api.tvmaze.com/search/shows?q=" + this.state.searchStr).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ shows: data });
      this.setState({ btnText: 'Search'});
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
        <div className="header">Show Finder</div>
        <div className="content">
          <div className="search-control-row">
            <input type="text" onChange={ this.updateSearchStr.bind(this) } />
            <Button onClick={ this.search.bind(this) } btnType={'primary'} btnText={this.state.btnText}></Button>
          </div>
          {
            this.state.showDetails
            ? (
              <ShowDetails name={ this.state.show.name } />
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

import React, { Component } from 'react';

import './App.css';
import SearchTracks from "../Search/SearchTracks";
import SearchResultsContainer from "../../containers/SearchResults/SearchResultsContainer";
import Playlist from "../../containers/Playlist/Playlist";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playlistName: '',
      playlistTracks: []

    };
  }

// allows a learner to change the name of their playlist
  updatePlaylistName = (name) =>{
    this.setState({
      playlistName: name
    })
  };


  render() {
    return (
      <div>
       <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchTracks/>
          <div className="App-playlist">
            <SearchResultsContainer/>
            <Playlist/>
          </div>
        </div>

      </div>
    );
  }
}

export default App;

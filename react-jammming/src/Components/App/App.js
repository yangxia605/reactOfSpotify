import React, { Component } from 'react';

import './App.css';
import SearchTracks from "../Search/SearchTracks";
import SearchResultsContainer from "../../containers/SearchResults/SearchResultsContainer";
import Playlists from "../../containers/Playlist/Playlist";
import  Spotify  from "../../util/Spotify";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playlistName: '',
      playlistTracks: []

    };
  }

  //adds a song to the playlist
  addTrack = (track) =>{
    let songExists = false;
    this.state.playlistTracks.map((item) => {
      if(track.id === item.id){
        songExists = true;
      }
    });
    if(!songExists){
      let newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({
        playlistTracks: newPlaylist
      })
    }
  };

  // removes a song from a user's custom playlist
  removeTrack = (track) =>{
    const trackIndex = this.state.playlistTracks.filter((item) => {
      return item.id !== track.id;
    });
    this.setState({
      playlistTracks: trackIndex
    })
  };

// allows a learner to change the name of their playlist
  updatePlaylistName = (name) =>{
    this.setState({
      playlistName: name
    })
  };

  userSavePlaylist = () => {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    const playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName,trackUris).then(response => {
      if(response){
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        })
      }
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
            <Playlists
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.userSavePlaylist}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default App;

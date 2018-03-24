import React, { Component } from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import  Spotify  from "../../util/Spotify";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults :[],
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
      this.setState({
        playlistTracks: [...this.state.playlistTracks,{...track,isRemoval:true}]
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
      if(response.snapshot_id && response.snapshot_id !== ''){
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        })
      }
    })
  };

  search = (term) =>{
    Spotify.search(term).then(tracks => {
      if(tracks){
        this.setState({
          searchResults: [...this.state.searchResults,...tracks]
        })
      }

    })
  };



  render() {
    return (
      <div>
       <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
          onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist
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

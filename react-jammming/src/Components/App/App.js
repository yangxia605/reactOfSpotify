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
      playlistTracks: [],
      loading: false

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
    this.setState({
      loading:true,
    });
    Spotify.savePlaylist(playlistName,trackUris).then(response => {
      if(response){
        this.setState({
          loading:false,
          playlistName: 'New Playlist',
          playlistTracks: []
        })
      }
    })
  };

  search = (term) =>{
    Spotify.search(term).then(tracks => {
      console.log(tracks)
      if(tracks){
        this.setState({
          searchResults: tracks,
        })
      }

    })
  };

  render() {
    return (
      <div>
       <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <div>
            {
              this.state.loading ? <div className="loading"> loading ........</div> : <div className=""></div>
            }
          </div>
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

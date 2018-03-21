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
      searchResults : [ {
        id: '1',
        name: 'search result 1',
        artist: '搜索结果1',
        album: '123',
        isRemoval: false
      },
        {
          id:'2',
          name: 'search result 2',
          artist: '搜索结果2',
          album: '234',
          isRemoval: false
        }],
      playlistName: '',
      playlistTracks: [
        {
          id: '1',
          name: '绵绵test1',
          artist: 'Perfect',
          album: 'test',
          isRemoval: true
        },
        {
          id: '2',
          name: '绵绵test3',
          artist: 'blahblah',
          album: 'dfghfd',
          isRemoval: true
        }
      ]

    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }

  //adds a song to the playlist
  addTrack(track) {
    this.state.playlistTracks.map((item) => {
      if(track.id === item.id){
        return false;
      }
    });

    this.setState({
      playlistTracks: this.state.playlistTracks.push(track)
    })
  }

  // removes a song from a user's custom playlist
  removeTrack(track){
    const trackIndex = this.state.playlistTracks.filter(function (item) {
      return item.id !== track.id;
    });

    this.setState({
      playlistTracks: trackIndex
    })
  }

// allows a learner to change the name of their playlist
  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    return trackUris;
  }

  search(term){
    Spotify.search(term).then(tracks => {
      this.setState({
        playlistTracks: tracks
      })
    })
  }



  render() {
    console.log(this)
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
              onSave={this.savePlaylist}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default App;

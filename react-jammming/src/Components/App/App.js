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
      searchResults :[{
        id: '1',
        name: 'search result 1',
        artist: '搜索结果1',
        album: '123',
        isRemoval: false
      },
        {
          id:'3',
          name: 'search result 3',
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

  savePlaylist = () =>{
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(trackUris,this.state.playlistName)
  };

  search = (term) =>{
    Spotify.search(term).then(tracks => {

      console.log(tracks);
      this.setState({
        searchResults: [...this.state.searchResults,...tracks]
      })
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
              onSave={this.savePlaylist}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default App;

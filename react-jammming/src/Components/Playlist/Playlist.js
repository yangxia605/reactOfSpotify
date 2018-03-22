/** * Created by mianmian on 2018/3/15. */import React, {Component} from 'react';import './Playlist.css';import TrackList from '../TrackList/TrackList'class Playlist extends Component {  constructor(props){    super(props);    this.state={      value: 'New Playlist',      // isRemove: true    };  }  handleNameChange = (e) =>{    const inputValue = e.target.value;    const { onNameChange } = this.props;    onNameChange(inputValue);    this.setState({      value: inputValue    })  };  render(){    const { playlistTracks,onRemove} = this.props;    return(      <div className="Playlist">        <input value={this.state.value} onChange={this.handleNameChange}/>        <TrackList tracks={playlistTracks} onRemove={onRemove} />        <a className="Playlist-save">SAVE TO SPOTIFY</a>      </div>    )  }}export default Playlist;
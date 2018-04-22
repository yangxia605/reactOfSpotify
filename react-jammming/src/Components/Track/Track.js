/** * Created by mianmian on 2018/3/15. */import React, {Component} from 'react';import './Track.css';class Track extends Component {  constructor(props){    super(props);  }  addTrack = () => {    const addTrackInfo = this.props.track;    const { onAdd } = this.props;    onAdd(addTrackInfo);  };  removeTrack = () => {    const removeTrackInfo = this.props.track;    const { onRemove } = this.props;    onRemove(removeTrackInfo);  };  render(){    const {track, isRemoval} = this.props;    return(      <div className="Track">        <div className="Track-information">          <h3>{track.name}</h3>          <p>{track.artist} | {track.album}            <a className="Track-action"               onClick={isRemoval ? this.removeTrack : this.addTrack}            >              {isRemoval ? '-' : '+'}            </a>          </p>        </div>      </div>    )  }}export default Track;
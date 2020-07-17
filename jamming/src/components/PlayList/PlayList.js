import React from 'react';
import {Tracklist} from '../TrackList/TrackList';
import './PlayList.css';



export class PlayList extends React.Component{
  constructor(props){
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this)
  }

  handleChangeName(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
    return(
    <div className="Playlist">
      <input defaultValue={"New Playlist"} onChange={this.handleChangeName} />
      <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
      <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
    </div>
    )
  }
}
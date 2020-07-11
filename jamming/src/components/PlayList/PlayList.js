import React from 'react';
import {Tracklist} from '../TrackList/Tracklist';
import './PlayList.css';



export class PlayList extends React.Component{
  render(){
    return(
    <div className="Playlist">
      <input defaultValue={"New Playlist"} />
      <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
    )
  }
}
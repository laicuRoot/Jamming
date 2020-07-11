import React from 'react';
import {Tracklist} from '../TrackList/TrackList';
import './PlayList.css';



export class PlayList extends React.Component{
  render(){
    return(
    <div className="Playlist">
      <input defaultValue={"New Playlist"} />
      <Tracklist tracks={this.props.playlistTracks} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
    )
  }
}
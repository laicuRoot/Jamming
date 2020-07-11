import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {PlayList} from '../PlayList/PlayList';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: 
      [
        {
        name:'name1',
        artist: 'artist1',
        album: 'album1',
        id:1
        },
        {
          name: 'name2',
          artist: 'artist2',
          album: 'album2',
          id: 2
        },
        {
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
          id: 3
        }
      ],
      playListName: 'playList 1',
      playlistTracks: [
        {
          name: 'name1',
          artist: 'artist1',
          album: 'album1',
          id: 1
        },
        {
          name: 'name2',
          artist: 'artist2',
          album: 'album2',
          id: 2
        },
        {
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
          id: 3
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track){
    // if (this.state.playlistTracks.id != track.id){
    //   this.state.playlistTracks.push(track)
    // }
    // this.setState({
    //   playlistTracks: playlistTracks
    // })

    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    tracks.push(track);
    this.setState({
      playlistTracks: tracks
    })
  }

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList playlistName={this.state.playListName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;

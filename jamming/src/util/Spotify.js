let accessToken;
let userid;
const clientID = '0853a1432982471cb6b88ab9bdef9158';
const redirectURI = 'http://localhost:3000/'

export const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken
    }
    //check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch){
      accessToken = accessTokenMatch[1];
      const expiresIn = expiresInMatch[1];
      //This clears the parameters, llowing us to grab new access token when it expires
      window.setTimeout(() => accessToken='', expiresIn*1000);
      window.history.pushState('Access token', null, '/');
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
  async search(term){
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
    {
      headers: 
      {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks){
      return [];
    }
    return jsonResponse.tracks.items.map((track)=>{
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }
    })
  },
  async savePlaylist(name,trackUris){
    if(!name || !trackUris.length){
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = 
    {
      Authorization: `Bearer ${accessToken}`
    };

    let userId = Spotify.getUserId();

    // const response = await fetch('https://api.spotify.com/v1/me', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // }
    // );
    // const jsonResponse = await response.json();
    // userId = jsonResponse.id;

    const response_1 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: name })
      });
    const jsonResponse_1 = await response_1.json();
    const playlistId = jsonResponse_1.id;
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackUris })
      });
  },
  async getUserId(){
    const accessToken = Spotify.getAccessToken();
    if(userid){
      return fetch(`https://api.spotify.com/v1/users/${userid}`,
      {
        headers:{Authorization: `Bearer ${accessToken}`},
      })
    } else {
      const response = await fetch('https://api.spotify.com/v1/me',{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      const jsonRes = await response.json()
      userid = jsonRes.id
      return userid
    }
  }
    
}

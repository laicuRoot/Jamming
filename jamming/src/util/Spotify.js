let accessToken;
let userid;
const clientID = '0853a1432982471cb6b88ab9bdef9158';
const redirectURI = 'http://localhost:3000/'

export const Spotify = {
  getAccessToken(){
    if(accessToken){
      console.log(accessToken)
      return accessToken
    }
    //check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch){
      accessToken = accessTokenMatch[1];
      const expiresIn = expiresInMatch[1];
      //This clears the parameters, allowing us to grab new access token when it expires
      window.setTimeout(() => accessToken='', expiresIn*1000);
      window.history.pushState('Access token', null, '/');
      console.log(accessToken)
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
  async search(term){
    const accessToken = Spotify.getAccessToken();
    console.log(accessToken)
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
  async getUserId() {
    const accessToken = Spotify.getAccessToken();
    if (userid) {
      return fetch(`https://api.spotify.com/v1/users/${userid}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          mode:'no-cors'

        })
    } else {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {Authorization: `Bearer ${accessToken}`},
        mode:'no-cors'
      })
      const jsonRes = await response.json()
      userid = jsonRes.id
      console.log("This is the user ID in getUserId function line 68" + userid)
      return userid
    }
  },
  async savePlaylist(name,trackUris){
    // console.log(`This is the USER ID in savePlayList method ${Spotify.getUserId()}`)
    if(!name || !trackUris.length){
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = 
    {
      Authorization: `Bearer ${accessToken}`
    };

    // let userID;

    // const response = await fetch('https://api.spotify.com/v1/me', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // }
    // );
    // const jsonResponse = await response.json();
    // userID = jsonResponse.id;


    const response_1 = await fetch(`https://api.spotify.com/v1/users/${userid}/playlists`,
      {
        method: 'POST',
        headers:{Authorization:`Bearer ${accessToken}`},
        body: JSON.stringify({ name: name }),
      });

    const jsonResponse_1 = await response_1.json();
    const playlistId = jsonResponse_1.id;
    return fetch(`https://api.spotify.com/v1/users/${userid}/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackUris }),
      });
  }
}

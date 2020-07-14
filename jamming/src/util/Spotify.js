let accessToken;
const clientID = '0853a1432982471cb6b88ab9bdef9158';
const redirectURI = ''

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
        artist: track.artist[0].name,
        album: track.album[0].name,
        uri: track.uri
      }
    })
  }
};

let accessToken;
const clientID = '0853a1432982471cb6b88ab9bdef9158';
const redirectURI = ''

const Spotify = {
  getAccessToke(){
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

  }
  
};

export default Spotify;
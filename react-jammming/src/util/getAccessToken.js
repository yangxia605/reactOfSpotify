/** * Created by mianmian on 2018/3/24. *///Get a Spotify user's access tokengetAccessToken = () =>{  if(accessToken){    return accessToken;  }else{    //check if it has just been obtained.    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);    //if login,return the accessToken    if(accessTokenMatch ){//token has just been obtained.      //Set the access token value      accessToken = accessTokenMatch[0].split('=')[1];      localStorage.setItem('accessToken1', accessToken);      // expire time      window.setTimeout(() => accessToken = '', expiresInMatch * 1000);      window.history.pushState({accessToken: ''}, null, '/');    }else{      //make request      window.location.href= `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;    }  }}export default getAccessToken
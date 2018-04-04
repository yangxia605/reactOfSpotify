/** * Created by mianmian on 2018/3/15. */const CLIENT_ID = 'b1c5f647ad044b9c9aadf340da3b7e0d';const REDIRECT_URI= 'http%3a%2f%2fyangxia.surge.sh';//http://yangxia.surge.shlet accessTokenconst Spotify = {  //Get a Spotify user's access token  getAccessToken:() =>{    accessToken = localStorage.getItem("accessToken");    if(accessToken){      return accessToken;    }else{      //check if it has just been obtained.      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);      //if login,return the accessToken      if(accessTokenMatch ){//token has just been obtained.        //Set the access token value        accessToken = accessTokenMatch[0].split('=')[1];        localStorage.setItem('accessToken', accessToken);        // expire time        window.setTimeout(() => accessToken = '', expiresInMatch * 1000);        window.history.pushState('accessToken', null, '/');        return accessToken;      }else{        //make request        window.location.href= `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;      }    }  },  //Send a search request to the Spotify API  search: (term) =>{    Spotify.getAccessToken();    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{     headers: {       Authorization: `Bearer ${accessToken}`     }   }).then(response => {      return response.json();   }).then(jsonResponse => {     if(jsonResponse.tracks){       return jsonResponse.tracks.items.map((track) => ({       id: track.id,       name:track.name,       artist:track.artists[0].name,       album:track.album.name,       uri:track.uri     }));     }   })  },  //Make a request that returns the user's Spotify username.  // getUserId:async () => {  //   let accessToken2 = Spotify.getAccessToken();  //   console.log("accessToken",accessToken2);  //   try{  //     let response = await fetch(`https://api.spotify.com/v1/me`,{  //       headers: {  //         Authorization: `Bearer ${accessToken2}`  //       }  //     });  //     if(response.ok){  //       let jsonResponse = response.json();  //       let userId = jsonResponse.id;  //       return userId;  //     }  //     throw new Error('Request failed!')  //   }catch (error){  //     console.log(error);  //   }  // },  //Make a request that returns the user's Spotify username.  // getPlaylistId:async (playlistName) => {  //   let accessToken3= Spotify.getAccessToken();  //   try{  //     let response = await fetch(`https://api.spotify.com/v1/users/d6ak6g8774lpl8jikxwyurkc8/playlists`,{  //       method: 'POST',  //       body: JSON.stringify({data:playlistName}),  //       headers: {  //         Authorization: `Bearer ${accessToken3}`  //       }  //     });  //     if(response.ok){  //       let jsonResponse = response.json();  //       let playlistId = jsonResponse.id;  //       console.log("playlistId",playlistId);  //       return playlistId;  //     }  //     throw new Error('Request failed!')  //   }catch (error){  //     console.log(error);  //   }  // },  // getIds: async (playlistName) =>{  //   let userId = await Spotify.getUserId();  //   let playlistId = await Spotify.getPlaylistId(playlistName,userId);  //   return playlistId;  // },  //Save a user's playlist to their Spotify account.  savePlaylist: (playlistName, trackUris) =>{    if(playlistName === ''){      playlistName="playlist";    }    const data = {      playlistName: playlistName,      trackUris: trackUris    };    Spotify.getAccessToken();    return fetch(`https://api.spotify.com/v1/me`,{            method: 'GET',            headers: {              Authorization: `Bearer ${accessToken}`            }    }).then(response => {      return response.json()    }).then(jsonResponse => {      return jsonResponse.id;    }).then(userId => {      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{              method: 'POST',              body: JSON.stringify({name:data.playlistName}),              headers: {                "Content-Type": "application/json",                Authorization: `Bearer ${accessToken}`              }            }).then(response => {              return response.json()            }).then(jsonResponse => {              return jsonResponse.id;            }).then(playlistId => {              if(data.playlistName !=='' && data.trackUris.length !== 0){                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{                  method: 'POST',                  headers: {                    "Content-Type": "application/json",                    Authorization: `Bearer ${accessToken}`                  },                  body: JSON.stringify({uris:data.trackUris})                }).then(response => {                  return response.json();                }).then(jsonResponse => {                  return jsonResponse;                })              }      })    })  }};export default Spotify;
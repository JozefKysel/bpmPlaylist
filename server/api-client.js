const auth = require('./authorization/authorization');
const request = require('request');

exports.setPlay = (req, res) => {
  const access_token = req.headers.authorization.split(' ')[1];
  const { songId } = req.params;
  try {
    request.put({
      url: `https://api.spotify.com/v1/me/player/play`,
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      json: {"uris": [`spotify:track:${songId}`]}
    });
  } catch (e) {
    console.log(e);
  }
}

exports.getUserData = async (req, res ) => { 
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    request.get({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    }, (err, response, body) => {
      res.send(body);
    });
  } catch (e) {
    console.log(e);
  }
}

exports.transferPlayback = (req, res) => {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    const { deviceId } = req.params;
    request.put({
      uri: 'https://api.spotify.com/v1/me/player',
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'device_ids': [deviceId],
        'play': false,
      })
    });
  } catch (e) {
    console.log(e);
  }
}

// USED FOR SEEDING DATABASE
// exports.getPlaylist = async (req, res) => {
//   const access_token = atob(req.headers.authorization.split(' ')[1]);
//   const playlistID = req.params.id;
//   try {
//     const data = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
//       headers: {
//         'Authorization': `Bearer ${access_token}`,
//         'Content-Type': 'application/json'
//         }
//     });
//     res.send(JSON.stringify(data));
//     res.status(200);
//   } catch (e) {
//     res.status(500);
//   }
// }

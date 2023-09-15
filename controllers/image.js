const Clarifai = require('clarifai');

    // const PAT = '73a94a2592a54efe855a8f793fa49c79';
    // const USER_ID = '12345678901';       
    // const APP_ID = 'my-first-application';   
    // const IMAGE_URL = imageUrl;
  
    // const raw = JSON.stringify({
    //   "user_app_id": {
    //     "user_id": USER_ID,
    //     "app_id": APP_ID
    //   },
    //   "inputs": [
    //       {
    //           "data": {
    //               "image": {
    //                   "url": IMAGE_URL 
    //               }
    //           }
    //       }
    //   ]
    // });
  
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //       'Accept': 'application/json',
    //       'Authorization': 'Key ' + PAT
    //   },
    //   body: raw
    // };
    // return requestOptions;
    // }
    const app = new Clarifai.App({
        apiKey: 'd30e3d69737649da99b8a08138e346c7'
    });
    
const handleAPICall = (req, res) => {
app.models.predict('face-detection', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
   db('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
    res.json(entries[0].entries);
   })
   .catch(err => res.status(400).json('unable to get entries'))
   }

   module.exports = {
    handleImage: handleImage,
    handleAPICall
   }
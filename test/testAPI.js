const axios = require('axios');

axios.post('http://localhost:3000/api/students/quary?Id=001')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

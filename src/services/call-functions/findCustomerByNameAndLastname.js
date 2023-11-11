const axios = require('axios');

async function findCustomerByNameAndLastname(name, lastname) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:1337/api/customer-personal-informations?filters[name][$eqi]=${name}&filters[lastname][$eqi]=${lastname}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        return JSON.stringify(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
}

module.exports= {
    findCustomerByNameAndLastname
}
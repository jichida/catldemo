const statusHelper = (response)=> {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const restfulapi = {
  getdevicegeo (userData) {
    return fetch(`http://101.89.141.136:50002/api/getdevicegeo`)
    .then(statusHelper)
    .then(response => response.json());
  },
  login (userData) {
    return fetch(`http://localhost/api/login`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      body    : JSON.stringify(userData)
    })
    .then(statusHelper)
    .then(response => response.json());
  },
};


export default restfulapi;

class ErrorResponse extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function getData(url) {
  let xhrPromise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let resJson = xhr.response;
        let res = JSON.parse(resJson);
        resolve(res);
      } else if (xhr.readyState === 4) {
        let err = new ErrorResponse(xhr.status, xhr.statusText);
        reject(err);
      }
    };

    xhr.open("get", url);
    xhr.send();
  });

  return xhrPromise;
}

// class ErrorResponse extends Error {
//   constructor(status, message) {
//     super(status);
//     this.message = message;
//   }
// }
// function customFetch(url) {
//   return new Promise(async (resolve, reject) => {
//     let res = await fetch(url);
//     if (res.status === 200 && res.ok === true) {
//       let data = await res.json();
//       resolve(data.data);
//     } else {
//       reject(new ErrorResponse(res.status, "Error"));
//     }
//   });
// }

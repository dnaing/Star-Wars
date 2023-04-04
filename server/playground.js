const baseUrl = "https://swapi.dev/api/films/"

function fetchData(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data); // optional: log the data to the console
        return data; // return the data to the caller of fetchData()
      })
      .catch(error => {
        // console.error(error); // optional: log the error to the console
        return null; // return null to the caller of fetchData() if an error occurs
      });
}

let jsonObj;
fetchData(baseUrl)
.then(data => {
    jsonObj = data;
    console.log(jsonObj);
})

loadPhotos();

function loadPhotos(photos) {
  return fetch('/api/v1/photos', {
    method: 'GET',
    body: JSON.stringify(photos),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(photos => photos.forEach(photo => {
    return $('.display').append(`
      <h1 class="name">${photo.name}</h1>
      <img src=${photo.url} class="photo" />
    `)
  }))
  .catch(error => console.log(error));
}
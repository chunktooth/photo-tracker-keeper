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
      <div class="img-tile">
        <h1 class="name">${photo.name}</h1>
        <img src=${photo.url} class="photo" />
      </div>
    `)
  }))
  .catch(error => console.log(error));
};

$('.add-btn').on('click', addPhoto);

function addPhoto(event) {
  event.preventDefault();
  let titleInput = $('.title-input').val();
  let urlInput = $('.url-input').val();

  return fetch('/api/v1/photos', {
    method: 'POST',
    body: JSON.stringify({
      name: titleInput,
      url: urlInput
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(photo => console.log(photo))
  .catch(error => console.log(error));

  resetForm();
};

function resetForm() {
  $('.title-input').val('');
  $('.url-input').val('');
};
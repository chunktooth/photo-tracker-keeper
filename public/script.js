loadPhotos();
$('.add-btn').on('click', addPhoto);
$('.display').on('click', '.delete-btn', deletePhoto);

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
      <div class='img-tile' id=${photo.id}>
        <img src=${photo.url} class='photo' />
        <h4 class='name'>${photo.name}</h4>
        <button class='delete-btn'>Delete</button>
      </div>
    `)
  }))
  .catch(error => console.log(error));
};

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
  .then(() => location.reload())
  .catch(error => console.log(error));
  resetForm();
};

function resetForm() {
  $('.title-input').val('');
  $('.url-input').val('');
};

function deletePhoto() {
  let id = $(this).parent('div').attr('id');

  return fetch(`/api/v1/photos/${id}`, {
    method: 'DELETE'
  })
  .then(() => location.reload())
  .catch(error => console.log(error));
  $(this).parent().remove();
}
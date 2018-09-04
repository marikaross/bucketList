$(window).on('load', retrieveList);
$('.add-button').on('click', grabContent);
$('.list-container').on('click', '.delete-button', deleteItem)

async function retrieveList() {
  const url = '/api/v1/list_items'
  const response = await fetch(url)
  const result = await response.json()
  const list = appendList(result)
}

function appendList(lists) {
  $('.list-container').empty()
  const bucketList = lists.forEach(list => {
    $('.list-container').append(`
      <article class="bucket-item">
        <div>
          <h2>${list.title}</h2>
          <h3>${list.description}</h3>
        </div
        <div>
          <button class="delete-button" id=${list.id}>delete</button>
        </div>
      </article>`)
  })
}

function grabContent(event) {
  event.preventDefault()
  let listTitle = $('.list-title').val();
  let listDesc = $('.list-desc').val();
  let listItem = {
    title: listTitle,
    description: listDesc
  }
  clearInputs()
  postItem(listItem);
  retrieveList();
}

async function postItem(listItem) {
  const url = '/api/v1/list_items'
  const response = await fetch(url, 
    {method: 'POST',
    headers:{
    'Content-Type': 'application/json'},
    body: JSON.stringify(listItem)
    })
  const result = await response.json()
}

function clearInputs() {
  $('.list-title').val('') 
  $('.list-desc').val('') 
}

async function deleteItem(event) {
  $(this).parents('.bucket-item').remove()
  let id = event.target.id
  let responseBody = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  }
  const response = await fetch(`/api/v1/list_items/${id}`, responseBody)
  const result = await response.json()
}
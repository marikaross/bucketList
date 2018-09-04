$(document).ready(retrieveList);
$('.add-button').on('click', grabContent)

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
      <article class="bucket-item" id=${list.id}>
        <h2>${list.title}</h2>
        <h3>${list.description}</h3>
        <button>delete</button>
      </article>`)
  })
}

function grabContent(event) {
  event.prevent(default)
  let listTitle = $('.list-title').val();
  let listDesc = $('.list-desc').val();
  let listItem = {
    title: listTitle,
    description: listDesc
  }
  postItem(listItem)
  retrieveList()
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
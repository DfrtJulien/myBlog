

if(document.getElementById('articleForm')){
  document.getElementById('articleForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    fetch('http://localhost:3000/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
    
  
  });
}


if(document.getElementById('showArticles')){
  window.addEventListener('load', (event) => {
    const articleContainer = document.getElementById('articlesContainer');
    fetch('http://localhost:3000/articles')
      .then(response => response.json())
      .then(data => {
        
        data.forEach(article => {
          console.log(article);
          articleContainer.innerHTML += `
          <div class="article">
            <a href="/article?id=${article._id}">
              <h3>${article.title}</h3>
              <p>${article.content}</p>
            </a>
          </div>`
        })
      })
      .catch(error => console.error('Erreur lors du fetch :', error));
  });
 
}

if(document.getElementById('showArticle')){
  const articleContainer = document.getElementById('articleContainer');
  const deleteBtn = document.getElementById('deleteArticle');
  window.addEventListener('load', (event) => {
   
    const id = new URLSearchParams(window.location.search).get('id');
    
    fetch(`http://localhost:3000/articleDetail/${id}`)
      .then(response => response.json())
      .then(data => {
        
       articleContainer.innerHTML = `
       <div>
          <h3>${data.title}</h3>
          <p>${data.content}</p>
          <a href="/">Revenir a l'accueil</a>
       </div>`;
       deleteBtn.setAttribute('data-id-article', data._id);
      })
      .catch(error => console.error('Erreur lors du fetch :', error));
  });
 

  deleteBtn.addEventListener('click', () => {
  const idArticle = deleteBtn.getAttribute('data-id-article');
  console.log(idArticle);
  
  fetch(`http://localhost:3000/delete/${idArticle}`)
  .then(data => {
   
    window.location.href = '/';
  })
  .catch(err => console.error('Erreur :', err));
    
  
})


}

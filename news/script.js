const API_key = '8e74d90bd0c84156af5bb6196b47d810'
const searchInput = document.getElementById('query')
const searchButton = document.getElementById('search-btn')




addEventListener("load", () => {
  fetchData()

  searchButton.addEventListener('click', (e) => {
    fetchData(searchInput.value)
  })


  // for navigation links 
  document.getElementById('ai').addEventListener('click', () => {
    fetchData('ai')
  })
  document.getElementById('finance').addEventListener('click', () => {
    fetchData('finance')
  })
  document.getElementById('technology').addEventListener('click', () => {
    fetchData('technology')
  })

  async function fetchData(query = 'india') {
    let url = `https://newsapi.org/v2/everything?pageSize=20&q=${query}&apiKey=${API_key}`
    let res = await fetch(url)
    const data = await res.json();
    render(data.articles)
  }

  function render(news) {
    const cardsContainer = document.getElementById('parent-container')


    cardsContainer.innerHTML = ""

    news.forEach(element => {

      let publishedDate = new Date(element.publishedAt)
      let articleDate = publishedDate.toLocaleString('en-IN', 'Asia/Kolkata', 'numeric', 'numeric', 'numeric', 'numeric', 'numeric', 'numeric')
      const placeholder = 'https://images.unsplash.com/photo-1644907094802-c942b599ebc5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

      if (element.urlToImage == null) {
        return;
      }
      const content = `<a
      href="${element.url}"
      target='_blank'
      class="text-sm font-semibold text-gray-800 hover:text-gray-900"
      id="ai">
      <div class="border" id="card">
            <img
              src="${element.urlToImage ? element.urlToImage : placeholder}"
              class="aspect-video w-full rounded-md"
              alt=""
              id="articleImg" />
            <div class="min-h-min p-3">
              <p
                class="mt-4 flex-1 text-base font-semibold text-gray-900"
                id="title">
                ${element.title}
              </p>
              <p
                class="mt-4 w-full text-sm leading-normal text-gray-600"
                id="des">${element.description}
              </p>
              <div class="mt-4 flex space-x-3">
                <div>
                  <p
                    class="text-sm font-semibold leading-tight text-gray-900"
                    id="publisher">
                    ${element.author ? element.author : 'User Not found'}
                  </p>
                  <p class="text-sm leading-tight text-gray-600" id="date">${articleDate}</p>
                </div>
              </div>
            </div>
          </div>
        </a>`
      cardsContainer.innerHTML += content;
    });
  }
});



// data loading area

const searchBook = () => {
    const searchArea = document.getElementById('search-area');
    const searchText = searchArea.value;
    searchArea.value = '';
    if (searchText === '') {
        document.getElementById('books-number').innerText = `Type A Text`;
    } else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }
}

// Search result area

const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";
    document.getElementById('books-number').innerText = `Total search results : ${docs.length}`;

    // conditionals for error handling

    if (docs.length === 0) {
        document.getElementById('books-number').innerText = `No Result Found`;
    } else {
        docs.forEach(doc => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">

                <img style="height: 20rem" src="https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg" class="card-img-top" alt="...">

                <div class="card-body">

                    <h5>Book Name : ${doc.title}</h5>
                    <h6>Author Name : ${doc.author_name}</h6>
                    <p>Publisher : ${doc.publisher}</p>
                    <p>First Publish Year : ${doc.first_publish_year}</p>
                    <p>Publish Date : ${doc.publish_date}</p>

                </div>

            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}
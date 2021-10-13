// Variables
let resultsList;

// Cached Element References
const buttonEl = document.getElementById('search-btn');
const inputEl = document.getElementById('search-input');
const resultsEl = document.getElementById('results');
// Event Listeners
buttonEl.addEventListener('click', handleClick);
inputEl.addEventListener('focus', handleReset);


// Functions

function handleReset() {
    resultsEl.innerHTML = "";
}

function handleClick() {
    const userInput = inputEl.value;
    if(!userInput) return; // don't run any of the code
    // we need to send a get request to our server to basically search for a book based on the title
    // once we get data back, we will add that data to the dom
    fetch('/posts/search?title=' + userInput)
    .then(response => response.json())
    .then(data => {
        resultsList = data;
        inputEl.value = ""
        render();
    });
}


function render() {
    let resultsHTML;

    if(resultsList.length) {
        resultsHTML = resultsList.map(result => {
            return `<li><a href="/posts/${result._id}">${result.title}</a></li>`;
        }).join('');
    } else {
        resultsHTML = '<li>Sorry No Results Found</li>'
    }

    resultsEl.innerHTML = resultsHTML;
}
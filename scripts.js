const API_KEY = "&apiKey=53a219365bf140908855584c3e721d6b";
const BASE_URL = `https://newsapi.org/v2/everything?sources=`;
const SOURCE_URL = `https://newsapi.org/v2/top-headlines/sources?language=en`;
/**
 * Attach an event listener to the submit button for the Option 1 dropdown list.
 */
const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", option1DropdownClickHandler);


async function option1DropdownClickHandler(event) {
  try {
    console.log("press")
    const select = document.getElementById("dropdown");
    const dropvalue = select.options[select.selectedIndex].value;
    const response = await fetch(`${BASE_URL}${dropvalue}${API_KEY}`);
    
    const data = await response.json();
    render(data.articles);

  }catch (err) {
    console.log(console.error());
  }
}

function render(data) {
  clearResult();
  
  let cards = '';
  for (const item of data) {
    if(item.urlToImage) {
      cards += renderCard(item);
    }
  }
  document.getElementById("option-1-results").innerHTML = cards;
}

function renderCard(item) {
  return `
  <li class="card">
      <img src=${item.urlToImage} alt="">
      <div class="card-content">
          
          <h3 class="header">
              ${item.title}
          </h3>
      </div>
  </li>
`;
}

function clearResult(){
  document.getElementById("option-1-results").innerHTML = '';
}


async function fillUpDropDown () {
  try {
    const response = await fetch(`${SOURCE_URL}${API_KEY}`);
    const data = await response.json();
    const select = document.getElementById("dropdown");
    
    data.sources.forEach((item) => {
      const option = document.createElement("option");
      option.textContent = item.name;
      option.value = item.id;
      select.appendChild(option);
    });
  

  }catch (err ){
    console.log(err )
  }
}

fillUpDropDown();
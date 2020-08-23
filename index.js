const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "d2a7fa80",
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

const root = document.querySelector(".autocomplete");

root.innerHTML = `
  <label><b>Search for a Movie</b></label>
  <input
    id="movieSearch"
    name="searchTerm"
    placeholder="Search for a movie!"
    class="input"
  />
  <div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results">
    </div>
  </div>
  </div>

  <div id="target"></div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const sendInput = async (event) => {
  const movies = await fetchData(event.target.value);

  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }

  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");

  for (let movie of movies) {
    const imgSrc = movie.Poster === "NA" ? "" : movie.Poster;
    const option = document.createElement("a");
    option.classList.add("dropdown-item");

    option.innerHTML = `
      <img src="${imgSrc}"/>
      ${movie.Title}
    `;

    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
    });
    resultsWrapper.appendChild(option);
    // document.querySelector("#target").appendChild(div);
  }
};

input.addEventListener("input", debounce(sendInput, 500));

document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});

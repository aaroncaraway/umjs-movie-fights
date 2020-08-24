const autoCompleteConfig = {
  placeholderText: "Try something like 'dark knight' or 'the apartment'",
  renderOption(movie) {
    const imgSrc = movie.Poster === "NA" ? "" : movie.Poster;
    return `
      <img src="${imgSrc}"/>
      ${movie.Title} (${movie.Year})
    `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
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
  },
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, "#left-summary", "left");
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, "#right-summary", "right");
  },
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, selector, side) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "d2a7fa80",
      i: movie.imdbID,
    },
  });

  document.querySelector(selector).innerHTML = movieTemplate(response.data);
  if (side === "left") {
    leftMovie = response.data;
  }

  if (side === "right") {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    console.log("comparison time!");
  }
};

const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" alt="" />
        </p>
      </figure>
    </article>
    <div class="media-content">
      <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
  `;
};

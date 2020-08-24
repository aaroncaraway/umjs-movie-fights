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

createAutoComplete({
  root: document.querySelector(".autocomplete"),
});

createAutoComplete({
  root: document.querySelector(".autocomplete-two"),
});

createAutoComplete({
  root: document.querySelector(".autocomplete-three"),
});

const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "d2a7fa80",
      i: movie.imdbID,
    },
  });

  // const summary = document.querySelector("#summary");
  // summary.innerHTML = movieTemplate(response.data);

  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
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

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

const input = document.querySelector("input");

const sendInput = async (event) => {
  const movies = await fetchData(event.target.value);
  console.log(movies);
  for (let movie of movies) {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${movie.Poster}"/>
      <h2>${movie.Title}</h2>
    `;
    document.querySelector("#target").appendChild(div);
  }
};

input.addEventListener("input", debounce(sendInput, 500));

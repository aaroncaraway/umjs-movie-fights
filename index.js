const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "d2a7fa80",
      s: searchTerm,
    },
  });
  console.log(response.data);
};

const input = document.querySelector("input");

const sendInput = (event) => {
  fetchData(event.target.value);
};

input.addEventListener("input", debounce(sendInput, 500));

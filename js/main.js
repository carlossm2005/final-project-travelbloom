
const fetchFunction = async () => {
  try {
    const response = await fetch('/travel_recommendation_api.json');
    const json = await response.json();
    
    return json;
  } catch (error) {
    console.error('Error:', error);
  }
}

const clearList = () => {
  const list = document.getElementById('list');

  list.innerHTML = '';

  return;
}

const searchFunc = async () => {
  const search = document.getElementById('search-input').value;
  const list = document.getElementById('list');
  list.innerHTML = '';

  const dataResponse = await fetchFunction();
  let searchName = Object.keys(dataResponse).find((key) => key.toLowerCase().includes(search.toLowerCase().trim()));

  if (!searchName) {
    if (search.toLowerCase().trim() === 'country') {
      searchName = 'countries';
    } else {
      clearList();

      return;
    };
  }

  const selectedData = dataResponse[searchName];

  if (searchName === 'countries') {
    selectedData.map(country => {
      country.cities.forEach(city => {
        const cityNode = document.createElement('div');
        cityNode.className = 'travel-card';
        cityNode.innerHTML = `<img src="assets/images/json/${city.imageUrl}" alt="${city.name}">
        <div class="card-info">
          <h3>${city.name}</h3>
          <p>${city.description}</p>
          <button>Visit</button>
        </div>`;

        list.appendChild(cityNode);
      });
    });
  } else {
    selectedData.forEach(place => {
      const placeNode = document.createElement('div');
      placeNode.className = 'travel-card';
      placeNode.innerHTML = `<img src="assets/images/json/${place.imageUrl}" alt="${place.name}">
      <div class="card-info">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <button>Visit</button>
      </div>`;

      list.appendChild(placeNode);
    });
  }
};

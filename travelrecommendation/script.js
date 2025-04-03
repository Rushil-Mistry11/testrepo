// Fetch data from the JSON file
let travelData = []; // Store data globally

fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check data in console
    travelData = data; // Store data for later use
  })
  .catch(error => console.error('Error fetching data:', error));

// Search Button Event Listener
document.getElementById('searchButton').addEventListener('click', () => {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  searchRecommendations(keyword);
});

// Function to search recommendations based on the keyword
function searchRecommendations(keyword) {
  const filteredResults = [];

  ['countries', 'temples', 'beaches'].forEach(category => {
    travelData[category].forEach(place => {
        if (
            (place.name && place.name.toLowerCase().includes(keyword)) ||
            (place.description && place.description.toLowerCase())
          )
           {
        filteredResults.push(place);
      }
    });
  });

  displayFilteredResults(filteredResults);
}

// Function to display filtered results
function displayFilteredResults(results) {
  const recommendationsContainer = document.getElementById('recommendations');
  recommendationsContainer.innerHTML = ''; // Clear previous content

  results.slice(0, 2).forEach(place => {
    const placeElement = document.createElement('div');
    placeElement.classList.add('place');

    placeElement.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.imageUrl}" alt="${place.name}" />
      <p>${place.description}</p>
    `;

    recommendationsContainer.appendChild(placeElement);
  });
}


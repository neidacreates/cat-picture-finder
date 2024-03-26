const breeds_url = 'https://api.thecatapi.com/v1/breeds';
const breedList = document.getElementById("breed-list");
const breedHeader = document.getElementById("breed-header");
const breedOrigin = document.getElementById("breed-origin");
const breedTemp = document.getElementById("breed-temperament");
const breedDesc = document.getElementById("breed-description");
const breedPic = document.getElementById("breed-pic");


function getBreeds(){
  
  fetch(breeds_url)
  .then(response => response.json())
  .then(data => {
    // test 
    // console.log(data)
    // test
    data.forEach(function(breed) {
      const newLink = document.createElement("a");
      const breedName = breed["name"];
      const breedId = breed["id"];
      // make an li for each breed
      const newNode = document.createElement("li");
      const nodeContent = document.createTextNode(breedName);
      newLink.appendChild(nodeContent);
      newLink.href = `breed.html?${breedId}`
      newNode.appendChild(newLink);
      // setting the id on each li
      newNode.setAttribute("id", breedName.toLowerCase());
      breedList.appendChild(newNode);

      // test
      // console.log(breed['name']);
      // test
    })

  })}

function getBreedInfo() {
  const currentBreedId = document.location.href.split('?').pop();
  console.log(currentBreedId);
  fetch(`https://api.thecatapi.com/v1/breeds/${currentBreedId}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    console.log(data["temperament"]);
    const breedName = data["name"];
    const temperament = data["temperament"];
    const origin = data["origin"];
    const description = data["description"];
    
    breedHeader.innerHTML = breedName;
    breedOrigin.innerHTML = `Country of Origin: ${origin}`;
    breedTemp.innerHTML = `Temperament: ${temperament}`;
    breedDesc.innerHTML = `Description: ${description}`;

  })

  fetch (`https://api.thecatapi.com/v1/images/search?breed_ids=${currentBreedId}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const picUrl = data[0]["url"];
    breedPic.setAttribute("src", picUrl)
  })  

  }
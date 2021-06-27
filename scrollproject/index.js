
const imageContainer = document.getElementById('image-container');
let photosArray = [];
const count = 15;
const apiKey='m7qXWfTfShAZwbjyV_PqZwPuzrr1MPU0cIxOljKNSro';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//create element for the each object in photosArray
function displayPhotos(){
  //create anchor tag for photo
  photosArray.forEach((photo)=>{
    const item = document.createElement('a');
    item.setAttribute('href',photo.links.html);
    item.setAttribute('target','_blank');

    //createing the image target

    const image= document.createElement('img');
    image.setAttribute('src',photo.urls.regular);
    image.setAttribute('alt',photo.alt_description);
    image.setAttribute('title',photo.alt_description);
    //Put image inside the anchor tag and both of them inside div target
    item.appendChild(image);
    imageContainer.appendChild(item);
});

}

async function photoQuery(){
  try{
    photosArray = await fetch(apiUrl)
                .then(response=>response.json());
    displayPhotos();
  }
  catch(err){
    console.log("woops something went wrong", err);
  }
}

photoQuery();

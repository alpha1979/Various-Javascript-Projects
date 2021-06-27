
const imageContainer = document.getElementById('image-container');

const count = 15;
const apiKey='m7qXWfTfShAZwbjyV_PqZwPuzrr1MPU0cIxOljKNSro';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Loader function for the image load addEventListener
function loader(){
  // console.log('image loaded');
  imageLoaded++;
  console.log(imageLoaded);
  if(imageLoaded === totalImages){
    ready = true;
    console.log("ready= ", ready);
  }

}
// function for setting attributes for not repating the code
function setAttributes(element,attributes){
  for (const key in attributes){
    element.setAttribute(key,attributes[key]);
  }
}
//create element for the each object in photosArray
function displayPhotos(){
  console.log('image loaded= ',imageLoaded);
  imageLoaded =0;
  console.log('image loaded= ',imageLoaded);
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  //create anchor tag for photo
  photosArray.forEach((photo)=>{
    const item = document.createElement('a');
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target','_blank');
    setAttributes(item,{
      href:photo.links.html,
      target:"_blank"
    });

    //createing the image target

    const image= document.createElement('img');
    // image.setAttribute('src',photo.urls.regular);
    // image.setAttribute('alt',photo.alt_description);
    // image.setAttribute('title',photo.alt_description);
    setAttributes(image,{
      src:photo.urls.regular,
      alt:photo.alt_description,
      title:photo.alt_description
    });
    //Event Listenere check when each is finished loading
    image.addEventListener('load',loader);
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

window.addEventListener('scroll',()=>{
  // console.log("scrolled");
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    photoQuery();

  // console.log('load more')  ;
  }
});


photoQuery();

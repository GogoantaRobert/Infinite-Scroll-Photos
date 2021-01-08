


// Create Elements For links & photos , add to dom

function displayPhotos () {
  imagesLoaded=0;
  totalImages = photosArray.length;
  console.log('total images',totalImages)
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> Link to Unsplash
    const item = document.createElement ('a');
    item.setAttribute('href',photo.links.html);
    item.setAttribute('target','_blank')
    // Create <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src',photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    //Event Listener , check when each is finished loading
    img.addEventListener('load', imageLoaded);

    //put <img> inside <A> then put both inside imageContainer content
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}


const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded=0;
let totalImages=0;
let photosArray = [];
// Unsplash
const count = 30;
const apiKey = `Rq-cp8Jc148MeNRDdtLmhgMoBIFV-qe6icXVOGOqU_o`;
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded===totalImages){
    ready=true;
    loader.hidden = true;
    console.log('ready =',ready);
  }
}

// Get photos from Unsplasj API
async function getPhotos() {
  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch(error){
    // Catch error
  }
}

//Check to see if scrolling near bottom of the page , Load more photos
window.addEventListener('scroll',()=> {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight- 1000 && ready) {
  ready=false;
  getPhotos();
  
}
});



// on Load
getPhotos();
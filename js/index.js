const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.error(err)); // Catching errors properly
};

const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.error(err)); // Catching errors properly
};
// remove active claass from all button
const removeActiveClass = () =>{
  const allButtons = document.getElementsByClassName("category-btn")
  for(const btn of allButtons){
    btn.classList.remove("active")
  }
}
// fetch data by category
const loadCategoriVideos= (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();

      const activebuttons = document.getElementById(`btn-${id}`)
      
      
      activebuttons.classList.add("active")
      displayVideos(data.category)
    })
    .catch((err) => console.error(err)); // Catching errors properly
};

// video details
const loadDetails =async (videoId) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
  const data = await res.json();
  displayDetails(data.video)
}

const displayDetails = (video) =>{
  const modalContainer = document.getElementById("modalContent");
  modalContainer.innerHTML = `
  <img src="${video.thumbnail}" />
  <p class="mt-5">${video.description}</p>
  `


  document.getElementById("customModal").showModal()
  
  
}




// display category button
const displayCategories = (categories) => {
  const categoryDiv = document.getElementById("category");

  categories.forEach((item) => {
    console.log(item.category);

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = 
    `
    <button id="btn-${item.category_id}" onclick = "loadCategoriVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
    `
    
    categoryDiv.append(buttonContainer);
  });
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = ""

  if(videos.length == 0){
    videoContainer.classList.remove("grid")
    videoContainer.innerHTML = `
    <div  class="flex flex-col gap-5 justify-center items-center">
    <p class= "text-3xl mx-auto">No content Here</p>
    <img class = "h-[300px] w-[300px]" src="assets/Icon.png"/></div>
    `
  }
  else{
    videoContainer.classList.add("grid")
  }
  videos.forEach((item) => {
    
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
            <figure>
    <img class= "h-[200px] object-cover"
      src="${item.thumbnail}"
      alt="Shoes" />
  </figure>
    <div class =" flex gap-3  mt-5">
        <div>
        <img class ="h-10 w-10 rounded-full" src="${item.authors[0].profile_picture}"/>
        </div>
        <div>
        <p class ="text-xl font-bold">${item.title}</p>
        </div>
    </div>
    <button onclick = "loadDetails('${item.video_id}')" class = "btn btn-success my-5 mx-3">Details</button>
        `;
    videoContainer.append(card);
  });
};

loadCategories();
loadVideos();

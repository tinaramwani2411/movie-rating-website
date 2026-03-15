let selectedMovie = null;

const popup = document.getElementById("ratingPopup");
const stars = document.querySelectorAll(".stars span");

function openRating(card){
selectedMovie = card;
popup.style.display = "block";
resetStars();
}

stars.forEach((star,index)=>{

star.addEventListener("mouseover",()=>{

stars.forEach((s,i)=>{
s.textContent = i <= index ? "⭐" : "☆";
});

});

star.addEventListener("click",()=>{

let ratingDiv = selectedMovie.querySelector(".rating");

let result="";

for(let i=0;i<=index;i++){
result+="⭐";
}

ratingDiv.textContent=result;

closePopup();

});

});

function resetStars(){
stars.forEach(star=>{
star.textContent="☆";
});
}

function closePopup(){
popup.style.display="none";
}
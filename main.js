const app = document.getElementById('root');
const dropDown = document.getElementById('dropDown');
let dropDownItem;



const container = document.createElement('div');
container.setAttribute('class', 'container');


app.appendChild(container);


const searchButton = document.getElementById('searchButton');
const searchArea = document.getElementById('search');


let movies = [];
let counter = 0;



let request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  let data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      
      movies[counter] = movie;
    
    
     counter++;
   
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
  loadDropDown();
}



request.send();


function loadDropDown(){

  for(let i =0; i< movies.length;i++){
  dropDownItem =document.createElement('option');
 
  dropDownItem.textContent = movies[i].title;
  dropDown.append(dropDownItem);

 
  
  dropDown.onclick = function(){
    console.log('y');

    
   searchArea.value = dropDown.value;
  }

  
  }



}





searchButton.onclick = function(){
  let searchMovies = document.getElementById('search').value;

  for(let i =0;i <movies.length;i++){
    if(movies[i].title == searchMovies){
      load(movies[i]);
      break;
    }else{
      console.log('uh oh');
      
    }
  }

}


function load(movie){

  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.style.backgroundColor = '#bcc0c6';
  card.style.padding = '5px';
  card.style.border = '2px solid black';

  
  const hr = document.createElement('hr');

  const h1 = document.createElement('h1');
  h1.textContent = movie.title;

  const span = document.createElement('span');
  span.style.display = 'inline';

  const h4 = document.createElement('h4');
  h4.textContent = movie.producer

  const releaseDate = document.createElement('h4');
  releaseDate.textContent = movie.release_date;

  const p = document.createElement('p');
  movie.description = movie.description;
  p.textContent = `${movie.description}...`;



  container.appendChild(card);
  
      card.appendChild(h1);
      card.appendChild(hr);
      card.appendChild(span);
      span.append(h4);
      span.append(releaseDate);
      card.appendChild(p);
      

}

console.log(movies);



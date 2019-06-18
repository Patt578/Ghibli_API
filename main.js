const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);


const searchButton = document.getElementById('searchButton');



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
}



request.send();






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

  const h1 = document.createElement('h1');
  h1.textContent = movie.title;


  const p = document.createElement('p');
  movie.description = movie.description;
  p.textContent = `${movie.description}...`;

  container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      

}

console.log(movies);



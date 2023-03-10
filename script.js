
const apiKey ='api_key=d86da469b71823cef7fb8d1a191e6a8c';
const baseURL ='https://api.themoviedb.org/3';
const apiURL = baseURL +'/discover/movie?sort_by=popularity.desc&'+apiKey;
const imgURL = 'https://image.tmdb.org/t/p/w500';
const searchURL = baseURL +'/search/movie?'+apiKey;
const main = document.getElementById('main');
const form = document.getElementById('form'); 
const search = document.getElementById('search');    

getMovies(apiURL);


function getMovies(url) {
   
    fetch(url).then(sag=>sag.json()).then(data=> {
        showMovies(data.results);
    }) 

}

function showMovies(data){

    main.innerHTML = '';

    data.forEach(movie => {
        const {title ,overview ,poster_path ,vote_average} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${imgURL + poster_path }" alt="${title}">

            <div class="movie-info">
                <h3> ${title}</h3>
                <span class="${getcolor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>${overview}</h3>
            </div> 
            `
        main.appendChild(movieEl);

        });  

    }

    function getcolor(vote){
        if(vote>=8){return "green"}
        else if(vote>=5){ return "orange"}
        else {return "red"}
    }

    form.addEventListener('submit',(e)=>{
            
        e.preventDefault();
        const searchTerm = search.value;
        if(searchTerm){
            getMovies(searchURL+ '&query=' + searchTerm)
        }
    })
    
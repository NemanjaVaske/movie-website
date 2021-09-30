const TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=9c601addd1a00112064c9f21873b3f3c&language=en-US&page=1';
const POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=9c601addd1a00112064c9f21873b3f3c&language=en-US&page=1';
const UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming?api_key=9c601addd1a00112064c9f21873b3f3c&language=en-US&page=1';

//on page loading we first fetching upcoming movies
window.document.addEventListener('load',fetchMovies(UPCOMING));

const moviesContainer = document.getElementsByClassName('movies-container');
const options = document.querySelectorAll('.option');
const form = document.querySelector('form');


//searching movies
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const search = form[0].value;
    if(search && search !==''){
        moviesContainer[0].innerHTML='';
        fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=9c601addd1a00112064c9f21873b3f3c&language=en-US&query=${search}&page=1&include_adult=false`);
    }
    else{
        window.location.reload();
    }
});


//chosing between topbar option
options.forEach((option,index)=>{
    option.addEventListener('click',()=>{
        switch (index) {
            case 0:
                moviesContainer[0].innerHTML='';
                fetchMovies(UPCOMING);
                form[0].value='';
                break;
            case 1:
                moviesContainer[0].innerHTML='';
                fetchMovies(TOP_RATED);
                form[0].value='';
                break;
            case 2:
                moviesContainer[0].innerHTML='';
                fetchMovies(POPULAR);
                form[0].value='';
                break;
            default:
                break;
        }
        for(let i=0; i<options.length;i++){
            if(index === i){
                options[i].classList.add('active-option');
            }
            else{
                options[i].classList.remove('active-option');
            }
        }
    })
});

//fetching the movies
async function fetchMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    if(data.results.length<1){
        moviesContainer[0].innerHTML='<h1>NO MOVIES FOUND...</h1>';
    }
    //creating movie card   
    data.results.forEach(element => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        moviesContainer[0].appendChild(movieContainer);
        const image = document.createElement('img');
        image.classList.add('movie-container-img');
        if(element.poster_path){
            image.setAttribute('src', `http://image.tmdb.org/t/p/w300/${element.poster_path}`);
        }else{
            image.setAttribute('src', './NoImage.png')
        }
        const rating = document.createElement('span');
        const title = document.createElement('span');
        const date = document.createElement('span');
        const overview = document.createElement('span');

        rating.classList.add('movie-container-rating');
        if(element.vote_average <= 5){
            rating.setAttribute('style', 'border: 4px solid rgb(241, 40, 40)' )
        }
        else if(element.vote_average >5 && element.vote_average <= 8){
            rating.setAttribute('style', 'border: 4px solid rgb(218, 218, 23)' )
        }
        else{
            rating.setAttribute('style', 'border: 4px solid limegreen' )
        }
        
        title.classList.add('movie-container-title');
        date.classList.add('movie-container-date');
        overview.classList.add('overview');

        rating.innerHTML = element.vote_average;
        title.innerHTML = element.title;
        date.innerHTML = element.release_date;
        if(element.overview && element.overview !== ''){
            overview.innerHTML=`<h4>${element.overview}</h4>`;
        }else{
            overview.innerHTML='<h3>No overview avaliable!</h3>'
        }
        
        movieContainer.appendChild(image);
        movieContainer.appendChild(rating);
        movieContainer.appendChild(title);
        movieContainer.appendChild(date);
        movieContainer.appendChild(overview);
    });
}
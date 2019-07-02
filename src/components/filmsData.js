let baseURL = 'https://api.themoviedb.org/3/movie/'
const keyAPI = process.env.REACT_APP_FILMS_API_KEY



export default function getMovies(moviesId){
let storedMovies

if (moviesId){
for (let oneMovie of moviesId){


	let url = `${baseURL}${oneMovie}?language=en-US&api_key=${keyAPI}`
	fetch(url) 
	.then((result) => {return result.json()})
	.then((data) => {let movie = {
			name: data.original_title,
			descr: data.overview,
			pic: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
			tagline: data.tagline,
			rank: data.vote_average,
		}
		return storedMovies.push(movie)
		
	})
	.catch((err)=>{
	//	result.json({
	//		error: error
	//	})
	console.log(err)
	})

}

return storedMovies


}
}




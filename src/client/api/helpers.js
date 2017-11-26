export const findMovieDirector = ({credits: {crew}}) => crew.find(person => person.job === 'Director') || { name: 'Not found' };
export const findMovieCast = ({credits: {crew}}) => crew.find(person => person.job === 'Story') || { name: 'Not found' };
export const getMovieGenres = ({genres}) => genres.map(genre => genre.name).join(', ');
export const getAllDirectedMovies = ({movie_credits: {crew}}) => crew.filter(movie => movie.job === 'Director');

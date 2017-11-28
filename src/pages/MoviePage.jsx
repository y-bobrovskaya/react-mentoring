import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {getMovieDetail} from '../redux/actions';
import {Movie} from '../components/Movie';
import {Content} from '../components/Content';

import { findMovieDirector, getAllDirectedMovies } from '../client/api/helpers';

export class MoviePage extends React.Component {
    constructor(props) {
        super(props);

        this.goSearch = this.goSearch.bind(this);
        this.loadMovie = this.loadMovie.bind(this);

        if (this.props.match.params.title) {
            this.loadMovie(this.props.match.params.title);
        }
    }

    loadMovie(title) {
        if (title) {
            let [id, ...junk] = title.split('-');

            this.props.getDetail(id);
        }
    }

    goSearch(e) {
        e.preventDefault();
        this.props.history.push('/search');
    }

    componentWillUpdate(nextProps) {
        if (nextProps.match.params.title !== this.props.match.params.title) {
            this.loadMovie(nextProps.match.params.title);
        }
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Movie movie={this.props.movie} goSearch={this.goSearch}/>
                <div>Films by {findMovieDirector(this.props.movie).name}</div>
                <Content movies={getAllDirectedMovies(this.props.director)}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    movie: state.movie,
    director: state.director
});

const mapDispatchToProps = dispatch => ({
    getDetail: (id) => dispatch(getMovieDetail(id, dispatch))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviePage));

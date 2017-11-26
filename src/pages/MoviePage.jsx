import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getMovieDetail} from '../redux/actions';
import {Movie} from '../components/Movie';
import {Content} from '../components/Content';

import { findMovieDirector, getAllDirectedMovies } from '../client/api/helpers';

class MoviePage extends React.Component {
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
		console.log("this.props --- ", this.props);
        this.props.history.push('/search');
    }

    componentWillUpdate(nextProps) {
        console.log(this.props.match.params.title, nextProps.match.params.title);

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
    getDetail: (id) => dispatch(getMovieDetail(id, dispatch)),
    //onQueryChange: (query, oldQuery) => dispatch(setQuery(query, oldQuery)),
    //onSortChange: type => dispatch(changeSort(type)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviePage));

import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {doSearch, setQuery, setSearchType} from '../redux/actions';
import Search from '../components/Search';
import {Content} from '../components/Content';

export class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearchTypeChange = this.onSearchTypeChange.bind(this);

        if (this.props.match.params.query) {
            this.props.onSearch(this.props.match.params.query, this.props.selectedSearchType);
        }
    }

    onChange(e) {
        this.props.onQueryChange(e.target.value, this.props.query);
    }

    onSearchTypeChange(e) {
        this.props.onSearchTypeChange(e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.history.push('/search/' + this.props.query);
        this.props.onSearch(this.props.query, this.props.selectedSearchType);
    }

    render() {
        let searchProps = {
            query: this.props.query,
            selectedSearchType: this.props.selectedSearchType,
            state: this.props
        };

        let searchHandlers = {
            onChange: this.onChange,
            onSearchTypeChange: this.onSearchTypeChange,
            onSubmit: this.onSubmit
        };

        return (
            <div>
                <Search {...searchProps} {...searchHandlers}/>
                {this.props.movies.length
                    ?
                    <div className="row">
                        <span className="counter">{this.props.movies.length} movies found</span>
                    </div>
                    : ''
                }
                <Content movies={this.props.movies}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    query: state.query,
    oldValue: state.oldValue,
    movies: state.movies,
    selectedSearchType: state.selectedSearchType
});

const mapDispatchToProps = dispatch => ({
    onSearch: (query, selectedSearchType) => dispatch(doSearch(query, selectedSearchType, dispatch)),
    onQueryChange: (query, oldQuery) => dispatch(setQuery(query, oldQuery)),
    onSearchTypeChange: selectedSearchType => dispatch(setSearchType(selectedSearchType)),
});

const SearchPageConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
export default SearchPageConnected;

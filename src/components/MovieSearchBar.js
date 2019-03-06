import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatTitle } from '../helpers';

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  display: block;
  width: 50vw;
  margin: 1em;
  padding: 0.25em 1em;
  font-size: 1.25em;
  border-bottom: 2px lightgrey solid;
  border-top: none;
  border-left: none;
  border-right: none;
  transition: all 0.2s;

  :focus {
    outline: none;
    border-bottom: 2px black solid;
  }
  :focus::placeholder {
    color: transparent;
  }
`;

const Button = styled.button`
  padding: 0;
  font-size: 1em;
  background: black;
  color: white;
  border-radius: 5px;

  a {
    text-decoration: none;
    color: white;
    display: block;
    width: 100%;
    padding: 0.25em 1em;
  }
`;

class MovieSearchBar extends React.Component {
  state = { title: '' };

  handleSearchChange = e => {
    this.setState({ title: e.target.value });
  };

  render() {
    return (
      <form action="#">
        <SearchBarContainer>
          <Input
            type="text"
            placeholder="🔎 Enter movie title"
            value={this.state.title}
            onChange={this.handleSearchChange}
          />
          <Button
            onSubmit={e =>
              this.props.fetchUserSearchMovies(e, this.state.title)
            }
          >
            <Link to={`/movies/search/${formatTitle(this.state.title)}`}>
              Search
            </Link>
          </Button>
        </SearchBarContainer>
      </form>
    );
  }
}
export default MovieSearchBar;

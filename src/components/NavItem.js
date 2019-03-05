import styled from 'styled-components';

const NavItem = styled.li`
  margin: 1em 0.5em 0.5em 0.5em;
  padding: 0;
  font-size: 0.8em;
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 5px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.2);
  }
  :focus {
    outline: none;
  }
  :active {
    transform: scale(1.05);
  }

  a {
    color: black;
    text-align: center;
    text-decoration: none;
    padding: 0.25em 1em;
    display: block;
  }
`;

export default NavItem;

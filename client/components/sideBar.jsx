import React from 'react';

import DisplaySnippets from '../components/displaySnippets.jsx';
import { Image, Navbar, Form, Dropdown, FormControl, Button, Nav, InputGroup } from 'react-bootstrap';


const sideBar = function(props) {

  function massOnChange(event) {
    event.persist()
    props.enterSearch(event);
    props.trieFindChildren(event);
  }

  return (
    <div className='side-bar'>
      <div className='search-bar'>
        <FormControl
          aria-describedby="basic-addon1"
          id='search-field'
          type='text'
          name='search-bar'
          placeholder='Search my snippets'
          value={props.search}
          onChange={massOnChange}
        />
      </div>
      <DisplaySnippets
        userSnippets={props.userSnippets}
        getSnippetsMineOnly={props.getSnippetsMineOnly}
        validChildren={props.validChildren}
      />
    </div>
  );
};

export default sideBar;

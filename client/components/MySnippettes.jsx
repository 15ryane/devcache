import React from 'react';
import { Image, Navbar, Form, Dropdown, FormControl, Button, Nav } from 'react-bootstrap';

const MySnippettes = props => {
  const snippetsArray = props.userSnippets;
  const snippetsDisplayArray = [];

  if(snippetsArray) {
    for (let i = snippetsArray.length-1; i >= 0; i--) {
      snippetsDisplayArray.push(
        <div
          key={'snippet' + i}
          id={ snippetsArray[i].id }
        >
            <Button variant="outline-dark" className="tagged-snippet text-left" size='sm'>
              { snippetsArray[i].snippet }
              <Button variant="outline-info">Edit</Button>
              <Button variant="outline-danger">Delete</Button>
            </Button>
        </div>
      );
    };
  }
  return (
    <div>
      <h1>
      {snippetsDisplayArray}
      </h1>
    </div>
  );
}

export default MySnippettes;
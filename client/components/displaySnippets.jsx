import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';


const DisplaySnippets = props => {
  const snippetsArray = props.userSnippets;
  let snippetsDisplayArray = [];
  let unique = 0;

  if(snippetsArray) {
    if(props.validChildren.length !== 0){
      props.validChildren.forEach( (tag) => {
        snippetsArray.forEach( (snippet, i) => {
          snippet.tags.forEach( (tagObject) => {
            Object.values(tagObject).forEach( (myTag) => {
              if(myTag === tag) {

                snippetsDisplayArray.push(
                  <div>
                  <Button bsPrefix="tagged-snippet" key={unique++} variant="outline-dark" className="text-left">
                    { snippet.snippet }
                  </Button>
                  </div>
                )
                
              }
            })
          })
        })
      })
    }
    console.log(snippetsDisplayArray)
  }
  return (
    <div>
      {snippetsDisplayArray}
    </div>
  );
}

export default DisplaySnippets;

import React, { Component } from 'react';
import * as actions from "../actions/actions";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Import Children

import AddSnip from '../components/addSnip.jsx';
import SideBar from '../components/sideBar.jsx';

const mapStateToProps = (store) => ({
  userInfo: store.user.userInfo,
  snippet: store.snip.snippet,
  userSnippets: store.snip.userSnippets,
  comments: store.snip.comments,
  project: store.snip.project,
  tags: store.snip.tags,
  search: store.snip.search,
  // recievedTags: store.snip.recievedTags,
  recievedSnippets: store.snip.recievedSnippets,
  userSnippets: store.snip.userSnippets,

  tagTrie: store.trie.tagTrie,
})

const mapDispatchToProps = dispatch => ({

  // uiux related
  userLogout: (id) => { dispatch(actions.userLogout(id)) },
  enterSnippet: (event) => { dispatch(actions.enterSnippet(event.target.value)) },
  enterComments: (event) => { dispatch(actions.enterComments(event.target.value)) },
  enterProject: (event) => { dispatch(actions.enterProject(event.target.value)) },
  enterTags: (event) => { dispatch(actions.enterTags(event.target.value)) },
  enterSearch: (event) => { dispatch(actions.enterSearch(event.target.value)) },

  // snippet related
  createSnippet: () => { dispatch(actions.createSnippet()) },
  deleteSnippet: () => { dispatch(actions.deleteSnippet()) },
  getSnippetsByUser: (username) => { dispatch(actions.getSnippetsByUser(username)) },
  getSnippetsMineOnly: () => { dispatch(actions.getSnippetsMineOnly()) },
  getSnippetsByTag: (tag) => { dispatch(actions.getSnippetsByTag(tag)) },

  // trie related
  trieInsert: () => { dispatch(actions.trieInsert()) },
  trieFind: () => { dispatch(actions.trieFind()) },
  trieFindChildren: (event) => { dispatch(actions.trieFindChildren(event)) },

  // getTagsFromDB: () => { dispatch(actions.getTagsFromDB()) },

})

class HomeContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getSnippetsMineOnly()
  };

  render() {

    const { trieFindChildren, getSnippetsMineOnly, userSnippets, userInfo, snippet, comments, project, tags, search, recievedSnippets, userLogout, enterSnippet, enterComments, enterProject, enterTags, enterSearch, deleteSnippet, getSnippetsByUser, getSnippetsByTag, createSnippet } = this.props;

    return (
      <React.Fragment>
        <div className='container'>
          <div className='main'>
            <AddSnip

              enterSnippet={enterSnippet}
              enterComments={enterComments}
              enterProject={enterProject}
              enterTags={enterTags}
              
              snippet={snippet}
              comments={comments}
              project={project}
              tags={tags}

              createSnippet={createSnippet}

            />
          </div>
          <SideBar
            username={userInfo.username}
            enterSearch={enterSearch}
            serach={search}
            userSnippets={userSnippets}
            getSnippetsByUser={getSnippetsByUser}
            trieFindChildren={trieFindChildren}
          />
        </div>

      </React.Fragment>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
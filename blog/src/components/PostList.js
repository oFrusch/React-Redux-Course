import React from "react";
import { connect } from "react-redux";
import { fetchPosts, fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPostsAndUsers();
  }

  renderList() {
    return this.props.posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  return { posts: state.posts };
};

// When this component 'mounts' (componentDidMount()), it will calls fetchPostsAndUsers()
// This is an action creator that will immediately grab every post and all the unique users from the posts
// The state/store will be updated with all this information and it will be available as props wherever
// connect is called
export default connect(
  mapStateToProps,
  { fetchPostsAndUsers }
)(PostList);

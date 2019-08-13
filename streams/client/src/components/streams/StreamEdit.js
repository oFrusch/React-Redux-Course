import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>;
    }
    return (
      // in initialValues we pass this.props.stream because this has the "title" and "description" fields stored
      // in the stream object. initialValues will pull these fields out of the object and inject their values
      // into the fields with name "title" and "desciption" in StreamForm
      <div>
        <h3>Edit {this.props.stream.title}</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// ownProps is the normal props passed between react components
// can pass both state and ownProps to mapState to props
// this allows the component to access the state and any props passed by
// another component
const mapStateToProps = (state, ownProps) => {
  // match.params.id is from the URL
  // the :id in our editStream route declares whatever is put there
  // as a variable in DOM that can be accessed as props
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);

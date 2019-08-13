import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamForm extends React.Component {
  // destructure error and touched from meta
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // destructuring { input } from formProps - formProps is passed down to renderInput as props from <Field>,
  // <Field> is passed props from reduxForm (<Field> is a component from the redux form library)

  // meta is information passed down from the object returned by our validate function
  // aka error messages (or the lack there of)
  renderInput = ({ input, label, meta }) => {
    // takes entire input props (from reduxForm at bottom) and adds them as key value pairs (props) to <input>
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    // pass a different onSubmit function down via props from one of the components which uses StreamForm
    this.props.onSubmit(formValues);
  };

  render() {
    // component= passes down all other props to that input
    // so name and label are passed down to renderInput
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

// const mapStateToProps = () => {
//   stream: null;
// };
export default reduxForm({
  form: "streamForm",
  // this is really a key of 'validate' with a value of our 'validate' function
  // fully syntax is "validate: validate" but could be something like "validateInput: validate"
  validate
})(StreamForm);

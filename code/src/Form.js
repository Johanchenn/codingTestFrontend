import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  errorMessage: {
    //marginTop: "15px"
  },
  formWrapper: {
    margin: "50px 0 0 50px"
  },

  inputFieldWrapper: {
    display: "flex",
    flexDirection: "column"
  },

  inputFieldContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "20px"
  },

  inputFieldContainerInputField: {
    margin: "10px 25px 0 0",
    minWidth: "330px"
  },

  submitButton: {
    marginTop: "25px"
  }
});

export default function Form() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async data => {
    //requirement in the post request from code test server to set an attribute called 'applicant': xxx
    data.applicant = `${data.name}`;

    fetch("http://localhost:4000/submit/request", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "access-control-allow-credentials": "true"
      }),
      body: JSON.stringify(data),
      mode: "cors",
      credentials: "include"
    }).then(response => {
      console.log("resp", response);
    });
  };

  const [success, setSuccess] = useState(false);

  const classes = useStyles();

  return (
    <Container className={classes.formWrapper} maxWidth="sm">
      <h3>Welcome to Nettbureau's short little form!</h3>
      <p>
        Please fill in your contact information in the form below and hit the
        submit button
      </p>
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <div className={classes.inputFieldWrapper}>
          <div className={classes.inputFieldContainer}>
            <div className={classes.inputFieldWrapper}>
              <TextField
                placeholder="Name"
                name="name"
                inputRef={register({ required: true, maxLength: 20 })}
                className={classes.inputFieldContainerInputField}
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className={classes.errorMessage}>
                  Name is required, please enter a name of maximum 20 characters
                </span>
              )}
            </div>

            <div className={classes.inputFieldWrapper}>
              <TextField
                placeholder="Email"
                name="email"
                defaultValue=""
                inputRef={register({ pattern: /\S+@\S+\.\S+/, required: true })}
                className={classes.inputFieldContainerInputField}
              />
              {/* errors will return when field validation fails  */}
              {errors.email && (
                <span className={classes.errorMessage}>
                  Email is required, potentially wrong format for email, please
                  enter email in format: example@domain.com
                </span>
              )}
            </div>
          </div>

          <div className={classes.inputFieldContainer}>
            <div className={classes.inputFieldWrapper}>
              <TextField
                placeholder="Phone"
                name="phone"
                defaultValue=""
                inputRef={register({ pattern: /^\d+$/, required: true })}
                className={classes.inputFieldContainerInputField}
              />
              {errors.phone && (
                <span className={classes.errorMessage}>
                  Phone is required, potentially wrong format for phone, please
                  only enter digits
                </span>
              )}
            </div>
            <div className={classes.inputFieldWrapper}>
              <TextField
                placeholder="Postal code"
                name="postalCode"
                defaultValue=""
                inputRef={register({ pattern: /^\d+$/, maxLength: 5 })}
                className={classes.inputFieldContainerInputField}
              />
              {errors.postalCode && (
                <span className={classes.errorMessage}>
                  Wrong format for postalCode, valid format is for example
                  '17062'
                </span>
              )}
            </div>
          </div>
          <div className={classes.inputFieldWrapper}>
            <div className={classes.inputFieldWrapper}>
              <TextField
                placeholder="Comment"
                name="comment"
                defaultValue=""
                inputRef={register}
                className={classes.inputFieldContainerInputField}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
          onClick={() => setSuccess(true)}
        >
          Submit
        </Button>
        {success ? (
          <p>Thanks for submitting your information to Nettbureau!</p>
        ) : (
          ""
        )}
      </form>
    </Container>
  );
}

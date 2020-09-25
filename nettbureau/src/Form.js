import React from "react";
import styles from "./Form.css";
import { useForm } from "react-hook-form";
import { Container, TextField, Button } from "@material-ui/core";

export default function Form() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("examples"));

  return (
    <Container className="styles.form-wrapper" maxWidth="sm">
      <h3>Welcome to Nettbureau's short little form!</h3>
      <p>
        Please fill in your contact information in the form below and hit the
        submit button
      </p>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <div className="styles.input-field-wrapper">
          <div className="styles.input-field-container">
            <TextField
              placeholder="Name"
              name="name"
              inputRef={register({ required: true })}
              className="styles.input-field-container__input-field"
            />
            {/* errors will return when field validation fails  */}
            {errors.name && <span>This field is required</span>}
            <TextField
              placeholder="Email"
              name="email"
              defaultValue=""
              inputRef={register}
              className="styles.input-field-container__input-field"
            />
          </div>

          <div className="styles.input-field-container">
            <TextField
              placeholder="Phone"
              name="phone"
              defaultValue=""
              inputRef={register}
              className="styles.input-field-container__input-field"
            />
            <TextField
              placeholder="Postal code"
              name="postalCode"
              defaultValue=""
              inputRef={register}
              className="styles.input-field-container__input-field"
            />
          </div>
          <div className="styles.input-field-container">
            <TextField
              placeholder="Comment"
              name="comment"
              defaultValue=""
              inputRef={register}
              className="styles.input-field-container__input-field"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="styles.submit-button"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

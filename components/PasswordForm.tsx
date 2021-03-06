import { FC } from "react"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import { Button, Typography } from "@material-ui/core"

import useStyles from "../styles"

export interface Values {
  password: string
  passwordConfirmation: string
}

interface PasswordFormProps {
  onSubmit(values: Values): void
}

const PasswordForm: FC<PasswordFormProps> = ({ onSubmit }) => {
  const classes = useStyles()

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirmation: "",
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        onSubmit(values)
        setSubmitting(false)
      }}
      validate={(values) => {
        const errors: Partial<Values> = {}

        if (!values.password) {
          errors.password = "Required"
        } else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters"
        }

        if (values.password !== values.passwordConfirmation) {
          errors.passwordConfirmation = "Does not match password"
        }

        return errors
      }}
    >
      <Form className={classes.form}>
        <Typography variant="h3">Change your password</Typography>
        <Field
          name="password"
          type="password"
          label="New password"
          component={TextField}
        />
        <Field
          name="passwordConfirmation"
          type="password"
          label="Confirm your new password"
          component={TextField}
        />
        <Button type="submit" variant="contained" color="primary">
          Create a new password
        </Button>
      </Form>
    </Formik>
  )
}

export default PasswordForm

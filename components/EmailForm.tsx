import { FC } from "react"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import { Button, Typography } from "@material-ui/core"

import useStyles from "../styles"

export interface Values {
  email: string
}

interface EmailFormProps {
  onSubmit(values: Values): void
}

const EmailForm: FC<EmailFormProps> = ({ onSubmit }) => {
  const classes = useStyles()

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        onSubmit(values)
        setSubmitting(false)
      }}
      validate={(values) => {
        const errors: Partial<Values> = {}

        if (!values.email) {
          errors.email = "Required"
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address"
        }

        return errors
      }}
    >
      <Form className={classes.form}>
        <Typography variant="h3">Forgot your password?</Typography>
        <Field name="email" type="email" label="Email" component={TextField} />
        <Button type="submit" variant="contained" color="primary">
          Send me password reset instructions
        </Button>
      </Form>
    </Formik>
  )
}

export default EmailForm

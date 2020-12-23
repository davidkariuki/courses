import { FC } from "react"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import { Button, Typography } from "@material-ui/core"

import useStyles from "../styles"

interface Values {
  email: string
}

const ResetPasswordForm: FC = () => {
  const classes = useStyles()

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        fetch("/api/auth/passwords", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(values),
        })
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
        <Typography variant="h4">Forgot your password?</Typography>
        <Field name="email" type="email" label="Email" component={TextField} />
        <Button type="submit" variant="contained" color="primary">
          Send me password reset instructions
        </Button>
      </Form>
    </Formik>
  )
}

export default ResetPasswordForm

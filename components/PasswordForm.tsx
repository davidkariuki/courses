import { FC } from "react"
import { useRouter } from "next/router"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import { Button, Typography } from "@material-ui/core"

import useStyles from "../styles"

interface Values {
  password: string
  passwordConfirmation: string
}

const PasswordForm: FC = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirmation: "",
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        fetch("/api/auth/passwords", {
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
          body: JSON.stringify({
            password: values.password,
            code: router.query.code,
          }),
        })
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
        <Typography variant="h4">Change your password</Typography>
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

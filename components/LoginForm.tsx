import { FC } from "react"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import { Button, Typography, Link } from "@material-ui/core"
import NextLink from "next/link"

import useStyles from "../styles"

export interface Values {
  email: string
  password: string
}

interface LoginFormProps {
  onSubmit(values: Values): void
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const classes = useStyles()

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
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

        if (!values.password) {
          errors.password = "Required"
        } else if (values.password.length < 6) {
          errors.password = "Password must at least 6 characters"
        }

        return errors
      }}
    >
      <Form className={classes.form}>
        <Typography variant="h3">Sign in</Typography>
        <Field name="email" type="email" label="Email" component={TextField} />
        <Field
          name="password"
          type="password"
          label="Password"
          component={TextField}
        />
        <Button type="submit" variant="contained" color="primary">
          Sign in
        </Button>
        <NextLink href="/auth/passwords/reset" passHref>
          <Link>
            <b>Forgot your password?</b>
          </Link>
        </NextLink>
      </Form>
    </Formik>
  )
}

export default LoginForm

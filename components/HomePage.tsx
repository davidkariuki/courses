import React, { FC } from "react"

import { Course } from "../models/course"
import {
  Card,
  CardActionArea,
  CardContent,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    title: {
      marginTop: theme.spacing(2),
    },
    divider: {
      marginBottom: theme.spacing(2),
    },
    card: {
      [theme.breakpoints.up("sm")]: {
        minHeight: theme.spacing(20),
      },
    },
  })
)

interface Props {
  courses: Course[]
}

const HomePage: FC<Props> = ({ courses }) => {
  const classes = useStyles()

  return (
    <>
      <Typography className={classes.title} variant="h6">
        Your Courses
      </Typography>
      <Grid container spacing={3} className={classes.grid}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} key={course.courseId}>
            <Card>
              <CardActionArea>
                <CardContent className={classes.card}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.title}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {course.headline}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default HomePage

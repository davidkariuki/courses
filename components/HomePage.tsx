import React, { FC } from "react"

import { Course } from "../models/course"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: "1rem",
    },
    margins: {
      margin: theme.spacing(2),
    },
    gridList: {},
    image: {
      height: 280,
      backgroundSize: "contain",
      backgroundOrigin: "content-box",
      padding: "0 1rem",
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
      <Typography className={classes.title} variant="h3">
        Your Courses
      </Typography>
      <div className={classes.margins}>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} key={course.courseId}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    className={classes.image}
                    image={course.images.cover || "/logo-full.svg"}
                    title={course.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.title}
                    </Typography>
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
      </div>
    </>
  )
}

export default HomePage

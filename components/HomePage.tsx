import React, { FC } from "react"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginTop: "1rem",
    },
    margins: {
      margin: "2rem 0",
    },
    gridList: {},
    image: {
      height: 280,
    },
  })
)

const HomePage: FC = () => {
  const classes = useStyles()

  const courses = [
    {
      id: 1,
      title: "Make-up: Mastered",
      cover:
        "https://d2osrjirua6dno.cloudfront.net/uploads/course/cover_image/34/wide_thumb_course-val.jpg",
      summary:
        "The inside track on how to get ahead as a make-up artist in the fashion industry.  ",
    },
    {
      id: 2,
      title: "Nails Mastered: Creativity",
      cover:
        "https://d2osrjirua6dno.cloudfront.net/uploads/course/cover_image/35/wide_thumb_nails.jpg",
      summary:
        "A unique 12-week online program led by Marian Newman to help you create your best nails work and get it out there",
    },
    {
      id: 3,
      title: "Fashion Design with Parsons",
      cover:
        "https://d2osrjirua6dno.cloudfront.net/uploads/course/cover_image/37/wide_thumb_hero-images-template.jpg",
      summary:
        "Train in fashion design with New York's premier fashion institution",
    },
  ]

  return (
    <>
      <Typography className={classes.title} variant="h3">
        Your Courses
      </Typography>
      <div className={classes.margins}>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} key={course.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    className={classes.image}
                    image={course.cover}
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
                      {course.summary}
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

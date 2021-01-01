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
      height: 140,
    },
  })
)

const HomePage: FC = () => {
  const classes = useStyles()

  const courses = [
    {
      id: 1,
      title: "Master surface embellishment",
      cover:
        "https://d2osrjirua6dno.cloudfront.net/uploads/course/cover_image/34/wide_thumb_course-val.jpg",
      author: "Karen Nicol",
      summary:
        "Learn couture embellishment design and techniques to a professional standard.",
    },
    {
      id: 2,
      title: "Tambour Beading",
      cover:
        "https://d2osrjirua6dno.cloudfront.net/uploads/course/cover_image/35/wide_thumb_nails.jpg",
      author: "Miss Piggy von Bacon",
      summary:
        "Amet laboriosam possimus laboriosam nulla fugit? Id quas magnam quos necessitatibus est tempore. Quae fuga amet adipisicing vel voluptates Odio exercitationem eveniet velit amet animi quis sed. Tempore nam et?",
    },
    {
      id: 3,
      title: "Fashion Design with Parsons",
      cover:
        "https://d2osrjirua6dno.cloudfront.net/uploads/course/cover_image/37/wide_thumb_hero-images-template.jpg",
      author: "Duke Le'Coat",
      summary:
        "Parsons has trained everyone from Marc Jacobs and Donna Karen to Jason Wu and Anna Sui. In this unique collaboration with Mastered, the New York school has devised a three-month online course in fashion design to help designers develop and refine their creative process and create more exciting and innovative designs. Places are limited: register your interest now.",
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
            <Grid item xs={12} key={course.id}>
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

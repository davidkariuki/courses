import { makeStyles, createStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      width: "100%",
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
      flexDirection: "column",
      "& > *": {
        margin: theme.spacing(2),
        width: "100%",
      },
    },
  })
)

export default useStyles

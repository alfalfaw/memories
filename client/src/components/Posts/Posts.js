import React, { Fragment } from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
const Posts = ({ setCurrentId }) => {
  const classes = useStyles()
  const posts = useSelector((state) => state.posts)

  return !posts.length ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post setCurrentId={setCurrentId} post={post}></Post>
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts

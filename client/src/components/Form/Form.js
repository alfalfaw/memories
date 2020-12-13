import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/posts'
import { useDispatch, useSelector } from 'react-redux'
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles()
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null))

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })
  const dispatch = useDispatch()

  const clear = () => {
    setCurrentId(null)
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }
  // post 发生变化时执行
  useEffect(() => {
    if (post) setPostData(post)
  }, [post])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData))
    }
    clear()
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="false" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>

        <TextField
          name="creator"
          variant="outlined"
          label="creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({
              ...postData,
              creator: e.target.value
            })
          }
        ></TextField>

        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) =>
            setPostData({
              ...postData,
              title: e.target.value
            })
          }
        ></TextField>

        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({
              ...postData,
              message: e.target.value
            })
          }
        ></TextField>

        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(',')
            })
          }
        ></TextField>

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({
                ...postData,
                selectedFile: base64
              })
            }
          ></FileBase>
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="medium"
          type="submit"
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Button variant="contained" color="secondary" size="medium" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
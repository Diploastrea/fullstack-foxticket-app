/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import validator from 'validator';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import addNews from '../service/addNewsService';
import editNews from '../service/editNewsService';
import articlesData from '../service/articlesService';
import deleteNews from '../service/deleteNewsService';

function AdminNews() {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modifyNews, setModifyNews] = useState(false);

  function setArticleShow(articleId) {
    const article = data.find((element) => element.id === articleId);
    if (!article.show) {
      setShow(true);
      article.show = true;
    } else {
      setShow(false);
      article.show = false;
    }
    setData(data);
  }

  useEffect(() => {
    articlesData(50).then((articles) => setData(articles));
  }, []);

  data.map((element) => element = { ...element, show: false });

  const handleAddNews = (e) => {
    e.preventDefault();
    if (validator.isEmpty(content) && validator.isEmpty(title)) {
      setShowError(true);
      setErrorMessage('Both fields are required.');
      return;
    } if (validator.isEmpty(title)) {
      setShowError(true);
      setErrorMessage('Title is required.');
      return;
    } if (validator.isEmpty(content)) {
      setShowError(true);
      setErrorMessage('Content is required.');
      return;
    }
    addNews(title, content, setErrorMessage, setShowError, navigate);
  };

  const handleEditNews = (e) => {
    e.preventDefault();
    if (validator.isEmpty(content) && validator.isEmpty(title)) {
      setShowError(true);
      setErrorMessage('Both fields are required.');
      return;
    } if (validator.isEmpty(title)) {
      setShowError(true);
      setErrorMessage('Title is required.');
      return;
    } if (validator.isEmpty(content)) {
      setShowError(true);
      setErrorMessage('Content is required.');
      return;
    }
    editNews(id, title, content, setErrorMessage, setShowError, navigate);
  };

  const handleDeleteClick = (e) => {
    deleteNews(e);
  };

  const handleTitleClick = (e) => {
    setTitle(e);
  };

  const handleIdClick = (e) => {
    setId(e);
  };

  const handleContentClick = (e) => {
    setContent(e);
    setModifyNews(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <div>
        <Container align="center" maxWidth="xs">
          {showError && (
            <Alert data-testid="error_message" severity="error" variant="filled">
              <AlertTitle align="center">{errorMessage}</AlertTitle>
            </Alert>
          )}
          <br />
        </Container>
        <Container maxWidth="xs">
          <Typography align="center" component="span">
            {!modifyNews ? (
              <form onSubmit={handleAddNews}>
                <TextField
                  variant="outlined"
                  type="text"
                  name="Content"
                  label="Content"
                  fullWidth
                  multiline
                  minRows={4}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
                <br />
                <TextField
                  variant="outlined"
                  type="text"
                  name="Title"
                  label="Title"
                  margin="dense"
                  inputProps={{ style: { textAlign: 'center' } }}
                  fullWidth
                  multiline
                  maxRows={2}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <br />
                <Button
                  data-testid="addNews"
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="medium"
                  title="Create new article"
                >
                  add News
                </Button>
              </form>
            ) : (
              <form onSubmit={handleEditNews}>
                <TextField
                  variant="outlined"
                  type="text"
                  name="Content"
                  label="Content"
                  fullWidth
                  multiline
                  minRows={4}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
                <br />
                <TextField
                  variant="outlined"
                  type="text"
                  name="Title"
                  label="Title"
                  margin="dense"
                  inputProps={{ style: { textAlign: 'center' } }}
                  fullWidth
                  multiline
                  maxRows={2}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <br />
                <Button
                  data-testid="addNews"
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="medium"
                  title="Edit the article"
                >
                  Edit News
                </Button>
              </form>
            )}
          </Typography>
        </Container>
      </div>
      { data[0] ? (
        <Grid container spacing={5} marginTop={3}>
          <>
            {data.map((article) => (
              <Grid
                item
                xs={4}
                key={article.id}
              >
                <Paper
                  sx={{ padding: 0, background: 'lightgrey' }}
                  elevation={7}
                  onMouseOver={() => {
                    setArticleShow(article.id);
                  }}
                  onMouseOut={() => {
                    setArticleShow(article.id);
                  }}
                >
                  {show && article.show && (
                  <>
                    <Button
                      value={article.id}
                      title="Delete"
                      sx={{ fontSize: 40 }}
                      onClick={(e) => handleDeleteClick(e.currentTarget.value)}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      value={article.content}
                      title={article.title}
                      id={article.id}
                      sx={{ fontSize: 40 }}
                      onClick={(e) => {
                        handleTitleClick(e.currentTarget.title);
                        handleContentClick(e.currentTarget.value);
                        handleIdClick(e.currentTarget.id);
                      }}
                    >
                      <EditIcon />
                    </Button>

                  </>
                  )}
                  <Paper sx={{ padding: 1, opacity: 0.9 }}>
                    <Typography variant="outlined" component="span">
                      {article.content}
                    </Typography>
                  </Paper>
                  <Paper sx={{ background: 'lightgrey' }}>
                    <Typography variant="h6" align="center" fontWeight="bold">
                      {article.title}
                    </Typography>
                  </Paper>
                </Paper>
              </Grid>
            ))}
          </>
        </Grid>
      ) : (
        <div> </div>
      )}
    </Container>
  );
}

export default AdminNews;

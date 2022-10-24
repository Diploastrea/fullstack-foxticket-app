import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import deleteNews from '../service/deleteNewsService';

export default function SingleArticle({ allArticles }) {
  const [show, setShow] = useState(false);
  const handleClick = (e) => {
    deleteNews(e);
  };
  return (
    <>
      {allArticles.map((article) => (
        <Grid
          item
          xs={4}
          key={article.id}
          onMouseOver={() => setShow(true)}
          onMouseOut={() => setShow(false)}
        >
          {show && (
          <>
            <Button
              value={article.id}
              title="Delete"
              sx={{ fontSize: 40 }}
              onClick={(e) => handleClick(e.currentTarget.value)}
            >
              <DeleteIcon />
            </Button>
            <Button
              value={article.id}
              title="Edit"
              sx={{ fontSize: 40 }}
              onClick={(e) => handleClick(e.currentTarget.value)}
            >
              <EditIcon />
            </Button>

          </>
          )}
          <Paper sx={{ padding: 0, background: 'lightgrey' }} elevation={7}>
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
  );
}

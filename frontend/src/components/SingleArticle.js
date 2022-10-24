import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function SingleArticle({ allArticles }) {
  return (
    <>
      {allArticles.map((article) => (
        <Grid item xs={4} key={article.id}>
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

import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SingleArticle from '../components/SingleArticle';
import articlesData from '../service/articlesService';

function Landing() {
  const [data, setData] = useState([]);
  useEffect(() => {
    articlesData(50).then((articles) => setData(articles));
  }, []);
  return (
    <Container>
      <Grid container spacing={6} marginTop={3}>
        <SingleArticle allArticles={data} />
      </Grid>
    </Container>
  );
}

export default Landing;

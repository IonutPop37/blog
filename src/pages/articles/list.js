import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, Button, Grid } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';

const ListArticles = () => {
  const [articles, setArticles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/articles?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete article');
      }

      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lista articolelor
        </Typography>
        <Box>
          <List>
            {articles.map((article) => (
              <Paper key={article.id} elevation={3} style={{ marginBottom: '1rem', padding: '1rem' }}>
                <ListItem>
                  <ListItemText
                    primary={<Typography variant="h6" component="span" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{article.title}</Typography>}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {truncateText(article.description, 550)}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="textSecondary">
                          Autor: {article.autor}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={() => router.push(`/articles/${article.id}`)}>
                      Citeste mai mult
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(article.id)}>
                      Sterge
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </List>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default ListArticles;

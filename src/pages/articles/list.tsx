import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, Button, Grid } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';

// Define the type for an article
interface Article {
  id: number;
  title: string;
  description: string;
  autor: string; 
}

// Define the props type for the component
interface ListArticlesProps {
  articles: Article[];
}

const ListArticles: React.FC<ListArticlesProps> = ({ articles }) => {
  const router = useRouter();

  // Handle deleting an article by its ID
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete article');
      }

      router.replace(router.asPath); // Refresh the data after deletion
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Truncate the text to a specified maximum length
  const truncateText = (text: string, maxLength: number) => {
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
                          {truncateText(article.description, 150)}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="textSecondary">
                          Autor: {article.autor}
                        </Typography>
                        <Typography component="span" variant="body2" color="textSecondary">
                          ID: {article.id}
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

// Fetch the list of articles on the server side and pass it as props to the component
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/articles');
  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};

export default ListArticles;

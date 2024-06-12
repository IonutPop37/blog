import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';

const NewArticle = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ title, description, author });

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, author }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to create article', errorText);
        throw new Error('Failed to create article');
      }

      const data = await res.json();
      console.log('Article created', data);
      router.push('/articles/list');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Creaza un articol nou:
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Titlu articol blog..."
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Descriere articol blog..."
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="author-label">Autorul articolului...</InputLabel>
            <Select
              labelId="author-label"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            >
              <MenuItem value="test 1">Test 1</MenuItem>
              <MenuItem value="test 2">Test 2</MenuItem>
            </Select>
          </FormControl>
          {error && (
            <Typography color="error" variant="body2" style={{ marginTop: '1rem' }}>
              {error}
            </Typography>
          )}
          <Box style={{ marginTop: '1rem' }}>
            <Button type="submit" variant="contained" color="primary">
              Posteaza
            </Button>
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default NewArticle;

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { Container, Typography } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';

// Define the type for the article prop
interface Article {
  id: number;
  title: string;
  description: string;
  autor: string; 
}

// Define the props type for the component
interface ArticleDetailsProps {
  article: Article | null;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <DashboardLayout><div>Loading...</div></DashboardLayout>;
  }

  if (!article) {
    return <DashboardLayout><div>Article not found</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {article.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Autor: {article.autor}
        </Typography>
      </Container>
    </DashboardLayout>
  );
};

// Fetch all article paths for static generation
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/api/articles', { method: 'GET' });
  const articles: Article[] = await res.json();

  const paths = articles.map((article) => ({
    params: { id: article.id.toString() },
  }));

  return { paths, fallback: true };
};

// Fetch a single article based on the ID for static generation
export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const res = await fetch(`http://localhost:3001/api/articles/${params?.id}`, { method: 'GET' });

  if (res.status === 404) {
    return {
      notFound: true,
    };
  }

  const article: Article = await res.json();

  return {
    props: {
      article,
    },
    revalidate: 10, // Re-generate the page at most once per 10 seconds
  };
};

export default ArticleDetails;

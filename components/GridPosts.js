import { Grid, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addBaseFetchUrl, endPointHandler } from '~/helper/urlHelper';
import Post from './Post';

const useStyles = makeStyles({
  '@keyframes loadingAnime': {
    '0%': {
      width: '50%',
    },
    '100%': {
      width: '100%',
    },
  },
  loading: {
    position: 'fixed',
    top: 0,
    width: '50%',
    height: 3,
    backgroundColor: 'red',
    animationName: 'loadingAnime',
    animationDuration: '0.01s',
  },
});

const GridPosts = ({ initPosts, pagination, xs = 4 }) => {
  const classes = useStyles();
  const [posts, setPosts] = useState(initPosts);
  const [loadingClass, setLoadingClass] = useState('');
  const router = useRouter();
  const tagId = router.query.tag;

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setLoadingClass(classes.loading);
    });
    router.events.on('routeChangeComplete', () => setLoadingClass(''));
  }, []);

  const paginationHandler = (e, page) => {
    const pathname = tagId ? '/tag/' : '/';
    const query = tagId ? { page, tag: tagId } : { page };
    router.push({
      pathname,
      query,
    });
  };

  useEffect(() => {
    const endPoint = endPointHandler(router.query);
    fetch(addBaseFetchUrl(endPoint))
      .then((res) => res.json())
      .then(({ posts }) => {
        setPosts(posts);
      })
      .catch(console.error);
  }, [router.asPath]);

  return (
    <>
      <div style={{ width: '100%' }}>
        <div className={loadingClass}></div>
      </div>
      <Grid>
        <Grid
          container
          spacing={2}
          style={{ direction: 'rtl', width: '100%', marginLeft: 20 }}
        >
          {posts.map((post) => (
            <Grid item xs={xs} key={post.id}>
              <Link
                href={{
                  pathname: `/post/${post.id}`,
                }}
              >
                <a>
                  <Post post={post} />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Pagination onChange={paginationHandler} count={pagination.totalPage} />
      </Grid>
    </>
  );
};

export default GridPosts;

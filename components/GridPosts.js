import { Grid, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
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

const GridPosts = ({ initPosts, pagination,tag ,xs = 4 }) => {
  const classes = useStyles();
  const [loadingClass, setLoadingClass] = useState('');
  const router = useRouter();

  const paginationHandler = (e, page) => {
    const pathname = tag ? `/tag/${tag}` : '/';
    const query = { page };
    router.push({
      pathname,
      query,
    });
  };

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
          {initPosts.map((post) => (
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

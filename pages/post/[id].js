import { useRouter } from 'next/router';
import React from 'react';
import { addBaseFetchUrl, cdnHandler } from '../../helper/urlHelper';
import { makeStyles, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    direction: 'rtl',
    '& img': {
      width: '100%',
    },
  },
  content: {
    direction: 'rtl',
    width: '48vw',
    marginRight: 155,
    border: '1px solid lightgray',
  },
  passage: {
    width: '100%',
    padding: 10,
  },
});

const PostDetail = ({ data }) => {
  const classes = useStyles();
  const { cover, title, content, tags } = data;
  const router = useRouter();

  const tagClickHandler = (id) => {
    router.push({
      pathname: '/tag/',
      query: {
        tag: id,
      },
    });
  };

  return (
    <div className={classes.root}>
      <Typography
        variant={'h5'}
        style={{
          marginRight: 155,
        }}
      >
        {title}
      </Typography>
      <div className={classes.content}>
        <img src={cdnHandler(cover)} />
        <div
          className={classes.passage}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {tags.map((tag) => (
          <Button onClick={() => tagClickHandler(tag.id)}>{tag.name}</Button>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const res = await fetch(addBaseFetchUrl(id));
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

export default PostDetail;

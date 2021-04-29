import { Typography } from '@material-ui/core';
import React from 'react';
import { cdnHandler } from '../helper/urlHelper';

const Post = ({ post }) => {
  const { title, cover } = post;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        margin: 20,
      }}
    >
      <img
        src={cdnHandler(cover)}
        alt=''
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          width: '100%',
          height: '30px',
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,.5)',
          textAlign: 'right',
        }}
      >
        <Typography
          style={{
            color: 'white',
          }}
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default Post;

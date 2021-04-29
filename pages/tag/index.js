import React from 'react';
import {
  addBaseFetchUrl,
  cdnHandler,
  endPointHandler,
} from '../../helper/urlHelper';
import GridPosts from '../../components/GridPosts';

const TagPage = (props) => {
  return <GridPosts {...props} xs={3} />;
};

export default TagPage;

export const getServerSideProps = async (ctx) => {
  const endPoint = endPointHandler(ctx.query);
  const res = await fetch(addBaseFetchUrl(endPoint));
  const { posts: initPosts, pagination } = await res.json();
  return {
    props: {
      initPosts,
      pagination,
    },
  };
};

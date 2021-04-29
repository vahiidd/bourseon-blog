import React from 'react';
import GridPosts from '~/components/GridPosts';
import { addBaseFetchUrl, endPointHandler } from '~/helper/urlHelper';

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
      title: 'tag-posts',
    },
  };
};

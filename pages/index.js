import SearchBar from '~/components/SearchBar';
import GridPosts from '~/components/GridPosts';
import { addBaseFetchUrl, endPointHandler } from '../helper/urlHelper';

export default function Home(props) {
  return <GridPosts {...props} />;
}

export const getServerSideProps = async (ctx) => {
  const endPoint = endPointHandler(ctx.query);
  const res = await fetch(addBaseFetchUrl(endPoint));
  const { posts: initPosts, pagination } = await res.json();

  return {
    props: {
      initPosts,
      pagination,
      title: 'myblog',
    },
  };
};

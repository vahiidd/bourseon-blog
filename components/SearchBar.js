import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import { addBaseFetchUrl, addBaseSearchFetchUrl } from '~/helper/urlHelper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchBar = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const searchFetch = async (search) => {
    if (!search) {
      setPosts([]);
      setTags([]);
      return;
    }
    const res = await fetch(addBaseSearchFetchUrl(search));
    const { postsResult, tagsResult } = await res.json();
    setPosts(postsResult.posts);
    setTags(tagsResult);
  };

  useEffect(() => {
    searchFetch(input);
  }, [input]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const changeHanldeSearch = (e, value) => {
    router.push({
      pathname: `${value.title ? `/post/[id]` : `/tag/[tagId]`}`,
      query: {
        ...(value.title ? { id: value.id } : { tagId: value.id }),
      },
    });
  };

  return (
    <Autocomplete
      freeSolo
      id='free-solo-2-demo'
      disableClearable
      options={[...posts, ...tags]}
      onChange={changeHanldeSearch}
      getOptionLabel={(option) => option?.title || option?.name}
      renderInput={(params) => (
        <TextField
          value={input}
          onChange={({ target }) => {
            setInput(target.value);
          }}
          {...params}
          label='Search input'
          margin='normal'
          variant='outlined'
          InputProps={{ ...params.InputProps, type: 'search' }}
        />
      )}
    />

    // <form onSubmit={submitHandler}>
    //   <Button type='submit'>
    //     <SearchIcon />
    //   </Button>
    //   <TextField
    //     value={input}
    //     onChange={({ target }) => {
    //       setInput(target.value);
    //     }}
    //   />
    // </form>
  );
};

export default SearchBar;

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import { addBaseFetchUrl, addBaseSearchFetchUrl } from '~/helper/urlHelper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useDebounce from '~/helper/use-debounce';

const SearchBar = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const debounceSearchTerm = useDebounce(input, 500);

  const searchFetch = async (searchTerm) => {
    if (!searchTerm) {
      setPosts([]);
      setTags([]);
      return;
    }
    const res = await fetch(addBaseSearchFetchUrl(searchTerm));
    const { postsResult, tagsResult } = await res.json();
    setPosts(postsResult.posts);
    setTags(tagsResult);
  };

  useEffect(() => {
    searchFetch(debounceSearchTerm);
  }, [debounceSearchTerm]);

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

  const postsOptions = posts.map((post) => ({ groupName: 'پست ها', ...post }));
  const tagsOptions = tags.map((tag) => ({ groupName: '#تگ ها', ...tag }));

  return (
    <Autocomplete
      freeSolo
      id='free-solo-2-demo'
      disableClearable
      options={[...postsOptions, ...tagsOptions]}
      onChange={changeHanldeSearch}
      getOptionLabel={(option) => option?.title || `#${option?.name}`}
      groupBy={(option) => option.groupName}
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

import { useState, useEffect, type ChangeEvent } from 'react';
import { debounce } from 'lodash-es';

import { useSearchTerm } from '../../lib/hooks';

import css from './index.module.css';

export const SearchTermInput = () => {
  const { searchTerm, setSearchTerm } = useSearchTerm();
  const [inputValue, setInputValue] = useState(searchTerm);

  const debouncedSetSearchTerm = debounce(setSearchTerm, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    debouncedSetSearchTerm(inputValue);

    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [inputValue, debouncedSetSearchTerm]);

  return (
    <>
      <label htmlFor="search-input" className={'visuallyHidden'}>
        Search menu items
      </label>
      <input
        id="search-input"
        className={css.input}
        type="search"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
      />
    </>
  );
};

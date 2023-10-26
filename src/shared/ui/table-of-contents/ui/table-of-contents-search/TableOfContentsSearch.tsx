import { useState, useEffect } from 'react';
import { debounce } from 'lodash-es';

import { useSearchTerm } from '../../lib/hooks';

import style from './index.module.css';

export const TableOfContentsSearch = () => {
  const { searchTerm, setSearchTerm } = useSearchTerm();
  const [inputValue, setInputValue] = useState(searchTerm);

  const debouncedSetSearchTerm = debounce(setSearchTerm, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <input
      className={style.input}
      type="text"
      placeholder="Search..."
      value={inputValue}
      onChange={handleChange}
    />
  );
};

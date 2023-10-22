import { useSearchTerm } from '../active-path-provider/ActivePathProvider';

import style from './index.module.css';

export const TableOfContentsSearch = () => {
  const { searchTerm, setSearchTerm } = useSearchTerm();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLocaleLowerCase());
  };

  return (
    <input
      className={style.input}
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

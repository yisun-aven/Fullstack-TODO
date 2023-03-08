import React from 'react';
import { FaSearch } from 'react-icons/fa';

type FeatureBarProps = {
  sortByDate: boolean;
  sortByPriority: boolean;
  handleSortDefault: () => void;
  handleSortDateClick: () => void;
  handleSortPriorityClick: () => void;
  handleFindSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleFindTodoInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  findTodoInput: string;
}

function FeatureBar({
  sortByDate,
  sortByPriority,
  handleSortDefault,
  handleSortDateClick,
  handleSortPriorityClick,
  handleFindSubmit,
  handleFindTodoInputChange,
  findTodoInput,}: FeatureBarProps) {
    return (
    <div>
      <div className="wrapper-fillter">
        <div className={(sortByDate ? "date" : sortByPriority ? "priority" : "default")}>
          <div className="sort-by-default" onClick={handleSortDefault}><h6>Sort Entered</h6></div>
          <div className="sort-by-date" onClick={handleSortDateClick}><h6>Sort Date</h6></div>
          <div className="sort-by-priority" onClick={handleSortPriorityClick}><h6>Sort Priority</h6></div>
        </div>
      </div>

      <div className="wrapper-find">
        <form onSubmit={handleFindSubmit}>
          <div className="findIcon"><FaSearch /></div>
          <input
            className="inputFind"
            type="text"
            placeholder="Find todo..."
            name="Find todo"
            value={findTodoInput}
            onChange={handleFindTodoInputChange}
          />
        </form>
      </div>
    </div>
  );
}

export default FeatureBar;

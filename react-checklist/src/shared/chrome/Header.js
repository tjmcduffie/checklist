import classnames from 'classnames';
import React from 'react';

const Header = ({onToggleShowCompleted, shouldShowCompleted}) => {
  return (
    <header className={classnames('flex-row')}>
      <h1 className={classnames('flex-grow')}>Checklist</h1>
      <button
        className={classnames('clear-button', 'flex-shrink', 'flex-align-center')}
        onClick={onToggleShowCompleted}
        onKeyPress={
          e => ((e.key === " " || e.key === "Enter") && onToggleShowCompleted())
        }>
        {shouldShowCompleted ? 'Hide completed' : 'Show completed'}
      </button>
    </header>
  );
};

export default Header;

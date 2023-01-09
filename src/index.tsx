import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import classNames from 'classnames';

import FilterIcon from 'components/common/icons/Filter';
import ConditionFilters from 'components/ConditionFilters';
import FieldType from 'types/FieldType';

import styles from './styles.module.css';

const DEFAULT_TITLE = 'Filters';

interface Props {
  fields: FieldType[];
  title?: string | React.ReactElement;
  className?: string;
  classNameTitle?: string;
}

const MultiFilters = ({
  fields,
  title = DEFAULT_TITLE,
  className,
  classNameTitle
}: Props) => {
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

  const [conditionList, setConditionList] = useState<any[]>([]);

  const handleClickTitleBtn = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    setPopoverOpen(!isPopoverOpen);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      align='start'
      positions={['bottom', 'left']}
      padding={5}
      reposition={false}
      containerClassName={className}
      onClickOutside={() => setPopoverOpen(false)}
      content={({ nudgedTop }) => (
        <ConditionFilters
          fields={fields}
          style={{ maxHeight: `calc(100vh - ${nudgedTop + 30}px)` }}
          conditionList={conditionList}
          setConditionList={setConditionList}
        />
      )}
    >
      <div className={styles.container}>
        <button
          className={classNames(styles.titleBtn, classNameTitle)}
          onClick={handleClickTitleBtn}
          type='button'
        >
          {title}
          {!!conditionList?.length && (
            <span className={styles.conditionCount}>
              {conditionList.length}
            </span>
          )}
          <FilterIcon className={styles.iconFilter} />
        </button>
      </div>
    </Popover>
  );
};

export default MultiFilters;

import React, { useEffect, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import classNames from 'classnames';

import FilterIcon from 'components/common/icons/Filter';
import ConditionFilters from 'components/ConditionFilters';
import OrderBy from 'components/OrderBy';
import FieldType from 'types/FieldType';

import styles from './styles.module.css';

const DEFAULT_TITLE = 'Filters';

interface Props {
  fields: FieldType[];
  title?: string | React.ReactElement;
  className?: string;
  classNameTitle?: string;
  classNameOrder?: string;
  classNameTitleOrder?: string;
  onChangeFilters?: any;
  hasOrder?: boolean;
  onChangeOrder?: any;
  blackListFilterKeys?: string[];
}

const MultiFilters = ({
  fields,
  title = DEFAULT_TITLE,
  className,
  classNameTitle,
  classNameOrder,
  classNameTitleOrder,
  onChangeFilters,
  hasOrder,
  onChangeOrder,
  blackListFilterKeys
}: Props) => {
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

  const [conditionList, setConditionList] = useState<any[]>([]);

  const handleClickTitleBtn = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    setPopoverOpen(!isPopoverOpen);
  };

  useEffect(
    () => onChangeFilters && onChangeFilters(conditionList),
    [conditionList]
  );

  return (
    <div className={styles.wrapper}>
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
            blackListFilterKeys={blackListFilterKeys}
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
      {hasOrder && <span className={styles.orderTitle}>Order:</span>}
      {hasOrder && (
        <OrderBy
          fields={fields}
          onChange={onChangeOrder}
          className={classNameOrder}
          classNameTitle={classNameTitleOrder}
        />
      )}
    </div>
  );
};

export default MultiFilters;

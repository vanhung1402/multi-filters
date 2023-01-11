import React, { useState, useEffect } from 'react';
import { Popover } from 'react-tiny-popover';
import classNames from 'classnames';

import SortAscIcon from 'components/common/icons/SortAsc';
import SortDescIcon from 'components/common/icons/SortDesc';
import FieldType from 'types/FieldType';

import styles from './styles.module.css';

const DEFAULT_TITLE = '--Unset--';

interface Props {
  fields: FieldType[];
  title?: string | React.ReactElement;
  className?: string;
  classNameTitle?: string;
  onChange?: any;
}

const OrderBy = (props: Props) => {
  const { fields, title, className, classNameTitle, onChange } = props;

  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [sortObj, setSortObj] = useState<any>({
    isSortAsc: true,
    orderTitle: title || DEFAULT_TITLE,
    fieldSort: ''
  });

  const { isSortAsc, orderTitle, fieldSort } = sortObj;

  const handleClickTitleBtn = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    setPopoverOpen(!isPopoverOpen);
  };

  const handleClickSort = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setSortObj({ ...sortObj, isSortAsc: !sortObj.isSortAsc });
  };

  const handleClickSelectField = (e: any, field: FieldType) => {
    e.stopPropagation();
    e.preventDefault();

    const newSortObj =
      field.key === fieldSort
        ? {
            isSortAsc: true,
            orderTitle: title || DEFAULT_TITLE,
            fieldSort: ''
          }
        : { ...sortObj, orderTitle: field.label, fieldSort: field.key };

    setSortObj(newSortObj);
    setPopoverOpen(false);
  };

  const stopPropagation = (e: any) => e.stopPropagation();

  useEffect(() => {
    onChange && onChange(sortObj);
  }, [sortObj]);

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
        <div
          className={styles.contentContainer}
          style={{ maxHeight: `calc(100vh - ${nudgedTop + 30}px)` }}
          onClick={stopPropagation}
        >
          <ul>
            {fields.map((field) => (
              <li
                key={field.key}
                onClick={(e) => handleClickSelectField(e, field)}
                className={classNames({
                  [styles.active]: field.key === sortObj.fieldSort
                })}
              >
                {field.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    >
      <div className={styles.container}>
        <button
          className={classNames(styles.titleBtn, classNameTitle)}
          onClick={handleClickTitleBtn}
          type='button'
        >
          {orderTitle}
          {orderTitle !== DEFAULT_TITLE && (
            <span className={styles.sortIcon} onClick={handleClickSort}>
              {isSortAsc ? (
                <SortAscIcon className={styles.iconSort} />
              ) : (
                <SortDescIcon className={styles.iconSort} />
              )}
            </span>
          )}
        </button>
      </div>
    </Popover>
  );
};

export default OrderBy;

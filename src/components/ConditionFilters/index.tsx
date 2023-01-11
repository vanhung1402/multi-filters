import React, { useCallback } from 'react';
import classNames from 'classnames';

import ConditionFilterItem from 'components/ConditionFilterItem';
import FieldType from 'types/FieldType';

import styles from './styles.module.css';

interface Props {
  fields: FieldType[];
  conditionList: any[];
  setConditionList: any;
  style?: object;
  className?: string;
}

const ConditionFilters = (props: Props) => {
  const { fields, conditionList, setConditionList, className, ...rest } = props;

  const handleClickAddAnotherFilter = useCallback(() => {
    const id = new Date().getTime();
    const newCondition = {
      id,
      field: fields[0]?.key,
      values: null,
      type: {}
    };
    setConditionList((conditionList: any[]) => [
      ...conditionList,
      newCondition
    ]);
  }, [conditionList]);

  const handleRemoveCondition = (conditionId: number) => {
    setConditionList((conditionList: any[]) =>
      conditionList.filter((condition) => condition.id !== conditionId)
    );
  };

  return (
    <div className={classNames(styles.container, className)} {...rest}>
      <table className={styles.fieldListTable}>
        <tbody>
          {conditionList.length ? (
            conditionList.map((condition) => (
              <ConditionFilterItem
                key={condition.id}
                condition={condition}
                fields={fields}
                setConditionList={setConditionList}
                onRemoveCondition={() => handleRemoveCondition(condition.id)}
              />
            ))
          ) : (
            <tr>
              <td>No filters</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5} className={styles.btnAddAnotherFilterWrapper}>
              <button
                onClick={handleClickAddAnotherFilter}
                className={classNames('btn', styles.btnAddAnotherFilter)}
              >
                Add another filter
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ConditionFilters;

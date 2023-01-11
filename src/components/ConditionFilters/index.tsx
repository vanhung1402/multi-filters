import React from 'react';
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

  const handleClickAddAnotherFilter = () => {
    const newCondition = {
      id: new Date().getTime(),
      field: fields[0]?.key,
      value: null
    };
    setConditionList((conditionList: any[]) => [
      ...conditionList,
      newCondition
    ]);
  };

  const handleChangeField = (conditionId: number, fieldKey: string) => {
    setConditionList((conditionList: any[]) =>
      conditionList.map((condition) =>
        conditionId === condition.id
          ? { ...condition, field: fieldKey }
          : condition
      )
    );
  };

  const handleRemoveCondition = (conditionId: number) => {
    setConditionList((conditionList: any[]) =>
      conditionList.filter((condition) => condition.id !== conditionId)
    );
  };

  const handleChangeValue = (conditionId: number, conditionValues: any) => {
    console.log('conditionValues: ', conditionValues);
    console.log('conditionId: ', conditionId);
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
                onChangeField={(fieldKey: string) =>
                  handleChangeField(condition.id, fieldKey)
                }
                onChangeValues={(conditionValues: any) =>
                  handleChangeValue(condition.id, conditionValues)
                }
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

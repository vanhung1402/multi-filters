import React, { useEffect, useMemo } from 'react';

import TrashIcon from 'components/common/icons/trash';
import conditionTypesMap, {
  DEFAULT_TYPE
} from 'components/ConditionFilterItem/conditionTypesMap';
import FieldType from 'types/FieldType';

import styles from './styles.module.css';

interface Props {
  condition: any;
  fields: FieldType[];
  setConditionList: any;
  onRemoveCondition: any;
}

const ConditionFilterItem = (props: Props) => {
  const { fields, condition, setConditionList, onRemoveCondition } = props;

  const getConditionType = (conditionField: string) => {
    const dataType = fields.find(
      (field) => field.key === conditionField
    )?.dataType;

    return conditionTypesMap[dataType || DEFAULT_TYPE];
  };

  const setSelectedConditionType = (type: any) => {
    setConditionList((conditionList: any[]) =>
      conditionList.map((c) => (c.id === condition.id ? { ...c, type } : c))
    );
    resetConditionValues();
  };

  const setConditionValues = (values: any) => {
    setConditionList((conditionList: any[]) =>
      conditionList.map((c) =>
        c.id === condition.id ? { ...c, values: { ...c.values, ...values } } : c
      )
    );
  };

  const resetConditionValues = () => {
    setConditionList((conditionList: any[]) =>
      conditionList.map((c) =>
        c.id === condition.id ? { ...c, values: {} } : c
      )
    );
  };

  const handleChangeFilterField = (e: any) => {
    e.stopPropagation();
    e.persist();

    if (!e.target) return;

    const conditionTypes = getConditionType(e.target.value);
    setConditionList((conditionList: any[]) =>
      conditionList.map((c) =>
        c.id === condition.id
          ? { ...c, field: e.target.value, type: conditionTypes[0] }
          : c
      )
    );
  };

  const handleChangeFilterConditionType = (e: any) => {
    e.stopPropagation();
    setSelectedConditionType(
      conditionTypes.find((type: any) => e.target.value === type.key)
    );
  };

  const handleClickRemoveCondition = (e: any) => {
    onRemoveCondition();
    e.stopPropagation();
  };

  const handleChangeValue = (e: any, conditionInputId: string) => {
    e.stopPropagation();
    e.persist();

    if (!e.target) return;

    setConditionValues({ [conditionInputId]: e.target.value });
  };

  const conditionTypes = useMemo(() => {
    return getConditionType(condition.field);
  }, [condition.field]);

  useEffect(() => {
    !!conditionTypes?.length &&
      !Object.keys(condition.type).length &&
      setSelectedConditionType(conditionTypes[0]);
  }, [conditionTypes]);

  return (
    <tr className={styles.conditionItem}>
      <td>Where</td>
      <td>
        <select
          value={condition.field}
          id={`field-${condition.id}`}
          name={`field-${condition.id}`}
          onChange={handleChangeFilterField}
        >
          {fields.map((field) => (
            <option key={field.key} value={field.key}>
              {field.label}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          value={condition.type?.key}
          id={`condition-type-${condition.id}`}
          name={`condition-type-${condition.id}`}
          onChange={handleChangeFilterConditionType}
        >
          {conditionTypes.map((type: any) => (
            <option key={type.key} value={type.key}>
              {type.label}
            </option>
          ))}
        </select>
      </td>
      <td>
        <div className={styles.conditionValueTypeOptions}>
          {condition.type?.valueTypeOptions?.map(
            (valueOption: any, index: number) => {
              const conditionInputId = `input-${condition.id}-${index}-${
                valueOption.valueName || 'value'
              }`;
              let InputComponent = () => (
                <input
                  key={conditionInputId}
                  type={valueOption.valueType}
                  placeholder={valueOption.valueLabel || ''}
                  defaultValue={
                    condition.values ? condition.values[conditionInputId] : ''
                  }
                  onBlur={(e) => handleChangeValue(e, conditionInputId)}
                />
              );

              if (valueOption.valueInputType === 'select') {
                InputComponent = () => (
                  <select
                    key={conditionInputId}
                    id={conditionInputId}
                    value={
                      condition.values ? condition.values[conditionInputId] : ''
                    }
                    onChange={(e) => handleChangeValue(e, conditionInputId)}
                  >
                    {valueOption.valueInputOptions?.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                );
              }

              return (
                <div key={conditionInputId} className={styles.conditionInput}>
                  {!!valueOption?.valueLabel && (
                    <label htmlFor={conditionInputId}>
                      {valueOption?.valueLabel}:
                    </label>
                  )}
                  <InputComponent />
                </div>
              );
            }
          )}
        </div>
      </td>
      <td className={styles.removeCondition}>
        <button
          className={styles.btnRemoveCondition}
          onClick={(e: any) => handleClickRemoveCondition(e)}
        >
          <TrashIcon className={styles.iconRemove} />
        </button>
      </td>
    </tr>
  );
};

export default ConditionFilterItem;

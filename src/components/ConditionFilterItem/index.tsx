import React, { useEffect, useMemo, useState } from 'react';

import TrashIcon from 'components/common/icons/trash';
import conditionTypesMap, {
  DEFAULT_TYPE
} from 'components/ConditionFilterItem/conditionTypesMap';
import FieldType from 'types/FieldType';

import styles from './styles.module.css';

interface Props {
  condition: any;
  fields: FieldType[];
  onChangeField: any;
  onChangeValues: any;
  onRemoveCondition: any;
}

const ConditionFilterItem = (props: Props) => {
  const {
    fields,
    condition,
    onChangeField,
    onChangeValues,
    onRemoveCondition
  } = props;

  const [selectedField, setSelectedField] = useState(condition.field);
  const [selectedConditionType, setSelectedConditionType] = useState<any>({});
  const [conditionValues, setConditionValues] = useState<any>({});

  const conditionTypes = useMemo(() => {
    const dataType = fields.find(
      (field) => field.key === selectedField
    )?.dataType;

    return conditionTypesMap[dataType || DEFAULT_TYPE];
  }, [selectedField]);

  useEffect(() => {
    onChangeField(selectedField);
  }, [selectedField]);

  useEffect(() => {
    !!conditionTypes?.length && setSelectedConditionType(conditionTypes[0]);
  }, [conditionTypes]);

  useEffect(() => {
    !!Object.keys(conditionValues).length && onChangeValues(conditionValues);
  }, [conditionValues]);

  const handleChangeFilterField = (e: any) => {
    setSelectedField(e.target.value);
  };

  const handleChangeFilterConditionType = (e: any) => {
    setSelectedConditionType(
      conditionTypes.find((type: any) => e.target.value === type.key)
    );
  };

  const handleClickRemoveCondition = (e: any) => {
    onRemoveCondition();
    e.stopPropagation();
  };

  const handleChangeValue = (e: any, conditionInputId: string) => {
    e.persist();

    if (!e.target) return;

    console.log('conditionValues: ', conditionValues);
    setConditionValues((conditionValues: any) => ({
      ...conditionValues,
      [conditionInputId]: e.target.value
    }));
  };

  return (
    <tr className={styles.conditionItem}>
      <td>Where</td>
      <td>
        <select
          value={selectedField}
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
          value={selectedConditionType.key}
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
          {selectedConditionType.valueTypeOptions?.map(
            (valueOption: any, index: number) => {
              const conditionInputId = `input-${condition.id}-${index}`;
              let InputComponent = () => (
                <input
                  key={conditionInputId}
                  type={valueOption.valueType}
                  placeholder={valueOption.valueLabel || ''}
                  value={conditionValues[conditionInputId] || ''}
                  onChange={(e) => handleChangeValue(e, conditionInputId)}
                />
              );

              if (valueOption.valueInputType === 'select') {
                InputComponent = () => (
                  <select
                    key={conditionInputId}
                    id={conditionInputId}
                    value={conditionValues[conditionInputId] || ''}
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

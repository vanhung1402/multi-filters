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
  onRemoveCondition: any;
}

const ConditionFilterItem = (props: Props) => {
  const { fields, condition, onChangeField, onRemoveCondition } = props;

  const [selectedField, setSelectedField] = useState(condition.field);
  const [selectedConditionType, setSelectedConditionType] = useState<any>({});

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
              if (valueOption.valueInputType === 'select') {
                return (
                  <select key={index}>
                    {valueOption.valueInputOptions?.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                );
              }

              return (
                <input
                  key={index}
                  type={valueOption.valueType}
                  placeholder={valueOption.valueLabel || ''}
                />
              );
            }
          )}
        </div>
      </td>
      <td className={styles.removeCondition}>
        <TrashIcon
          className={styles.iconRemove}
          onClick={(e: any) => handleClickRemoveCondition(e)}
        />
      </td>
    </tr>
  );
};

export default ConditionFilterItem;

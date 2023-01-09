export const DEFAULT_TYPE = 'string';

const conditionTypesMap = {
  string: [
    {
      key: 'contains',
      label: 'Contains',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'text' }]
    },
    {
      key: 'not_contains',
      label: 'Not contains',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'text' }]
    },
    {
      key: 'regex',
      label: 'Regex',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'text' }]
    },
    {
      key: 'equal',
      label: 'Equal',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'text' }]
    },
    {
      key: 'not_equal',
      label: 'Not equal',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'text' }]
    },
    {
      key: 'is_empty',
      label: 'Is empty',
      valueTypeOptions: [
        {
          valueInputType: 'select',
          valueInputOptions: [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]
        }
      ]
    }
  ],
  number: [
    {
      key: 'equal',
      label: '=',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'number' }]
    },
    {
      key: 'not_equal',
      label: '!=',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'number' }]
    },
    {
      key: 'less',
      label: '<',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'number' }]
    },
    {
      key: 'greater',
      label: '>',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'number' }]
    },
    {
      key: 'less_and_equal',
      label: '<=',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'number' }]
    },
    {
      key: 'greater_and_equal',
      label: '>=',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'number' }]
    },
    {
      key: 'is_between',
      label: 'Is between',
      valueTypeOptions: [
        {
          valueInputType: 'input',
          valueName: 'min',
          valueLabel: 'Min',
          valueType: 'number'
        },
        {
          valueInputType: 'input',
          valueName: 'max',
          valueLabel: 'Max',
          valueType: 'number'
        }
      ]
    },
    {
      key: 'not_between',
      label: 'Not between',
      valueTypeOptions: [
        {
          valueInputType: 'input',
          valueName: 'min',
          valueLabel: 'Min',
          valueType: 'number'
        },
        {
          valueInputType: 'input',
          valueName: 'max',
          valueLabel: 'Max',
          valueType: 'number'
        }
      ]
    },
    {
      key: 'is_empty',
      label: 'Is empty',
      valueTypeOptions: [
        {
          valueInputType: 'select',
          valueInputOptions: [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]
        }
      ]
    }
  ],
  date: [
    {
      key: 'is_before',
      label: 'Is before',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'date' }]
    },
    {
      key: 'is_after',
      label: 'Is after',
      valueTypeOptions: [{ valueInputType: 'input', valueType: 'date' }]
    },
    {
      key: 'is_between',
      label: 'Is between',
      valueTypeOptions: [
        {
          valueInputType: 'input',
          valueName: 'min',
          valueLabel: 'Min',
          valueType: 'date'
        },
        {
          valueInputType: 'input',
          valueName: 'max',
          valueLabel: 'Max',
          valueType: 'date'
        }
      ]
    },
    {
      key: 'not_between',
      label: 'Not between',
      valueTypeOptions: [
        {
          valueInputType: 'input',
          valueName: 'min',
          valueLabel: 'Min',
          valueType: 'date'
        },
        {
          valueInputType: 'input',
          valueName: 'max',
          valueLabel: 'Max',
          valueType: 'date'
        }
      ]
    },
    {
      key: 'is_empty',
      label: 'Is empty',
      valueTypeOptions: [
        {
          valueInputType: 'select',
          valueInputOptions: [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]
        }
      ]
    }
  ],
  datetime: [
    {
      key: 'is_before',
      label: 'Is before',
      valueTypeOptions: [
        { valueInputType: 'input', valueType: 'datetime-local' }
      ]
    },
    {
      key: 'is_after',
      label: 'Is after',
      valueTypeOptions: [
        { valueInputType: 'input', valueType: 'datetime-local' }
      ]
    },
    {
      key: 'is_between',
      label: 'Is between',
      valueTypeOptions: [
        {
          valueInputType: 'input',
          valueName: 'min',
          valueLabel: 'Min',
          valueType: 'datetime-local'
        },
        {
          valueInputType: 'input',
          valueName: 'max',
          valueLabel: 'Max',
          valueType: 'datetime-local'
        }
      ]
    },
    {
      key: 'not_between',
      label: 'Not between',
      valueTypeOptions: [
        {
          valueInputType: 'input',
          valueName: 'min',
          valueLabel: 'Min',
          valueType: 'datetime-local'
        },
        {
          valueInputType: 'input',
          valueName: 'max',
          valueLabel: 'Max',
          valueType: 'datetime-local'
        }
      ]
    },
    {
      key: 'is_empty',
      label: 'Is empty',
      valueTypeOptions: [
        {
          valueInputType: 'select',
          valueInputOptions: [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]
        }
      ]
    }
  ],
  boolean: [
    {
      key: 'is_empty',
      label: 'Is empty',
      valueTypeOptions: [
        {
          valueInputType: 'select',
          valueInputOptions: [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]
        }
      ]
    }
  ]
};

export default conditionTypesMap;

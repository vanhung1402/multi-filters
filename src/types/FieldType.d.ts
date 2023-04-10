declare type FieldType = {
  key: string;
  dataType:
    | 'number'
    | 'string'
    | 'boolean'
    | 'object'
    | 'date'
    | 'datetime'
    | 'custom';
  label?: string;
  dataCustom?: any[];
};

export default FieldType;

declare type FieldType = {
  key: string;
  dataType: 'number' | 'string' | 'boolean' | 'object' | 'date' | 'datetime';
  label?: string;
};

export default FieldType;

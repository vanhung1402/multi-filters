import React from 'react'

import MultiFilters from 'multi-filters'
import 'multi-filters/dist/index.css'

const fieldsTest = [
  { key: 'id', label: 'ID', dataType: 'number' },
  { key: 'title', label: 'Title', dataType: 'string' },
  { key: 'is_active', label: 'Is active', dataType: 'boolean' },
  { key: 'start_date', label: 'Start date', dataType: 'date' },
  { key: 'created_at', label: 'Created at', dataType: 'datetime' }
];

const filterBlackList = ['is_empty', 'not_between', 'is_between', 'regex', 'not_contains', 'contains'];

const App = () => {
  const handleChangeFilters = (filters: any) => {
    console.log('filters: ', filters);
  };

  const handleChangeOrders = (order: any) => {
    console.log('order: ', order);
  }

  return <MultiFilters fields={fieldsTest} hasOrder onChangeFilters={handleChangeFilters} onChangeOrder={handleChangeOrders} blackListFilterKeys={filterBlackList} />
}

export default App

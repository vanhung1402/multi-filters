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

const App = () => {
  return <MultiFilters fields={fieldsTest} />
}

export default App

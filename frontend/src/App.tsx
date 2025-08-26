import React, { useState } from 'react';
import DatePicker from 'react-widgets/DatePicker';
import 'react-widgets/styles.css';

const App = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Select a Date</h1>
      <DatePicker value={date} onChange={(value) => setDate(value ?? null)} />
    </div>
  );
};

export default App;

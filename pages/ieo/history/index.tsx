import React from 'react';
import TableIeoHistory from './TableIeoHistory';

const Home = () => {

  return (
    <div style={{ padding: '20px' }}>
      <div className="top-table">
        <h2>NHẬN IEO</h2>
        <a className='btn' href="/ieo">Quay lại</a>
      </div>
      <TableIeoHistory />
    </div>
  );
};

export default Home;
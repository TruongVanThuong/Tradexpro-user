import React from 'react';
import TableIeoHistory from './TableIeoHistory';

const Home = () => {

  return (
    <div className='container-ieo'>
      <div className="top-table">
        <h2>RECEIVE IEO</h2>
        <a className='btn' href="/ieo">Back</a>
      </div>
      <TableIeoHistory />
    </div>
  );
};

export default Home;
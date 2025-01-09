import React from 'react';
import TableIeo from './TableIeo';

const Home = () => {

  return (
    <div className='container-ieo'>
      <div className="top-table">
        <h2>IEO REGISTER / ALLOCATION</h2>
        <a className='btn' href="/ieo/history">Receive IEO</a>
      </div>
      <TableIeo />
    </div>
  );
};

export default Home;

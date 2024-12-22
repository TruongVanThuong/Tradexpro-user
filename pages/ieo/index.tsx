import React from 'react';
import TableIeo from './TableIeo';

const Home = () => {

  return (
    <div style={{ padding: '20px', width:'85%', margin:'auto' }}>
      <div className="top-table">
        <h2>IEO ĐĂNG KÍ/ PHÂN BỔ</h2>
        <a className='btn' href="/ieo/history">Nhận IEO</a>
      </div>
      <TableIeo />
    </div>
  );
};

export default Home;

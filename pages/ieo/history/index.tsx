import React from 'react';
import TableIeoHistory from './TableIeoHistory';
import useTranslation from "next-translate/useTranslation";

const Home = () => {
  const { t } = useTranslation("common");

  return (
    <div className='container-ieo'>
      <div className="top-table">
        <h2>{t("Receive IEO")}</h2>
        <a className='btn' href="/ieo">{t("Back")}</a>
      </div>
      <TableIeoHistory />
    </div>
  );
};

export default Home;
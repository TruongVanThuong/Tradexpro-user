import React from 'react';
import TableIeo from './TableIeo';
import useTranslation from "next-translate/useTranslation";

const Home = () => {
  const { t } = useTranslation("common");

  return (
    <div className='container-ieo'>
      <div className="top-table">
        <h2>{t("IEO REGISTER / ALLOCATION")}</h2>
        <a className='btn' href="/ieo/history">{t("Receive IEO")}</a>
      </div>
      <TableIeo />
    </div>
  );
};

export default Home;

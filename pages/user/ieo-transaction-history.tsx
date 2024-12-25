import type { GetServerSideProps, NextPage } from "next";
import React, { useState, useEffect } from "react";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import Footer from "components/common/footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state/store";
import ReactDataTable from "components/ReactDataTable";
import CustomPagination from "components/Pagination/CustomPagination";
import ReportLayout from "components/reports/ReportLayout";
import { AllIeoTransactionHistoryAction } from "state/actions/wallet";

const IeoTransactionHistory: NextPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const [search, setSearch] = useState<string>("");
  const [selectedLimit, setSelectedLimit] = useState<any>("10");
  const [sortingInfo, setSortingInfo] = useState<any>({
    column_name: "created_at",
    order_by: "desc",
  });

  const { history, stillHistory, loading } = useSelector(
    (state: RootState) => state.reports
  );

  const [processing, setProcessing] = useState<boolean>(false);

  const columns = [
    {
      Header: t("Ieo Icon"),
      accessor: "ieo_icon",
      Cell: ({ cell }: any) => (
        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploaded_file/uploads/coin/${cell.value}`} alt="IEO Icon" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      Header: t("Name Ieo"),
      accessor: "ieo_name",
    },
    {
      Header: t("Name Coin"),
      accessor: "coin_name",
    },
    {
      Header: t("Balance"),
      accessor: "balance",
      Cell: ({ cell }: any) => (
        <div className="blance-text">
          <span className="blance market incree">
            {parseFloat(cell?.value).toFixed(5)}
          </span>
        </div>
      ),
    },
    {
      Header: t("Note"),
      accessor: "note",
    },
    {
      Header: t("Date"),
      accessor: "create_at",
      Cell: ({ cell }: any) => (
        <div>{moment(cell.value).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      AllIeoTransactionHistoryAction(
        selectedLimit,
        1,
        sortingInfo.column_name,
        sortingInfo.order_by,
        search
      )
    );
  }, [dispatch, selectedLimit, search, sortingInfo]);

  const handlePageClick = (event: any) => {
    dispatch(
      AllIeoTransactionHistoryAction(
        selectedLimit,
        event.selected + 1, 
        sortingInfo.column_name,
        sortingInfo.order_by,
        search
      )
    );
  };

  return (
    <>
      <ReportLayout>
        <div className="tradex-bg-background-main tradex-rounded-lg tradex-border tradex-border-background-primary tradex-shadow-[2px_2px_23px_0px_#6C6C6C0D] tradex-px-4 tradex-pt-6 tradex-pb-12 tradex-space-y-6">
          <div className="tradex-pb-4 tradex-border-b tradex-border-background-primary tradex-space-y-4">
            <h2 className="tradex-text-[32px] tradex-leading-[38px] md:tradex-text-[40px] md:tradex-leading-[48px] tradex-font-bold !tradex-text-title">
              {t("Ieo Transaction History")}
            </h2>
            <div className="tradex-flex tradex-flex-col md:tradex-flex-row tradex-gap-4 tradex-justify-between md:tradex-items-end">
              <div>
                <label className="!tradex-mb-0 tradex-text-base tradex-leading-6 tradex-font-semibold tradex-text-body">
                  {t("Show")}
                  <select
                    className="tradex-ml-4 !tradex-bg-transparent tradex-py-2.5 tradex-px-5 tradex-border !tradex-border-background-primary tradex-rounded tradex-text-sm tradex-leading-5 tradex-text-title"
                    placeholder="10"
                    onChange={(e) => setSelectedLimit(e.target.value)}
                    value={selectedLimit}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </label>
              </div>

              <div>
                <label className="!tradex-mb-0 tradex-flex tradex-items-center tradex-text-xl tradex-leading-6 tradex-font-semibold tradex-text-body">
                  <input
                    type="search"
                    aria-controls="table"
                    className="!tradex-bg-transparent md:tradex-ml-4 tradex-py-2.5 tradex-px-3 tradex-border !tradex-border-background-primary tradex-rounded tradex-text-sm tradex-leading-5"
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="tradex-space-y-6">
            <ReactDataTable
              columns={columns}
              data={history || []}
              processing={processing}
              isSearchable={false}
              isSortEnable={false}
            />

            {history?.length > 0 && (
              <CustomPagination
                per_page={stillHistory?.items?.per_page}
                current_page={stillHistory?.items?.current_page}
                total={stillHistory?.items?.total}
                handlePageClick={handlePageClick}
              />
            )}
          </div>
        </div>
      </ReportLayout>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx);
  return {
    props: {},
  };
};

export default IeoTransactionHistory;

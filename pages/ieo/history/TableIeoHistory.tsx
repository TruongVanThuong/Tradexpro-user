import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "state/store";
import { 
  getIeoUserRegistered,
  postReceiveIeoWallet,
  postReceiveIeo
} from "service/ieo";
import { toast } from "react-toastify";
import useTranslation from "next-translate/useTranslation";

interface IeoHistory {
  id: number;
  name: string;
  value: number;
  symbol: string;
  max_rate: number;
  start_date: string;
  end_date: string;
  quantity: number;
  frozen_rate: number;
  release_rate: number;
  winning_rate: number;
  checkIeoWallet: string;
  checkIeoTranferHistory: string;
}

const TableIeoHistory = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [ieoHistory, setIeoHistory] = useState<IeoHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchIeoHistory();
    if (!isLoggedIn) {
      router.push('/signin');
      return;
    } 
  }, []);
    
  const fetchIeoHistory = async () => {
    try {
      const response = await getIeoUserRegistered()

      if (!response.success) {
        throw new Error(t("Failed to fetch IEO history data"));
      }
      setIeoHistory(response.data);
    } catch (error: any) {
      setError(error.message || t("Error fetching IEO data"));
      console.error("Error fetching IEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  const receiveIeo = async (itemId: number) => {
    try {
      const response = await postReceiveIeo(itemId);

      if (response.success) {
        toast.success(response.message);
        fetchIeoHistory();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(t("An error occurred, please try again!!!"));
    }
  }

  const receiveIeoWallet = async (itemId: number) => {
    try {
      const response = await postReceiveIeoWallet(itemId);

      if (response.success) {
        toast.success(response.message);
        fetchIeoHistory();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(t("An error occurred, please try again!!!"));
    }
  }

  if (loading) {
    return <div>{t("Loading...")}</div>;
  }

  if (error) {
    return <div>{t("Error:")} {error}</div>;
  }

  return (
    <div className='table-overflow'>
      <table>
        <thead>
          <tr style={{ backgroundColor: "rgb(2, 123, 255)" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>{t("Token")}</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'8%' }}>{t("Amount")}</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'8%' }}>{t("Value")}</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'10%' }}>{t("Start Time")}</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'10%' }}>{t("End Time")}</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'8%' }}>{t("Frozen Rate")}</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'8%' }}>{t("Release Rate")}</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'10%' }}>{t("Winning Rate")}</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>{t("Status")}</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>{t("Action")}</th>
          </tr>
        </thead>
        <tbody>
          {ieoHistory.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ padding: "10px", textAlign: "center" }}>
                {t("No data available")}
              </td>
            </tr>
          ) : (ieoHistory.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.quantity}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.value}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(item.start_date).toLocaleString()}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(item.end_date).toLocaleString()}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.frozen_rate}%</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.release_rate}%</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.winning_rate}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {item.end_date < new Date().toISOString() ? (
                    <span className="label label-danger">{t("Ended")}</span>
                  ) : (
                    <span className="label label-success">{t("In Progress")}</span>
                  )}
                </td>
                <td className="td-action">
                  <div className="action-ieo-history">
                    {item.end_date < new Date().toISOString() ? (
                      item.checkIeoTranferHistory && !item.checkIeoWallet ? (
                        <button
                          className="btn-success button-ieo mr-2"
                          onClick={() => receiveIeoWallet(item.id)}
                        >
                          {t("Receive IEO")}
                        </button>
                      ) : item.checkIeoWallet ? (
                        <button className="btn-info button-ieo mr-2" disabled>
                          {t("Received IEO")}
                        </button>
                      ) : (
                        <button className="btn btn-secondary button-ieo mr-2" disabled>
                          {t("Receive IEO")}
                        </button>
                      )
                    ) : (
                      <button className="btn btn-secondary button-ieo mr-2" disabled>
                        {t("Receive IEO")}
                      </button>
                    )}
                    {item.end_date < new Date().toISOString() ? (
                      item.checkIeoTranferHistory ? (
                        <button className="btn-info button-swap" disabled>{t("Swapped")}</button>
                      ) : (
                        <button className="btn-success button-swap" onClick={() => receiveIeo(item.id)}>{t("Swap")}</button>
                      )
                    ) : (
                      <button className="btn btn-secondary button-swap" disabled>{t("Swap")}</button>
                    )}
                  </div>
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    </div>
  );
};

export default TableIeoHistory;

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
        throw new Error("Failed to fetch IEO history data");
      }
      setIeoHistory(response.data);
    } catch (error: any) {
      setError(error.message || "Error fetching IEO data");
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
      toast.error('An error occurred, please try again!!!');
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
      toast.error('An error occurred, please try again!!!');
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='table-overflow'>
      <table>
        <thead>
          <tr style={{ backgroundColor: "rgb(2, 123, 255)" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Token</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'8%' }}>Amount</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'8%' }}>Value</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'10%' }}>Start Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'10%' }}>End Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'8%' }}>Frozen Rate</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'8%' }}>Release Rate</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width:'10%' }}>Winning Rate</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {ieoHistory.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ padding: "10px", textAlign: "center" }}>
                No data available
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
                    <span className="label label-danger">Ended</span>
                  ) : (
                    <span className="label label-success">In Progress</span>
                  )}
                </td>
                <td className="td-action">
                  <div className="action-ieo-history">
                    {item.end_date < new Date().toISOString() ? (
                      item.checkIeoWallet ? (
                        <button className="btn-info button-ieo mr-2" disabled>Received IEO</button>
                      ) : (
                        <button className="btn-success button-ieo mr-2" onClick={() => receiveIeoWallet(item.id)}>Receive IEO</button>
                      )
                    ) : (
                      <button className="btn btn-secondary button-ieo mr-2" disabled>Receive IEO</button>
                    )}
                    {item.end_date < new Date().toISOString() ? (
                      item.checkIeoTranferHistory ? (
                        <button className="btn-info button-swap" disabled>Swapped</button>
                      ) : (
                        <button className="btn-success button-swap" onClick={() => receiveIeo(item.id)}>Swap</button>
                      )
                    ) : (
                      <button className="btn btn-secondary button-swap" disabled>Swap</button>
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

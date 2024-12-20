import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "state/store";
import { getIeoUserRegistered } from "service/ieo";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Token</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Số lượng</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tổng (USDT)</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Thời gian kết thúc ước tính</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tỷ lệ đóng băng</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tỷ lệ giải phóng</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tỷ lệ thắng</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Trạng thái</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
        {ieoHistory.map((item) => {
            return (
            <tr key={item.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.quantity}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.value * item.quantity}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(item.end_date).toLocaleDateString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.frozen_rate}%</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.release_rate}%</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.winning_rate}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.end_date < new Date().toISOString() ? "Đã kết thúc" : "Đang diễn ra"}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {item.end_date < new Date().toISOString() ? (
                  <button className="btn btn-secondary" disabled>Nhận IEO</button>
                ) : (
                  <button className="btn btn-success">Nhận IEO</button>
                )}
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};

export default TableIeoHistory;

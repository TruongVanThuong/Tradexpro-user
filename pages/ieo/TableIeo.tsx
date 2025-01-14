import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getIeo, postRegisterIeo } from "service/ieo";
import useTranslation from "next-translate/useTranslation";

interface Ieo {
  id: number;
  name: string;
  value: number;
  symbol: string;
  total_supply: number;
  max_rate: number;
  start_date: string;
  end_date: string;
  registered: number;
  status: string;
  timeRemaining: string;
}

const TableIeo: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [ieos, setIeos] = useState<Ieo[]>([]);
  const [selectedIeo, setSelectedIeo] = useState<Ieo | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchIeos = async () => {
    try {
      const response = await getIeo();
      console.log(response.data);
      if (!response.success) {
        throw new Error('Failed to fetch IEO data');
      }
      setIeos(response.data);
    } catch (error) {
      console.error('Error fetching IEO data:', error);
    } 
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signin');
      return;
    } 
    fetchIeos();
  }, []);

  const calculateProgress = (registered: string | number, total_supply: string | number): number => {
    const registeredNum = Number(registered);
    const totalSupplyNum = Number(total_supply);

    if (registeredNum >= totalSupplyNum) {
      return 100;
    }
    const progress = (registeredNum / totalSupplyNum) * 100;

    return progress >= 99.99 ? 99.99 : Number(progress.toFixed(2));
  };
  

  const handleOpenModal = (ieo: Ieo) => {
    setSelectedIeo(ieo);
    setAmount(0);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFillAll = () => {
    if (selectedIeo) {
      const maxAmount = selectedIeo.total_supply - selectedIeo.registered;
      setAmount(maxAmount);
    }
  };

  const handleRegister = async () => {
    if (!selectedIeo ) {
      toast.warning(t("Invalid quantity!"));
      return;
    }
  
    try {
      const response = await postRegisterIeo(selectedIeo.id, amount);
  
      if (response.success) {
        toast.success(response.message);
        
        setSelectedIeo({
          ...selectedIeo,
          registered: selectedIeo.registered + amount,
        });
        fetchIeos();
        setAmount(0);
        setShowModal(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(t("An error occurred, please try again!"));
    }
  };
  


  const canJoin = (startTime: string, endTime: string) => {
    const currentTime = new Date().getTime();
    const startTimeDate = new Date(startTime).getTime();
    const endTimeDate = new Date(endTime).getTime();

    return currentTime >= startTimeDate && currentTime <= endTimeDate;
  };

  const calculateTotalValue = (totalSupply: number, value: number) => totalSupply * value;

  const calculateRemainingTokens = (totalSupply: number, registered: number) => totalSupply - registered;

  const calculatePayment = (amount: number, value: number) => amount * value;

  return (
    <div className='table-overflow'>
      <table>
        <thead>
          <tr style={{ backgroundColor: '#027bff' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>{t("Token")}</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>{t("Price (USDT)")}</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>{t("Progress")}</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', width:'10%' }}>{t("Max Win Rate")}</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', width:'10%' }}>{t("Time Remaining")}</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', width:'10%' }}>{t("Start Time")}</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', width:'10%' }}>{t("End Time")}</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>{t("Status")}</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>{t("Action")}</th>
          </tr>
        </thead>
        <tbody>
          {ieos.map((ieo) => (
            <tr key={ieo.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ieo.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ieo.value} {t("USDT")}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {ieo.registered}/{ieo.total_supply}
                <div style={{ width: '100%', backgroundColor: '#f4f4f4' }}>
                  <div
                    style={{
                      width: `${calculateProgress(ieo.registered, ieo.total_supply)}%`,
                      height: '10px',
                      backgroundColor: '#4caf50',
                    }}
                  />
                </div>
                {calculateProgress(ieo.registered, ieo.total_supply)}%
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ieo.max_rate}%</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ieo.timeRemaining}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(ieo.start_date).toLocaleString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(ieo.end_date).toLocaleString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {ieo.status === "Ended" ? (
                  <span className="label label-danger">{t("Ended")}</span>
                ) : (
                  <span className="label label-success">{t("Ongoing")}</span>
                )}
              </td>
              <td className="td-action">
                {calculateProgress(ieo.registered, ieo.total_supply) < 100 && canJoin(ieo.start_date, ieo.end_date) ? (
                  <button 
                    type="button" 
                    className="btn-primary button-ieo" 
                    onClick={() => handleOpenModal(ieo)}
                  >
                    {t("Join")}
                  </button>
                ) : calculateProgress(ieo.registered, ieo.total_supply) < 100 && !canJoin(ieo.start_date, ieo.end_date) ? (
                  <button className="btn-secondary button-ieo" disabled>
                    {t("Join")}
                  </button>
                ) : calculateProgress(ieo.registered, ieo.total_supply) === 100 && ieo.registered > 0 ? (
                  <button className="btn-info button-ieo" disabled>
                    {t("Joined")}
                  </button>
                ) : (
                  <button className="btn-success button-ieo" disabled>
                    {t("Join")}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="wraper_ieo">

          <div className="ModalOverlayIeo">
            <div className="card_ieoJoin">
              <div className="card_ieoJoin_content">
                <div className="card_ieoJoin_title">
                  <div className="Ctnback">
                    <div className="textWhite text18590 textbackp">{t("Join Registration")}</div>
                  </div>
                  <div>
                    <p onClick={() => handleCloseModal()}>X</p>
                  </div>
                </div>
                <div className="card_ieoJoin_head">
                  <div className="card_ieoJoin_head_left">
                    <div className="ieoJoin_asset">
                      {selectedIeo?.total_supply && selectedIeo?.value && calculateTotalValue(selectedIeo.total_supply, selectedIeo.value)} {t("USDT")}
                    </div>
                    <p className="ieoJoin_asset_text">{t("Total Asset Value (USDT)")}</p>
                  </div>
                  <div className="ieoJoin_asset_img">
                  </div>
                </div>
                <div className="card_ieoJoin_form">
                  <div className="ieoJoin_form_head">
                    <div className="ieoJoin_form_head_column">
                      <div className="ieoJoin_form_column_title">{t("Price (USDT)")}</div>
                      <div className="ieoJoin_form_column_number number_green">{selectedIeo?.value} USDT</div>
                    </div>
                    <div className="ieoJoin_form_head_column">
                      <div className="ieoJoin_form_column_title">{t("Remaining Tokens")}</div>
                      <div className="ieoJoin_form_column_number">{selectedIeo ? calculateRemainingTokens(selectedIeo.total_supply, selectedIeo.registered) : 0}</div>
                    </div>
                    <div className="ieoJoin_form_head_column">
                      <div className="ieoJoin_form_column_title">{t("Max Purchasable Quantity")}</div>
                      <div className="ieoJoin_form_column_number">{selectedIeo?.total_supply}</div>
                    </div>
                  </div>
                  <div className="ieoJoin_form_input">
                    <input 
                      type="text" 
                      id="amount" 
                      className="textGray600 text14590"
                      placeholder={t("Enter quantity")}
                      value={amount} 
                      onChange={(e) => setAmount(Number(e.target.value))}
                      max={selectedIeo ? selectedIeo.total_supply - selectedIeo.registered : 0}
                    />
                    <div className="flex items-center gap-4">
                      <div className="text14510 textGray600">{selectedIeo?.symbol}</div>
                      <div className="w-[2px] h-5 bg-slate-800"></div>
                      <div>
                        <button className="number_yellow text14590 cursor-pointer" onClick={handleFillAll}>{t("All")}</button>
                      </div>
                    </div>
                  </div>
                  <div className="ieoJoin_form_row">
                    <div className="flex items-center justify-between w-full">
                      <div className="ieoJoin_form_column_title">{t("Amount")}</div>
                      <div className="ieoJoin_form_column_number">{selectedIeo?.symbol}</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="ieoJoin_form_column_title">{t("End Time")}</div>
                      <div className="ieoJoin_form_column_number">{selectedIeo?.end_date ? new Date(selectedIeo.end_date).toLocaleString() : ''}</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="ieoJoin_form_column_title">{t("Total Payment")}</div>
                      <div className="ieoJoin_form_column_number number_yellow">{calculatePayment(amount, selectedIeo?.value || 0)} USDT</div>
                    </div>
                  </div>
                </div>
                <div className="card_ieoJoin_button">
                  <button type="button" className="textWhite text14510" onClick={handleRegister}>
                    {t("Register")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      )}

    </div>
  );
};

export default TableIeo;

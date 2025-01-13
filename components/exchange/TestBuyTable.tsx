import React, { useEffect } from "react";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setBuyAmount,
  setSellAmount,
  setSellPrice,
  setBuyPrice,
} from "state/reducer/exchange";
import useTranslation from "next-translate/useTranslation";
import { formatCurrency } from "common";
import { RootState } from "state/store";
const TestBuyTable = ({ buy, show }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { dashboard } = useSelector((state: RootState) => state.exchange);

  const changeSellPrice = (price: number, amount: number) => {
    dispatch(setSellPrice(price));
    dispatch(setSellAmount(amount));
    dispatch(setBuyAmount(amount));
    dispatch(setBuyPrice(price));
  };
  const [currentBaseIndex, setCurrentBaseIndex] = React.useState(0);
  const [buyData, setBuyData] = React.useState<any>([]);
  const [summary, setSummary] = React.useState<any>({
    amount: 0,
    total: 0,
  });

  const generateOrders = (baseOrder: any) => {
    const orders = [];
    const basePrice = parseFloat(baseOrder.price);
    const baseAmount = parseFloat(baseOrder.amount);
    let maxTotal = 0;

    for (let i = 0; i < show; i++) {
      const price = (basePrice - (i * 0.001)).toFixed(8);
      const randomOffset = (Math.random() * 199998 - 99999).toFixed(8); // -999 -> 999
      const amount = (baseAmount + parseFloat(randomOffset)).toFixed(8);
      const total = (parseFloat(price) * parseFloat(amount)).toFixed(8);

      const order = {
        created_at: new Date().toISOString(),
        status: 0,
        processed: "0.00000000",
        price: price,
        amount: amount,
        total: total,
        my_size: 0,
        is_favorite: null,
        percentage: "0"
      };
      
      orders.push(order);
      const orderTotal = parseFloat(total);
      if (orderTotal > maxTotal) maxTotal = orderTotal;
    }

    // Calculate percentages
    orders.forEach(order => {
      order.percentage = ((parseFloat(order.total) / maxTotal) * 100).toFixed(8);
    });

    return orders;
  };

  useEffect(() => {
    const updateOrders = () => {
      const baseOrder = buy[currentBaseIndex];
      if (!baseOrder) return;
      const newOrders = generateOrders(baseOrder);
      setBuyData(newOrders);
    };

    updateOrders();

    const intervalId = setInterval(() => {
      setCurrentBaseIndex((prevIndex: any) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= buy.length ? 0 : nextIndex;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [buy, currentBaseIndex, show]);

  return (
    <div className="col-12 px-0">
      {buyData?.length > 0 ? (
        buyData?.map((item: any, index: number) => (
          <Tooltip
            placement={"right"}
            overlay={
              <span>
                <span>
                  {t("Avg Price")}:{" "}
                  {formatCurrency(
                    item.price,
                    dashboard?.order_data?.total?.trade_wallet?.pair_decimal
                  )}
                </span>
                <br />
                <span>
                  {t("Amount")}:{" "}
                  {formatCurrency(
                    summary.amount,
                    dashboard?.order_data?.total?.trade_wallet?.pair_decimal
                  )}
                </span>
                <br />

                <span>
                  {t("Total")}:{" "}
                  {formatCurrency(
                    summary.total,
                    dashboard?.order_data?.total?.trade_wallet?.pair_decimal
                  )}
                </span>
              </span>
            }
            trigger={["hover"]}
            key={index}
            overlayClassName="rcTooltipOverlay"
          >
            <div
              className="row mx-0 position-relative"
              onClick={() => changeSellPrice(item.price, item.amount)}
              onMouseEnter={() => {
                const selectedIndex = index;
                const lastIndex = buy.length - 1;
                let sumtotal = 0;
                let sumAmount = 0;
                for (let i = selectedIndex; i <= lastIndex; i++) {
                  sumtotal += parseFloat(buy[i].total);
                  sumAmount += parseFloat(buy[i].amount);
                }
                setSummary({
                  amount: sumAmount,
                  total: sumtotal,
                });
              }}
            >
              <div className="col-4 px-0">
                <div className="asset">
                  <span className="redText order-book-body-text">
                    {formatCurrency(
                      item.price,
                      dashboard?.order_data?.total?.trade_wallet?.pair_decimal
                    )}
                  </span>
                </div>
              </div>
              <div className="col-4 px-0">
                <div className="asset">
                  <span className="asset-name order-book-body-text">
                    {formatCurrency(
                      item.amount,
                      dashboard?.order_data?.total?.trade_wallet?.pair_decimal
                    )}
                  </span>
                </div>
              </div>
              <div className="col-4 px-0">
                <div className="asset">
                  <span className="asset-name order-book-body-text">
                    {formatCurrency(
                      item.total,
                      dashboard?.order_data?.total?.trade_wallet?.pair_decimal
                    )}
                  </span>
                </div>
              </div>
              <div
                className="progress-red"
                style={{
                  width: `${
                    parseFloat(item?.percentage)
                      ? parseFloat(item?.percentage)
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </Tooltip>
        ))
      ) : (
        <div className="odd">
          <div className="dataTables_empty">
            {t("No data available in table")}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestBuyTable;

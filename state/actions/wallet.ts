import React from "react";
import {
  WalletListApi,
  WalletDepositApi,
  WalletWithdrawApi,
  WalletWithdrawProcessApi,
  GetWalletAddress,
} from "service/wallet";
import { toast } from "react-toastify";
import { Dispatch } from 'redux';
import { setLoading, setHistoryData } from 'state/reportsSlice';
import { fetchIeoTransactionHistory } from 'service/wallet';

export const WalletListApiAction = async (
  url: string,
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setProcessing(true);
  const response = await WalletListApi(url);
  setProcessing(false);
  return response.data;
};
export const SearchObjectArrayFuesJS = (
  array: any,
  setArray: React.Dispatch<React.SetStateAction<any>>,
  search: string
) => {
  if (!search) setArray(array.data);
  const newArray = array.data.filter((item: any) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  setArray(newArray);
};

export const WalletDepositApiAction = async (id: number) => {
  const response = await WalletDepositApi(id);

  return response;
};

export const WalletWithdrawApiAction = async (id: number) => {
  const response = await WalletWithdrawApi(id);

  return response;
};

export const WalletWithdrawProcessApiAction = async (
  credential: any,
  setProcessing: React.Dispatch<React.SetStateAction<any>>
) => {
  setProcessing(true);
  const response = await WalletWithdrawProcessApi(credential);
  if (response.success === true) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
  setProcessing(false);
  return response;
};
export const GetWalletAddressAction = async (
  credential: any,
  setNetwork: any,
  setDependecy: any
) => {
  const response = await GetWalletAddress(credential);
  if (response.success === true) {
    toast.success(response.message);
    setNetwork(response.data);
    setDependecy(Math.random() * 1000);
  } else {
    toast.error(response.message);
  }
  return response;
};

export const AllIeoTransactionHistoryAction = (
  selectedLimit: string,
  pageNumber: number,
  sortingColumn: string,
  sortingOrder: string,
  search: string
) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await fetchIeoTransactionHistory({
      limit: parseInt(selectedLimit),
      page: pageNumber,
      sort: sortingColumn,
      sort_order: sortingOrder,
      search,
    });
    console.log("API Response:", response);
    dispatch(setHistoryData({
      items: response.data.data,
      pagination: response.data.pagination,
    }));
  } catch (error) {
    console.error("Error fetching transaction history:", error);
  } finally {
    dispatch(setLoading(false));
  }
};
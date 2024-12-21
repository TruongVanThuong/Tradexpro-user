import request from "lib/request";

export const getIeo = async () => {
  const { data } = await request.get(`/get-ieo-list`);
  return data;
};

export const getIeoUserRegistered = async () => {
  const { data } = await request.get(`/get-ieo-user-registered`);
  return data;
};

export const postRegisterIeo = async (
  ieo_id: number,
  amount: number,
) => {
  const { data } = await request.post(`/register-ieo`, {
    ieo_id: ieo_id,
    amount: amount,
  });
  return data;
};

export const postReceiveIeo = async (itemId: number) => {
  try {
    const { data } = await request.post(`/receive-ieo`, { itemId });
    return data;
  } catch (error) {
    console.error("Error while posting IEO:", error);
    throw error;
  }
};

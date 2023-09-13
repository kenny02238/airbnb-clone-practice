export const responseHandler = async (res: any) => {
  const response = await res.json();
  if (res.ok) {
    return response;
  }
  throw `${response.error[Object.keys(response.error)[0]][0]}`;
};

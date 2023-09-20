export const responseHandler = async (res: any) => {
  const response = await res.json();
  if (res.ok) {
    return response;
  }
  if (response.error[Object.keys(response.error)[0]] instanceof Array) {
    throw `${response.error[Object.keys(response.error)[0]][0]}`;
  }
  throw `${response.error[Object.keys(response.error)[0]]}`;
};

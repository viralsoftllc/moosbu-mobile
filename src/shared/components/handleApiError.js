import notifyMessage from '../hooks/notifyMessage';

export default function handleApiError(error) {
  console.log('error from custome handler');
  console.log(error);
  console.log('error response');
  console.log(error?.response);
  console.log('Error data object');
  console.log(error?.response?.data);
  console.log('Error message');
  console.log(error?.response?.data?.message);

  if (error?.response?.status >= 500) {
    return notifyMessage(
      'Oops! We could not process at this time, please try again later.',
    );
  }

  if (error?.response?.status === 401) {
    console.log('Unauthorised');
    return notifyMessage(
      error?.response?.data?.message || 'Unauthorised to perform action',
    );
  }

  if (error?.response?.data?.message) {
    return notifyMessage(error?.response?.data?.message);
  }

  if (error?.data?.message) {
    return notifyMessage(error?.data?.message);
  }

  return notifyMessage('Something went wrong');
  // if (error?.message?.toLowerCase()?.includes('network error')) {
  //   return notifyMessage('Network unvailable');
  // } else if (error?.response?.status === 401) {
  //   // localStorage.removeItem("token");
  //   return notifyMessage(error?.response?.data?.message);
  // } else if (error?.response?.status >= 400) {
  //   return notifyMessage(error?.response?.data?.message);
  // } else if (error?.message?.toLowerCase()?.includes('timeout')) {
  //   return notifyMessage('The server took too long to respond');
  // } else {
  //   return notifyMessage('Something went wrong');
  // }
}

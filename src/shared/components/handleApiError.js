import notifyMessage from '../hooks/notifyMessage';

export default function handleApiError(error) {
  console.log('error from custom handler');
  console.log(error);

  const responseData = error?.response?.data;
  const errorMessage = responseData?.message || error?.data?.message;

  console.log('error response', error?.response);
  console.log('Error data object', responseData);
  console.log('Error message', errorMessage);

  if (error?.response?.status >= 500) {
    return notifyMessage(
      'Oops! We could not process at this time, please try again later.',
    );
  }

  if (error?.response?.status === 401) {
    console.log('Unauthorized');
    return notifyMessage(errorMessage || 'Unauthorized to perform action');
  }

  if (errorMessage) {
    return notifyMessage(errorMessage);
  }

  return notifyMessage('Something went wrong');
  // Add more specific error handling if needed
}

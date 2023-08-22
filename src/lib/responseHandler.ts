export function responseHandler(params: any) {
  const { data, message, status, error } = params;
  return {
    data: data || null,
    message: message || null,
    status: status || null,
    error: error || null,
  };
}

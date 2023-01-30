export const API_URL = 'http://localhost:3001';
export const apiConstants = {
  BASE_URL: API_URL,  
  REGISTRATION_URL: API_URL + "/device_details/adddevice",
  DEVICELISTURL: API_URL + "/device_details/devicedetailslist",
  DEVICEUPDATE_URL: API_URL + "/device_details/deviceupdate/",
  DEVICEFILTER_URL: API_URL + "/device_details/devicefilter",
  DELETEDEVICE_URL: API_URL + "/device_details/deletedevice/",
  DEVICETRANSACTION_URL: API_URL + "/device_transaction/devicetransactionlist",
  ADDTRANSACTION_URL: API_URL + "/device_transaction/adddevicetransaction",
  HISTORY_URL: API_URL + "/device_details/gethistory",
  DELETE_MANY: API_URL + "/device_details/bulkdelete",

}
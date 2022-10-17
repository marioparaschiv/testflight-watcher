export const BASE_URL = 'https://testflight.apple.com';

export const Routes = {
   STATUS: (accountId, code) => BASE_URL + `/v3/accounts/${accountId}/ru/${code}`,
   REDEEM: (accountId, code) => BASE_URL + `/v3/accounts/${accountId}/ru/${code}/accept`
};

const { CLIENT_ENV } = process.env;

let tempBaseUrl = '';
switch (CLIENT_ENV) {
  case 'dev':
    tempBaseUrl = 'http://10.1.1.35:8030';
    break;
  case 'test':
    tempBaseUrl = '';
    break;
  default:
    tempBaseUrl = '';
    break;
}

export const baseUrl = tempBaseUrl;

// page api
export const apiCalcIndexGetList = '/api/users/income/findByUserId';

// other
export const customerPhone = '400-1667-881';

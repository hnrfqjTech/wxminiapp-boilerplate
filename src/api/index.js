import $http from '@/utils/http';

export const getData = (url, data, options) => {
  return $http.get(url, data, options);
}

export const postData = (url, data, options) => {
  return $http.post(url, data, options);
}

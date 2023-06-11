const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
};

export const getCompanies = () => {
  return fetch(
    "https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/companies.json"
  ).then(handleResponse);
};

export const getOwnerships = () => {
  return fetch(
    "https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/ownerships.json"
  ).then(handleResponse);
};

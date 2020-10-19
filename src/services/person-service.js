import config from "../../config";
const PeopleService = {
  getAllPeople() {
    return fetch(`${config.REACT_APP_API_BASE}/peoplle`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default PeopleService;

import config from "../../config";

const PetService = {
  getAllPets() {
    return fetch(`${config.REACT_APP_API_BASE}`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteCat() {},
  deleteDog() {},
};

export default PetService;

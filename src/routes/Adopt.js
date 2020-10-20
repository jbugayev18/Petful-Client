import React, { Component } from "react";
import config from "../config";
import PetService from "../services/pet-service";
import PeopleService from "../services/person-service";
import "./Adopt.css";

export class Adopt extends Component {
  constructor() {
    super();
    this.state = {
      cats: [],
      dogs: [],
      people: [],
      pets: {},
      OK: false,
      fullName: "",
      currentUser: "",
      isHidden: true,
    };
  }

  componentDidMount() {
    PetService.getAllPets().then((pets) => {
      this.setState({
        cats: [pets.cat],
        dogs: [pets.dog],
      });
    });
    PeopleService.getAllPeople()
      .then((people) => {
        this.setState({ people: people.people });
      })
      .catch((e) => console.error(e));
  }
  // }

  petCountdown = () => {
    let countdown = setInterval(() => {
      if (this.state.people.length < 2) {
        this.addToQueue();
        this.setState({
          isHidden: false,
        });
        return clearInterval(countdown);
      }
      fetch(`${config.REACT_APP_API_BASE}/people`, {
        method: "DELETE",
        header: {
          "content-type": "application/json",
        },
      }).then(() => this.fetchData());
      this.adopted();
    }, 4000);
  };

  addToQueue = () => {
    let peopleNames = [
      "Sam Francisco",
      "Patricio Lombard",
      "Naomi Ger",
      "Diorian Grey",
      "Law Gaurd",
      "Kristina Si",
    ];

    var addPeople = setInterval(() => {
      if (this.state.people.length > 4) {
        return clearInterval(addPeople);
      }

      let index = Math.floor(Math.random() * peopleNames.length);
      let person = peopleNames[index];

      fetch(`${config.REACT_APP_API_BASE}/people`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ person }),
      })
        .then((res) => res.json())
        .then(() => this.fetchData());
    }, 4000);
  };

  fetchData = () => {
    fetch(`${config.REACT_APP_API_BASE}/pets`)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          cats: [res.cat],
          dogs: [res.dog],
          pets: res,
          OK: true,
        })
      );
    fetch(`${config.REACT_APP_API_BASE}/people`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ people: res.people });
      });
  };

  adopted = (petId = null) => {
    let counter = petId ? petId : this.state.people.length;
    if (counter === 0) {
      return;
    }
    if (counter % 2 === 0) {
      fetch(`${config.REACT_APP_API_BASE}/pets`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ type: "cats" }),
      }).then(() => this.fetchData());
    } else {
      fetch(`${config.REACT_APP_API_BASE}/pets`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ type: "dogs" }),
      }).then(() => this.fetchData());
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    let person = this.state.fullName;
    this.setState({ currentUser: person });
    fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ person }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          people: [...resJson.people],
        });
      })
      .then(() => this.fetchData());
    this.petCountdown();
  };

  handleAdoptClick = (event) => {
    event.preventDefault();
    fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: "DELETE",
      header: {
        "content-type": "application/json",
      },
    }).then(() => this.fetchData());
    this.adopted(event.target.value);
    alert("You adopted a pet!");
    this.setState({
      isHidden: true,
    });
  };

  render() {
    let hiddenClass = this.state.isHidden ? "hiddenClass" : "";
    let cats = this.cats ? this.state.cats : [];
    let catCard = cats.map((cat) => {
      return (
        <div key="1" className="landing-content">
          <img src={cat} alt="Landing Cat" />
          <h2>Name: {cat.name}</h2>
          <p>Gender: {cat.gender}</p>
          <p>Age: {cat.age}</p>
          <p>Breed: {cat.breed}</p>
        </div>
      );
    });
    let dogs = this.state.dogs ? this.state.dogs : [];

    let dogCard = dogs.map((dog) => {
      return (
        <div key="1" className="landing-content">
          <img src={dog.imageURL} alt="Landing Dog" />
          <h2>Name: {dog.name}</h2>
          <p>Gender: {dog.gender}</p>
          <p>Age: {dog.age}</p>
          <p>Breed: {dog.breed}</p>
        </div>
      );
    });

    let people = this.state.people ? this.state.people : [];

    let nextInLine = people.map((people, i) => {
      return (
        <div key={i}>
          <li className="people-list">{people}</li>
        </div>
      );
    });

    return (
      <div>
        <div>
          <h2>Let's See Who Is In Line?</h2>
          <h2>Cats</h2>
          <button
            className={`adoptCat-button ${hiddenClass}`}
            onClick={this.handleAdoptClick}
            value="2"
          >
            Adopt This Cat!{" "}
          </button>
          {catCard}
        </div>
        <h2>Dogs</h2>
        <button
          className={`adoptDog-button ${hiddenClass}`}
          onClick={this.handleAdoptClick}
          value="1"
        >
          Adopt This Dog!{" "}
        </button>
        {dogCard}
        <section>
          <h2>Let's See Who Is In Line To Adopt! </h2>
          <ol className="landing-content">{nextInLine}</ol>
        </section>
        <form onSubmit={this.onSubmit}>
          <h1>Get in Line!</h1>
          <div className="landing-content">
            <label htmlFor="full-name">Enter Your Name</label>
            <br />
            <input
              onChange={(event) =>
                this.setState({ fullName: event.currentTarget.value })
              }
              type="text"
              id="full-name"
            />
            <br />
            <br />
            <button>Join Queue</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Adopt;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./About.css";

export default class AboutPage extends Component {
  render() {
    return (
      <div className="about-explaination">
        <p>
          Petful is an animal shelter which allows adoption of cats and dogs of
          all shapes and sizes. No one enjoys to live in quarantine, so why not
          bring a fury friend back into your household? Due to the high demand
          of adopting a fury friend during pandemic, our shelter has implemented
          a "First-Come, First-Out" strategy in which a customer can adopt an
          animal that came to the shelter first. Eager to adopt? Step right in line 
          to get paired with your new member of your family. 
        </p>

        <br />

        <img
          className="About-Img"
          src="https://images.pexels.com/photos/38867/pexels-photo-38867.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          alt="Cat High-Pawing with Human Hand"
        />
        <div className="buttons">
          <Link to={"/adopt"}>
            <button type="submit">Find a Pet </button>
          </Link>
        </div>
      </div>
    );
  }
}

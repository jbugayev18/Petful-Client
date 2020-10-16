import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class LandingPage extends Component {
    render()
        return (
            <div> 
                <div className="bio-petful">
                <h1>Read About Petful</h1>
                    <Link to={'/about'}><p>Read about Petful</p></Link>
                </div> 
            <div className='landing-page-info'>
                <h2> The Process of Adoptation </h2>
                <p> Hello there! Are you ready to emBARK on your journey to find your new 
                Purrrrfect furry friend? Petful may work differently from other shelters. 
                Pets will be adopted based on a first come, first adopt concept. The animal that 
                came into the shelter first will be the animal that is first up for adoption. The customer 
                will also be placed into a queue and will have to wait their turn until they are provided the 
                first animal that is currently in the queue. We promise the process is not as ruff as it sounds! 
                So step in line soon! 
                </p>
            
            
            
            </div>
        )
}




export default LandingPage
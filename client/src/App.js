import React, {useReducer} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './App.css';

import {InputField} from './input';

const initialState = {
  name: '',
  email: '',
  message: ''
}

const reducer = (state, {field, value}) => {
  return {
    ...state,
    [field]: value
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onChange = (e) => {
    dispatch({field: e.target.name, value: e.target.value})
  }
  const {name, email, message} = state

  const handleSubmit = () => {
    console.log({name, email, message})
  }

  return (
    <div className="App">
      <section>
        <div className='form'>
          <h1 className='header-text'>Let's talk</h1>
          <p>To request a quote or want to meet for a coffee, contact us directly or fill out the form and we will get back to you promptly.</p>
          <InputField value={name} label='name' required onChange={onChange}/>
          <InputField value={email} label='email' required onChange={onChange}/>
          <InputField value={message} label='message' onChange={onChange} textArea required placeholder='Type something you want...'/>
          <button onClick={handleSubmit}>Send Message</button>
        </div>
        <div className='aside'>
          <div className='image'>
            <img style={{width: '100%'}} src={require('./Group.png')} alt="message icon"/>
          </div>
          <p><span><FontAwesomeIcon icon={faMapMarkerAlt} /></span> 151 New Park Ave, Hatford, CT 06106 United State</p>
          <p><span><FontAwesomeIcon icon={faPhoneAlt} /></span> +1 (203) 302-9545</p>
          <p><span><FontAwesomeIcon icon={faEnvelope} /></span> contactus@inveritasoft.com</p>  
          <div className='social'>
            <a href='#'><FontAwesomeIcon style={{color: '#5780DA', height: '30px', width:'30px'}} icon={faFacebook} /></a>
            <a href='#'><FontAwesomeIcon style={{color: '#42C5F3', height: '30px', width:'30px'}} icon={faTwitter} /></a>
            <a href='#'><FontAwesomeIcon style={{color: '#B291CF', height: '30px', width:'30px'}} icon={faInstagram} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

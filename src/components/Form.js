import React from 'react'

const Order = {
  
}

const Contact = {
  
}

const Commission = {
  
}

const Form = (props) => {
  //props: form type, data (for autofill on orderform, etc)
  return (
    <section id="form">
    
      <form name="contact" method="POST" netlify>
        <div className="input-holder">
          <label for="text"> Name </label>
          <input id="text" type="text" name="name" required value="" />
        </div>
        <div className="input-holder">
          <label for="text"> Email </label>
          <input id="text" type="email" name="email" required value="" />
        </div>
        <div className="input-holder">
          <textarea className="form-main-input" name="name" rows="8" cols="80" placeholder=" Your Message" required></textarea>
        </div>
        <input type="submit" value="Send" />
      </form>
    
    
    </section>  
  )
}

export default Form
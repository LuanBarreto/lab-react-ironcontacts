import logo from './logo.svg';
import './App.css';
import contacts from "./contacts.json";
import React from 'react';
import './ContactList.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );

class App extends React.Component {

  state = {
    contactsList: contacts.slice(0, 5)
  }

  randomContact = () => {
    let randomNumber = Math.floor(Math.random() * contacts.length)
    this.setState((state) => ({
      contactsList: [...state.contactsList, contacts[randomNumber]]
    }));
  }

  sortAlphabet = () => {
    let sorted = this.state.contactsList.sort(function (a, b) {
      let nameA = a.name;
      let nameB = b.name;
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    this.setState((state) => ({
      contactsList: sorted

    }));
  }

  sortPopular = () => {
    let sorted = this.state.contactsList.sort(function (a, b) {
      let nameA = a.popularity;
      let nameB = b.popularity;
      if (nameA < nameB) return 1;
      if (nameA > nameB) return -1;
      return 0;
    });

    this.setState((state) => ({
      contactsList: sorted

    }));
  }

  // delete = (id) => {      
  //  }
  deleteCeleb = (id) => {
    const newContacts = [...this.state.contactsList];
    const index = newContacts.findIndex(contact => contact.id === id);
    newContacts.splice(index, 1);
    this.setState({
      contactsList: newContacts
    })
    //   return {
    //     contacts: state.contactsList.filter((contact) => {
    //       return contact.id !== id
    //     })
    //   }
    // })
  }


  renderAllInitialsContacts = () => {
    const output = this.state.contactsList.map((contact) => {
      let popularitySpliced = String(contact.popularity).slice(0, 5)
      return (


        <tr key={contact.id}>
          <td><img src={contact.pictureUrl} alt="celeb" /></td>
          <td>{contact.name}</td>
          <td>{popularitySpliced}</td>
          <td><button onClick={() => this.deleteCeleb(contact.id)}> Delete</button></td>
        </tr>

      )
    })
    return output
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="Celeb">IronContacts</h1>
          <h2 className="On-click">
            <button onClick={this.randomContact}> Add Random Contact</button>
            <button onClick={this.sortAlphabet}> Sort Alphabeticaly</button>
            <button onClick={this.sortPopular}> Sort by Popularity</button>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAllInitialsContacts()}
             </tbody>
          </table>
        </header>
      </div>


    );
  }
}

export default App;
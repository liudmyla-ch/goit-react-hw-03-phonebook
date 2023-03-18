import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contact-form/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contact-list/ContactList';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  LOCALSTORAGE_KEY = 'contacts';

  componentDidMount() {
    const localStorageSavedContacts = JSON.parse(
      localStorage.getItem(this.LOCALSTORAGE_KEY)
    );
    const { contacts } = this.state;

    if (contacts.length === 0 && !localStorageSavedContacts) {
      return;
    }

    if (contacts.length===0 && localStorageSavedContacts.length > 0)
      this.setState({
        contacts: localStorageSavedContacts,
      });
    return;
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(contacts));
  }

  onSubmitForm = values => {
    const { name } = values;
    const { contacts } = this.state;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts!`);
    } else {
      const newContact = { id: nanoid(), ...values };
      const updatedContacts = [...contacts, newContact];
      this.setState({ contacts: updatedContacts });
    }
  };

  onChangeFilter = evt => {
    const filterValue = evt.target.value;
    this.setState({ filter: filterValue });
  };

  onDeleteContact = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const filterToLoverCase = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLoverCase)
    );
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.onSubmitForm} id={nanoid()} />
        {this.state.contacts.length === 0 ? (
          <></>
        ) : (
          <>
            <h2>Contacts</h2>
            <Filter id={nanoid()} onChangeFilter={this.onChangeFilter} />
            <ContactList
              filteredContacts={filteredContacts}
              onDeleteContact={this.onDeleteContact}
            />
          </>
        )}
      </>
    );
  }
}
export default App;

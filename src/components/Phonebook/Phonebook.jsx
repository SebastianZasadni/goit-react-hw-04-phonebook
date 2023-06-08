import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './Phonebook.module.css';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { ContactsList } from '../ContactsList/ContactsList';

export const Phonebook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('friends'))
  );

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (name, number) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    handleAddContact(contact);
  };

  const handleAddContact = contact => {
    const { name } = contact;

    const isContactExist = () =>
      contacts.find(c => c.name.toLowerCase() === name.toLowerCase());

    isContactExist()
      ? alert(`${name} is already in contacts.`)
      : setContacts([...contacts, contact]);
  };

  const deleteContact = id => {
    const listWithoutDeletedContact = contacts.filter(c => c.id !== id);
    setContacts(listWithoutDeletedContact);
  };

  {
    return (
      <div className={css.sectionPhonebook}>
        <h1>Phonebook</h1>
        <ContactsForm handleSubmit={handleSubmit} />
        <ContactsList contacts={contacts} onDelete={deleteContact} />
      </div>
    );
  }
};

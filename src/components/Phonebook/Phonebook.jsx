import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './Phonebook.module.css';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { ContactsList } from '../ContactsList/ContactsList';
import { Filter } from '../Filter/Filter';

export const Phonebook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('friends'))
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const contact = {
      id: nanoid(),
      name: form.elements.name.value,
      number: form.elements.number.value,
    };
    form.reset();
    handleAddContact(contact);
  };

  const handleFilter = evt => {
    const filter = evt.currentTarget.value;
    setFilter(filter);
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

  const filtrContacts = () => {
    const filtredContacts = contacts.filter(c =>
      c.name.toLowerCase().startsWith(filter.toLowerCase())
    );
    return filtredContacts.map(c => (
      <li key={c.id}>
        {c.name}: {c.number}
        <button type="submit" onClick={() => deleteContact(c.id)}>
          Delete
        </button>
      </li>
    ));
  };

  const showContacts = () => {
    return contacts.map(c => (
      <li key={c.id}>
        {c.name}: {c.number}
        <button type="submit" onClick={() => deleteContact(c.id)}>
          Delete
        </button>
      </li>
    ));
  };

  {
    return (
      <div className={css.sectionPhonebook}>
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={handleSubmit} />
        <Filter onFilter={handleFilter} />
        <ContactsList contacts={filter ? filtrContacts() : showContacts()} />
      </div>
    );
  }
};

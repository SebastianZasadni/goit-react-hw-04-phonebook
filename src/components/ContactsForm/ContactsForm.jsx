import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../Phonebook/Phonebook.module.css';

export const ContactsForm = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputNameHandle = e => setName(e.target.value);
  const inputNumberHandle = e => setNumber(e.target.value);

  const onSubmit = evt => {
    evt.preventDefault();
    if (!name || !number) return;
    handleSubmit(name, number);
    setName(['']);
    setNumber(['']);
  };

  return (
    <div className={css.sectionAddContacts}>
      <form className={css.contactsForm} onSubmit={onSubmit}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={inputNameHandle}
        />
        Phone number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={inputNumberHandle}
        />
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

ContactsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

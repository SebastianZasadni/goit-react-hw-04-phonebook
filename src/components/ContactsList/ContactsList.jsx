import PropTypes from 'prop-types';
import React, { useState } from 'react';
import css from '../Phonebook/Phonebook.module.css';
import { Filter } from 'components/Filter/Filter';

export const ContactsList = ({ contacts, onDelete }) => {
  const [filter, setFilter] = useState('');

  const onFilter = value => {
    setFilter(value);
  };

  const filtrContacts = () => {
    if (!filter) {
      return contacts.map(c => (
        <li key={c.id}>
          {c.name}: {c.number}
          <button type="submit" onClick={() => onDelete(c.id)}>
            Delete
          </button>
        </li>
      ));
    } else {
      const filtredContacts = contacts.filter(c =>
        c.name.toLowerCase().startsWith(filter.toLowerCase())
      );
      return filtredContacts.map(c => (
        <li key={c.id}>
          {c.name}: {c.number}
          <button type="submit" onClick={() => onDelete(c.id)}>
            Delete
          </button>
        </li>
      ));
    }
  };

  return (
    <div className={css.sectionContacts}>
      <Filter handleFilter={onFilter} />
      <h3>Contacts</h3>
      <ul className={css.contactsList}>{filtrContacts()}</ul>
    </div>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import ContactListItem from "../ContactListItem";
import classes from "./ContactList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  isfetchingContacts,
  contactsList,
} from "../../redux/actions/contacts-actions/contactSelectors";
import {
  actionGetContactList,
  actionGetContactListClear,
} from "../../redux/actions/contacts-actions/contactsActions";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ContactDetailModal from "../contact-details-modal";

const ContactsList = (props) => {
  const { companyId = "171", isChecked = false } = props;
  const dispatch = useDispatch();
  const [selectedContact, setSelectedContact] = useState();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsArr, setContactsArr] = useState([]);
  const [currentCompanyId, setCurrentCompanyId] = useState(companyId);

  const contactsDataRef = useRef({});
  const timerRef = useRef();
  const fetchingContacts = useSelector(isfetchingContacts);
  const contacts = useSelector(contactsList);
  // clears staes
  const clearStates = useCallback(() => {
    setTotalPages();
    setCurrentPage(1);
    setContactsArr([]);
    contactsDataRef.current = {};
  }, []);

  //fetch contacts from server
  const fetchServerContact = useCallback(
    (currentPage, searchText) => {
      dispatch(actionGetContactList(currentPage, currentCompanyId, searchText));
    },
    [dispatch, currentCompanyId]
  );

  //handle loader more click
  const handleLoadMore = useCallback(() => {
    if (currentPage <= totalPages) {
      fetchServerContact(currentPage, searchText);
    }
  }, [currentPage, searchText, fetchServerContact, totalPages]);

  // handle enter press
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      clearStates();
      fetchServerContact(1, currentCompanyId, e.target.value || "");
    }
  };

  // get updated text from input
  const handleOnChangeText = (e) => {
    const txt = e.target.value;
    setSearchText(txt);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      clearStates();
      fetchServerContact(1, currentCompanyId, txt || "");
    }, 2000);
  };

  useEffect(() => {
    setSearchText("");
    setTotalPages();
    setCurrentPage(1);
    setContactsArr([]);
    contactsDataRef.current = {};
    setCurrentCompanyId(companyId);
    return () => {
      clearStates();
    };
  }, [companyId, clearStates]);

  useEffect(() => {
    if (!totalPages && contacts) {
      const p = contacts.total / contacts.contacts_ids.length;
      setTotalPages(p);
    }
  }, [contacts, totalPages]);

  useEffect(() => {
    if (contacts && contacts.contacts_ids?.length > 0) {
      setCurrentPage((page) => page + 1);
    }
    if (contacts) {
      contactsDataRef.current = {
        ...contactsDataRef.current,
        ...contacts.contacts,
      };
      if (isChecked) {
        const newIds = contacts.contacts_ids.filter((id) => id % 2 === 0);
        setContactsArr((arr) => [...arr, ...newIds]);
      } else {
        setContactsArr((arr) => [...arr, ...contacts.contacts_ids]);
      }

      dispatch(actionGetContactListClear());
    }
  }, [contacts, dispatch, isChecked]);

  useEffect(() => {
    fetchServerContact(1, currentCompanyId, "");
  }, [currentCompanyId, fetchServerContact]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleItemClick = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  return (
    <div>
      <input
        className={classes.searchBox}
        value={searchText}
        onChange={handleOnChangeText}
        onKeyUp={handleEnterPress}
      />
      <Scrollbars
        autoHeight
        autoHeightMin={0}
        autoHeightMax={200}
        thumbMinSize={30}
        universal={true}
        className={classes.scrollview}
      >
        {fetchingContacts && currentPage === 1 ? (
          <LoadingSpinner />
        ) : (
          <div>
            {contactsArr?.map((id) => {
              const contact = contactsDataRef.current[id];
              return (
                <ContactListItem
                  name={contact.first_name}
                  number={contact.phone_number}
                  onClick={() => {
                    handleItemClick(contact);
                  }}
                />
              );
            })}
            {fetchingContacts && currentPage > 1 ? (
              <LoadingSpinner />
            ) : (
              <button onClick={handleLoadMore} className={classes["load-more"]}>
                {contactsArr.length > 0 ? "Load more" : "No contact found."}
              </button>
            )}
          </div>
        )}
      </Scrollbars>
      {showModal && (
        <ContactDetailModal
          contact={selectedContact}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};
export default React.memo(ContactsList);

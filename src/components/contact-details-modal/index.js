import React from "react";
import Button from "../button";
import "./ContactDetailModal.scss";
import { Color3 } from "../../styles/colors";

const ContactDetailModal = (props) => {
  const { onCloseModal, contact } = props;
  return (
    <div>
      <div className="Backdrop"></div>
      <div className={"ModalCSS ModalOpen"}>
        <h1>{"Contact Detail"}</h1>
        <div className={"row"}>
          <label>First Name: {contact.first_name || "NA"}</label>
        </div>
        <div className={"row"}>
          <label>Last Name: {contact.last_name || "NA"}</label>
        </div>
        <div className={"row"}>
          <label>Number: {contact.phone_number || "NA"}</label>
        </div>
        <div className={"row marginUP"}>
          <label>Address: {contact.address || "NA"}</label>
        </div>
        <Button
          label="Close"
          onClick={onCloseModal}
          style={{ backgroundColor: "white", color: Color3 }}
        />
      </div>
    </div>
  );
};

export default ContactDetailModal;

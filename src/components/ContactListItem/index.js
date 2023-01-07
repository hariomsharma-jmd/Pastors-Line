import React from "react";
import classes from "./ContactListItem.module.scss";

const ContactListItem = (props) => {
  const { name, number, onClick } = props;
  return (
    <div onClick={onClick} className={classes.container}>
      <div className={classes.row}>
        <label>Name: {name || "NA"}</label>
      </div>
      <div className={classes.row}>
        <label>Number: {number}</label>
      </div>
    </div>
  );
};
export default ContactListItem;

import React, { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import ContactsList from "../../components/ContactsList";
import "./Modal.scss";
import { Color1, Color2, Color3 } from "../../styles/colors";

const Modal = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  // check whether modal is for all contacts or uscontacts
  const isContactList = useMemo(() => {
    if (pathname.endsWith("allcontacts") || pathname.endsWith("uscontacts")) {
      return true;
    }
    return false;
  }, [pathname]);

  // returns company id based on path url
  const companyId = useMemo(() => {
    if (pathname.endsWith("allcontacts")) {
      return "171";
    }
    if (pathname.endsWith("uscontacts")) {
      return "226";
    }
  }, [pathname]);

  // get page name
  const getPageName = useCallback(() => {
    const arr = pathname.split("/");
    return arr[arr.length - 1];
  }, [pathname]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  const handleAllContactClick = () => {
    if (getPageName() === "modalA") {
      navigate("allcontacts");
    } else {
      setChecked(false);
      navigate("/modalA");
    }
  };
  const handleUsContactClick = () => {
    if (getPageName() === "modalB") {
      navigate("uscontacts");
    } else {
      setChecked(false);
      navigate("/modalB");
    }
  };

  const handleCheckClick = () => {
    setChecked((v) => !v);
  };

  return (
    <>
      <div className="Backdrop"></div>
      <div className={"Modal ModalOpen"}>
        <h1>{props.title}</h1>
        {!isContactList && (
          <Button
            label="All Contacts"
            onClick={handleAllContactClick}
            style={{ backgroundColor: Color1 }}
          />
        )}
        {!isContactList && (
          <Button
            label="US Contacts"
            onClick={handleUsContactClick}
            style={{ backgroundColor: Color2, borderColor: Color2 }}
          />
        )}
        {isContactList && (
          <ContactsList isChecked={checked} companyId={companyId} />
        )}
        <Button
          label="Close"
          onClick={handleCloseModal}
          style={{ backgroundColor: "white", color: Color3 }}
        />
        {!isContactList && (
          <label>
            <input
              checked={checked}
              onChange={handleCheckClick}
              className="checkbox"
              type={"checkbox"}
            />
            Even Only
          </label>
        )}
      </div>
    </>
  );
};

export default Modal;

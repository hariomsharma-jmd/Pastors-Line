import React from "react";
import Button from "../../components/link-button";
import { Color2 } from "../../styles/colors";
import Card from "../../UI/Card";

const MainPage = () => {
  return (
    <Card card="centered">
      <Button label="Button A" to="modalA" />
      <Button
        label="Button B"
        to="modalB"
        style={{ backgroundColor: Color2, borderColor: Color2 }}
      />
    </Card>
  );
};

export default MainPage;

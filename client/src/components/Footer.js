import React from "react";
import { makeStyles } from "@material-ui/styles";

const style = makeStyles({
  foot: {
    background: "#232f3e",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "start",
    "& div": {
      marginTop: "2.5rem",
      color: "#fff",
      maxWidth: "15%",
      padding: "7px",
      "& h6": {
        paddingLeft: "2rem",
      },

      "& ul": {
        "& li": {
          listStyle: "none",
          fontSize: "85%",
        },
      },
    },
  },
});

function Footer() {
  const classes = style();
  const { foot } = classes;

  return (
    <footer className={foot}>
      <div>
        <h6>Team</h6>
        <ul>
          <li>Nguyễn Minh Châu</li>
          <li>Lê Chí Hải</li>
          <li>Lê Chu báu</li>
          <li>Trần Hoàng Khang</li>
          <li>Trần Minh Tâm</li>
        </ul>
      </div>
      <div>
        <h6>Contact With Us</h6>
        <ul>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

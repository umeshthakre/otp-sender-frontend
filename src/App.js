import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import contacts from "./contacts.json";
import { ListSubheader, Typography } from "@mui/material";
import Contact from "./pages/Contact";
import SendMessage from "./pages/SendMessage";

const url = "https://otp-sender-api.onrender.com/allContacts";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/send-message" element={<SendMessage />} />
      </Routes>
    </>
  );
}

const Menu = () => {
  const [sentMessages, setSentMessages] = useState(false);

  const getAllMessages = async () => {
    const allMessages = await fetch(url);

    return allMessages.json();
  };

  useEffect(() => {
    const allMessages = getAllMessages().then((messages) => {
      console.log(messages);
      setSentMessages(messages.messages);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center mt-4">
        <Typography sx = {{fontSize:22}}>OTP Sender Application</Typography>
      </div>
      <div className="w-full h-full min-h-screen  grid grid-cols-12">
        <div className="col-span-6 flex justify-center mt-12">
          <List
            subheader={<ListSubheader
              sx = {{fontSize:16}}
            >Contacts</ListSubheader>}
            sx={{ width: "100%", maxWidth: 360 }}
          >
            {contacts.map((contact) => {
              const name = contact.name;
              const number = contact["phone-number"];
              console.log(number);
              return (
                <Link
                  to={`/contact`}
                  state={{
                    name: contact.name,
                    number: contact["phone-number"],
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ContactsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={contact.name} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </div>
        <div className="col-span-6 flex justify-center mt-12">
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 500,
              "& ul": { padding: 0 },
            }}
            subheader={<ListSubheader
            sx = {{fontSize:16}}
            >Sent Messages</ListSubheader>}
          >
            {sentMessages
              ? sentMessages.map((mes) => {
                  var created_date = new Date(mes.createdAt);
                  var months = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ];
                  var year = created_date.getFullYear();
                  var month = months[created_date.getMonth()];
                  var date = created_date.getDate();
                  var hour = created_date.getHours();
                  var min = created_date.getMinutes();
                  var sec = created_date.getSeconds();
                  var time =
                    date +
                    "," +
                    month +
                    " " +
                    year +
                    " " +
                    hour +
                    ":" +
                    min +
                    ":" +
                    sec;
                  return (
                    <ListItem>
                      <ListItemText
                        primary={mes.name}
                        secondary={"otp: " + mes.otp + "  Date: " + time}
                      />
                    </ListItem>
                  );
                })
              : ""}
          </List>
        </div>
      </div>
    </>
  );
};

export default App;

import { FormControlUnstyled } from "@mui/base";
import { Label } from "@mui/icons-material";
import {
    Alert,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/system";
import { Input } from "postcss";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const url = "https://otp-sender-api.onrender.com/sendsms";

const SendMessage = () => {
  const [random, setRandom] = useState(null);
  const data = useLocation();
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState("error");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const sendSms = async () => {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        text: text,
        name: data.state.name,
        to: data.state.number,
        otp:random
      }), // body data type must match "Content-Type" header
    });
    return response.json();
  };

  const sendReq = async () => {
    setLoading(true);
    console.log("running this");
    const response = await sendSms();
    console.log("res",response);
    if(response.success === true){
        setMessage("your message was sent successfully")
    }else{
        setMessage(response.mesg)
    }
    setLoading(false);
    setOpen(true);
    if(response.success === true){
        setSuccess("success");
    }else{
        setSuccess("error");
    }

  };
  useEffect(() => {
    setRandom(Math.floor(Math.random() * 1000000));
  }, []);
  useEffect(() => {
    setText("Hi, Your OTP is: " + random);
  }, [random]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3"></div>
      <div className="col-span-6 flex flex-col justify-center">
        <Typography sx={{ mt: 4, mb: 1, fontSize: 22 }}>
          Send Message to {data.state.number}
        </Typography>
        <TextField
          color="primary"
          sx={{mt:1, input: { color: "#fffff" } }}
          value={text}
          onChange = {(e)=>setText(e.target.value)}
        ></TextField>
        <TextField
          disabled
          color="primary"
          sx={{mt:1, input: { color: "#fffff" } }}
          value= {"OTP: "+random}
          onChange = {(e)=>setText(e.target.value)}
        ></TextField>
        {loading ? (
          <Button
            sx={{ m: 1, p: 1.5 }}
            onClick={() => {
              sendReq();
            }}
            className="self-start"
            variant="contained"
          >
            <CircularProgress style={{ color: "white" }} />
          </Button>
        ) : (
          <Button
            sx={{ m: 1, p: 1.5 }}
            onClick={() => {
              sendReq();
            }}
            className="self-start"
            variant="contained"
          >
            Send Message
          </Button>
        )}
        {open ? (
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            
            
          >
            <Alert
            severity={success}
            >
                {message}
            </Alert>
          </Snackbar>
        ) : ("")}
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default SendMessage;

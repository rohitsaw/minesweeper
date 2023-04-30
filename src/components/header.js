import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Snackbar from "@mui/material/Snackbar";

function Header({ width, state, dispatch, getDifficultyMenu }) {
  const [snackBar, setSnackBar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const shareUrl = async () => {
    const shareData = {
      title: "MINESWEEPER",
      text: "Try Out This Game!",
      url: window.location.href,
    };
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnackBar(true);
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <div
        style={{
          width: width,
          height: "56px",
          background: "#59870a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "500",
          fontSize: "1.25em",
        }}
      >
        <IconButton
          color="inherit"
          onClick={getDifficultyMenu}
          sx={{ color: "white" }}
        >
          <div style={{ fontSize: 16 }}> {state.level}</div>
          <ArrowDropDownIcon />
        </IconButton>

        <div
          style={{
            display: "flex",
            flexGrow: 2,
            color: "white",
          }}
        >
          <FlagIcon style={{ color: "#D80005", paddingRight: "10px" }} />
          <span>{state.noOfFlags}</span>
        </div>

        <IconButton
          size="large"
          aria-label="Volume Button"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          sx={{ color: "white" }}
          onClick={() =>
            dispatch({
              type: "setSoundEnabled",
              payload: state.isSoundEnabled ? false : true,
            })
          }
        >
          {state.isSoundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>

        <IconButton
          size="large"
          aria-label="Share Application Link"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={shareUrl}
          sx={{ color: "white" }}
        >
          <ShareIcon />
        </IconButton>
      </div>
      <Snackbar
        open={snackBar}
        autoHideDuration={3000}
        message="Share Not Supported... Link copied in clipboard!"
        onClose={handleClose}
        action={action}
      />
    </>
  );
}

export default Header;

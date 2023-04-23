import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";

function Header({ level, noOfFlags, getDifficultyMenu }) {
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

  const flag = "🚩";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: '#59870a'}}>
        <Toolbar>
          <IconButton color="inherit" onClick={getDifficultyMenu}>
            <div style={{ fontSize: 16, marginLeft: "4px" }}>{level}</div>
            <ArrowDropDownIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, paddingLeft: "20px" }}
          >
            {flag} {noOfFlags}
          </Typography>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={shareUrl}
          >
            <ShareIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snackBar}
        autoHideDuration={3000}
        message="Link copied!"
        onClose={handleClose}
        action={action}
      />
    </Box>
  );
}

export default Header;

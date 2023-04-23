import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const startGame = async () => {
  const result = await Swal.fire({
    title: "Select Difficulty Level",
    showDenyButton: true,
    showCancelButton: true,

    confirmButtonText: "Easy",
    denyButtonText: "Medium",
    cancelButtonText: "Hard",

    // confirmButtonColor: '#3085d6',
    // denyButtonColor : '#3085d6',
    cancelButtonColor: "#f5b042",

    allowOutsideClick: false,
  });

  if (result.isConfirmed) {
    // easy
    return Promise.resolve("Easy");
  } else if (result.isDenied) {
    // medium
    return Promise.resolve("Medium");
  } else if (result.isDismissed) {
    // hard
    return Promise.resolve("Hard");
  }
};

const MyAlert = ({ isWon, msg, functionToExecute }) => {
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: <p>{isWon ? "Good Job!" : "Better Luck Next Time!"}</p>,
    html: <i>{msg}</i>,
    icon: isWon ? "success" : "error",
    allowOutsideClick: false,
    confirmButtonText: "Restart Game."
  }).then(() => {
    return functionToExecute();
  });
};

export const getAlert = (isWon, msg, callbackFn) => {
  MyAlert({
    isWon: isWon,
    msg: msg,
    functionToExecute: callbackFn,
  });
};

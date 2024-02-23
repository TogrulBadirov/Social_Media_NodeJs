// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import PhoneIcon from "@mui/icons-material/Phone";
// import React, { useEffect, useRef, useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import Peer from "peerjs"; // Import peerjs library
// import io from "socket.io-client";
// import "./index.scss";

// const socket = io.connect('http://localhost:5000');

// function VideoChat() {
//   const [me, setMe] = useState("");
//   const [stream, setStream] = useState(null);
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState("");
//   const [callerSignal, setCallerSignal] = useState(null);
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [idToCall, setIdToCall] = useState("");
//   const [callEnded, setCallEnded] = useState(false);
//   const [name, setName] = useState("");
//   const myVideo = useRef(null);
//   const userVideo = useRef(null);
//   const peerRef = useRef(null);

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setStream(stream);
//         if (myVideo.current) {
//           myVideo.current.srcObject = stream;
//         }
//       })
//       .catch((error) => {
//         console.error('Error accessing media devices:', error);
//       });

//     socket.on("me", (id) => {
//       setMe(id);
//       console.log(id);
//     });

//     socket.on("callUser", (data) => {
//       setReceivingCall(true);
//       setCaller(data.from);
//       setName(data.name);
//       setCallerSignal(data.signal);
//     });
//   }, [name]);

//   const callUser = (id) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//     });

//     peer.on("open", () => {
//       socket.emit("callUser", {
//         userToCall: id,
//         signalData: null, // Change this to null because we're not using simple-peer anymore
//         from: me,
//         name: name,
//       });
//     });

//     peer.on("stream", (stream) => {
//       userVideo.current.srcObject = stream;
//     });

//     socket.on("callAccepted", (signal) => {
//       setCallAccepted(true);
//       peer.signal(signal);
//     });

//     peerRef.current = peer;
//   };

//   const answerCall = () => {
//     setCallAccepted(true);

//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//     });

//     peer.on("open", () => {
//       socket.emit("answerCall", { signal: null, to: caller });
//     });

//     peer.on("stream", (stream) => {
//       userVideo.current.srcObject = stream;
//     });

//     peer.signal(callerSignal);

//     peerRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);
//     peerRef.current?.destroy();
//   };

//   return (
//     <section id="videoChat">
//       <h1 style={{ textAlign: "center", color: "#fff" }}>Zoomish</h1>
//       <div className="container">
//         <div className="video-container">
//           <div className="video">
//             {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
//           </div>
//           <div className="video">
//             {callAccepted && !callEnded ? (
//               <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />
//             ) : null}
//           </div>
//         </div>
//         <div className="myId">
//           <TextField
//             id="filled-basic"
//             label="Name"
//             variant="filled"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{ marginBottom: "20px" }}
//           />
//           <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
//             <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
//               Copy ID
//             </Button>
//           </CopyToClipboard>

//           <TextField
//             id="filled-basic"
//             label="ID to call"
//             variant="filled"
//             value={idToCall}
//             onChange={(e) => setIdToCall(e.target.value)}
//           />
//           <div className="call-button">
//             {callAccepted && !callEnded ? (
//               <Button variant="contained" color="secondary" onClick={leaveCall}>
//                 End Call
//               </Button>
//             ) : (
//               <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
//                 <PhoneIcon fontSize="large" />
//               </IconButton>
//             )}
//             {idToCall}
//           </div>
//         </div>
//         <div>
//           {receivingCall && !callAccepted ? (
//             <div className="caller">
//               <h1>{name} is calling...</h1>
//               <Button variant="contained" color="primary" onClick={answerCall}>
//                 Answer
//               </Button>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default VideoChat;

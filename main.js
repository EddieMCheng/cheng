(function() {

  // Define "global" variables
  
  var connectButton = null;
  var disconnectButton = null;
  var sendButton = null;
  var messageInputBox = null;
  var receiveBox = null;
  
  var localConnection = null;   // RTCPeerConnection for our "local" connection
  var remoteConnection = null;  // RTCPeerConnection for the "remote"
  
  var sendChannel = null;       // RTCDataChannel for the local (sender)
  var receiveChannel = null;    // RTCDataChannel for the remote (receiver)
  let firstLocalCandidate=false;
  let firstRemoteCandidate=false;
  // Functions
  
  // Set things up, connect event listeners, etc.
  
  function startup() {
    initButton = document.getElementById('initButton');
    connectButton = document.getElementById('connectButton');
    finalizeButton = document.getElementById('finalizeButton');
    disconnectButton = document.getElementById('disconnectButton');
    sendButton = document.getElementById('sendButton');
    messageInputBox = document.getElementById('message');
    receiveBox = document.getElementById('receivebox');

    // Set event listeners for user interface widgets
    initButton.addEventListener('click', initPeers, false);
    connectButton.addEventListener('click', connectPeers, false);
    finalizeButton.addEventListener('click', finalizePeers, false);
    disconnectButton.addEventListener('click', disconnectPeers, false);
    sendButton.addEventListener('click', sendMessage, false);

    localConnection = new RTCPeerConnection();
    localConnection.ondatachannel = receiveChannelCallback;

    sendChannel = localConnection.createDataChannel("sendChannel");
    sendChannel.onopen = handleSendChannelStatusChange;
    sendChannel.onclose = handleSendChannelStatusChange;

  }

  function initPeers() {

    localConnection.onicecandidate = e =>{
      
      if(e.candidate){
        let jsonCandidate=JSON.stringify(e.candidate);
        console.log("local: "+jsonCandidate);
        if(!firstLocalCandidate){
          localCandidateText.value=codeCandidate(jsonCandidate);
          firstLocalCandidate=true;
        }
        else{
          firstLocalCandidate=false;
        }

      }
        
    }

    
    localConnection.createOffer()
    .then(offer => localConnection.setLocalDescription(offer))
    .then(() =>{ 
        var jsonDesc=JSON.stringify(localConnection.localDescription);
        console.log("offer: "+jsonDesc);
        callerText.value=codeOffer(jsonDesc);

    })
    .catch(handleCreateDescriptionError);
  }
  function connectPeers(){

    let desc=new RTCSessionDescription(JSON.parse(parseOffer(callerText.value)));
    localConnection.setRemoteDescription(desc);

    let candidate = new RTCIceCandidate(JSON.parse(parseCandidate(localCandidateText.value)));
    localConnection.addIceCandidate(candidate);

    localConnection.createAnswer()
      .then(answer => localConnection.setLocalDescription(answer))
      .then(() =>{ 
        var jsonDesc=JSON.stringify(localConnection.localDescription);
        console.log("answer: "+jsonDesc);
        answerText.value=codeAnswer(jsonDesc);
        
        
        let code = codeAnswer(jsonDesc);
        console.log("answer code:"+code);
        let json = parseAnswer(code);
        console.log("answer json:"+json);
    })
    .catch(handleCreateDescriptionError);
  }
  
  function finalizePeers(){
    let desc=new RTCSessionDescription(JSON.parse(parseAnswer(answerText.value)));
      localConnection.setRemoteDescription(desc);
  }
    
  
  function handleCreateDescriptionError(error) {
    console.log("Unable to create an offer: " + error.toString());
  }

  
  function handleLocalAddCandidateSuccess() {
    initButton.disabled = true;
    connectButton.disabled = true;
    finalizeButton.disabled = true;
  }

  // Handle successful addition of the ICE candidate
  // on the "remote" end of the connection.
  
  function handleRemoteAddCandidateSuccess() {
    disconnectButton.disabled = false;
  }

  // Handle an error that occurs during addition of ICE candidate.
  
  function handleAddCandidateError() {
    console.log("Oh noes! addICECandidate failed!");
  }

  // Handles clicks on the "Send" button by transmitting
  // a message to the remote peer.
  
  function sendMessage() {
    var message = messageInputBox.value;
    sendChannel.send(message);
    
    // Clear the input box and re-focus it, so that we're
    // ready for the next message.
    
    messageInputBox.value = "";
    messageInputBox.focus();
  }
  
  // Handle status changes on the local end of the data
  // channel; this is the end doing the sending of data
  // in this example.
  
  function handleSendChannelStatusChange(event) {
    if (sendChannel) {
      var state = sendChannel.readyState;
    
      if (state === "open") {
        messageInputBox.disabled = false;
        messageInputBox.focus();
        sendButton.disabled = false;
        disconnectButton.disabled = false;
        connectButton.disabled = true;
      } else {
        messageInputBox.disabled = true;
        sendButton.disabled = true;
        connectButton.disabled = false;
        disconnectButton.disabled = true;
      }
    }
  }
  
  // Called when the connection opens and the data
  // channel is ready to be connected to the remote.
  
  function receiveChannelCallback(event) {
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleReceiveMessage;
    receiveChannel.onopen = handleReceiveChannelStatusChange;
    receiveChannel.onclose = handleReceiveChannelStatusChange;
  }
  
  // Handle onmessage events for the receiving channel.
  // These are the data messages sent by the sending channel.
  
  function handleReceiveMessage(event) {
    var el = document.createElement("p");
    var txtNode = document.createTextNode(event.data);
    
    el.appendChild(txtNode);
    receiveBox.appendChild(el);
  }
  
  // Handle status changes on the receiver's channel.
  function codeCandidate(json){
    let arr = json.replace("candidate:"," ").split(" ");
    return arr[1]+" "+arr[4]+" "+arr[5]+" "+arr[6]+" "+arr[12];
  }
  function parseCandidate(code){
    let arr=code.split(" ");
    return `{"candidate":"candidate:${arr[0]} 1 udp ${arr[1]} ${arr[2]} ${arr[3]} typ host generation 0 ufrag ${arr[4]} network-cost 999","sdpMid":"0","sdpMLineIndex":0}`
  }
  function codeOffer(json){
    let arr = json.replace("ufrag:"," ").replace("pwd:"," ").replace(/(?:\\[rn])+/g," ").split(" ");
    return arr[2]+" "+arr[22]+" "+arr[24]+" "+arr[27].replace(/:/g,"");
  }
  function parseOffer(code){
    let arr=code.split(" ");
    return `{"type":"offer","sdp":"v=0\\r\\no=- ${arr[0]} 2 IN IP4 127.0.0.1\\r\\ns=-\\r\\nt=0 0\\r\\na=group:BUNDLE 0\\r\\na=msid-semantic: WMS\\r\\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\\r\\nc=IN IP4 0.0.0.0\\r\\na=ice-ufrag:${arr[1]}\\r\\na=ice-pwd:${arr[2]}\\r\\na=ice-options:trickle\\r\\na=fingerprint:sha-256 ${insertColon(arr[3])}\\r\\na=setup:actpass\\r\\na=mid:0\\r\\na=sctp-port:5000\\r\\na=max-message-size:262144\\r\\n"}`
  }
  function codeAnswer(json){
    let arr = json.replace("ufrag:"," ").replace("pwd:"," ").replace(/(?:\\[rn])+/g," ").split(" ");
    return arr[2]+" "+arr[23]+" "+arr[25]+" "+arr[28].replace(/:/g,"");
  }
  function parseAnswer(code){
    let arr=code.split(" ");
    return `{"type":"answer","sdp":"v=0\\r\\no=- ${arr[0]} 2 IN IP4 127.0.0.1\\r\\ns=-\\r\\nt=0 0\\r\\na=group:BUNDLE 0\\r\\na=msid-semantic: WMS\\r\\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\\r\\nc=IN IP4 0.0.0.0\\r\\nb=AS:30\\r\\na=ice-ufrag:${arr[1]}\\r\\na=ice-pwd:${arr[2]}\\r\\na=ice-options:trickle\\r\\na=fingerprint:sha-256 ${insertColon(arr[3])}\\r\\na=setup:active\\r\\na=mid:0\\r\\na=sctp-port:5000\\r\\na=max-message-size:262144\\r\\n"}`
  }  
  function handleReceiveChannelStatusChange(event) {
    if (receiveChannel) {
      console.log("Receive channel's status has changed to " +
                  receiveChannel.readyState);
    }
    
    // Here you would do stuff that needs to be done
    // when the channel's status changes.
  }
  
  function insertColon(str){
    var chunks = str.match(/.{1,2}/g);
    return chunks.join(":");
  }
  // Close the connection, including data channels if they're open.
  // Also update the UI to reflect the disconnected status.
  
  function disconnectPeers() {
  
    // Close the RTCDataChannels if they're open.
    
    sendChannel.close();
    receiveChannel.close();
    
    // Close the RTCPeerConnections
    
    localConnection.close();

  }
  
  // Set up an event listener which will run the startup
  // function once the page is done loading.
  
  window.addEventListener('load', startup, false);
})();

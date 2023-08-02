
import { useState } from 'react';
import styles from './app.module.scss';
declare const chrome: any;

export function App() {
  let currentTab: any;
  const [trackEnabled, updateTrackEnabled] = useState<boolean>(false);
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs: any){
    currentTab = tabs;
    console.log("tabs", tabs);
    const arr = tabs?.[0]?.url?.split('/');
    console.log("url arr", arr);
      const str = arr[arr.length - 1].split('.')[0];
      console.log("url str", str);
      if(!str) return;
    getFromStorage("track_url_list").then((list: any) => {
      const findIndex = list.findIndex((obj: any) => obj?.url?.includes(str));
      if(findIndex >= 0){
        console.log("tracking this url")
        updateTrackEnabled(true);
      }
    })
});

function getFromStorage(key: string){
  return new Promise((resolve, reject) => {
    try{
      chrome.storage.local.get(key, function(result: any) {
        console.log('Value currently is ',  result[key]);
        resolve(result[key]);
      });
    }catch(error){
      console.log("error in getFromStorage");
    }
  })
}



const handleButtonClick = () => {
  console.log("handlebuttonclick --->");
  //for sending a message
chrome.runtime.sendMessage({topic: "track_current", data: currentTab}, function(response: any) {
  console.log("sendmessage ---> ", response);
});
}

//for listening any message which comes from runtime
chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg: any) {
   // Do your work here
   console.log("message recieved in tsx ---> ", msg);
}
  return (
    <>
    <h1>The Bookmark</h1>
    <h3>Tracking enabled: {trackEnabled ? "nabbled": "Not Enabled"}</h3>
    <section>
      <button onClick={handleButtonClick}>Track</button>
    </section>
    </>
  );
}

export default App;

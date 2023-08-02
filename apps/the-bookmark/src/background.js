const storageKey = {
  TRACK_URL_LIST: "track_url_list",
}

const messageTopic = {
  TRACK_CURRENT = "track_current",
}

chrome.tabs.onCreated.addListener((tab) => {
  console.log('tabs:', tab);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log(
    'onAttached ---> tabID:: ' +
    tabId +
    ' changeInfo:: ' +
    JSON.stringify(changeInfo) +
    ' tab :: ' +
    JSON.stringify(tab)
  );
  const arr = tab?.url?.split('/');
  const str = arr[arr.length - 1].split('.')[0];
  let value = await getFromStorage(storageKey.TRACK_URL_LIST);
  let findIndex = value.findIndex(obj => obj?.url?.includes(str));
  if (findIndex < 0) {
    console.log("tracking not requested for this url");
    return;
  }
  console.log("localstorage --->" + chrome.storage);
  if (changeInfo.status === 'complete') {
    chrome.bookmarks.getTree((results) => {
      console.log(results);
      rec(results, tab);
    });
  }
});

const rec = (obj, tab) => {
  if (obj.length) {
    for (let index = 0; index < obj.length; index++) {
      rec(obj[index], tab);
    }
  } else {
    if (obj.hasOwnProperty('children') && obj.children.length) {
      rec(obj?.children, tab);
    } else {
      const arr = tab?.url?.split('/');
      const str = arr[arr.length - 1].split('.')[0];
      if (str) {
        if (obj?.url?.includes(str)) {
          console.log(obj);
          updateBookMark(obj, tab)
          return obj;
        }
      }
    }
  }
};

const updateBookMark = (currntB, newDetail) => {
  if (currntB.id) {
    chrome.bookmarks.update(currntB.id, { url: newDetail.url, title: newDetail.title }, (result) => {
      console.log("updated Bookmark", result)
    })
  }
}


// messenging section 


//for listening any message which comes from runtime
chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg) {
  if (msg?.topic === messageTopic.TRACK_CURRENT) {
    // Do your work here
    let tab = msg?.data?.[0];
    const arr = tab?.url?.split('/');
    const str = arr[arr.length - 1].split('.')[0];
    getFromStorage(storageKey.TRACK_URL_LIST).then(value => {
      let findIndex = value.findIndex(obj => obj?.url?.includes(str));
      if (findIndex >= 0) {
        console.log("already in store for this url");
        value[findIndex] = { url: tab.url, title: tab.title };
        setInStorage(storageKey.TRACK_URL_LIST, value);
      } else {
        console.log("new url value to store",);
        setInStorage(storageKey.TRACK_URL_LIST, [...value, { url: tab.url, title: tab.title }])
      }
    })
    console.log("background js message recieved ---> ", msg)
    return "message recieved by background js"
  }
}
// end messaging section


//storage code section

async function setInStorage(key, value) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ [key]: value }, function () {
        console.log('Value is set to ', value);
        resolve('Value is set to ' + value);
      });
    } catch (error) {
      console.log("error in setInstorgae");
    }
  })
}

function getFromStorage(key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, function (result) {
        console.log('Value currently is ', result[key]);
        resolve(result[key]);
      });
    } catch (error) {
      console.log("error in getFromStorage");
    }
  })
}

/// end storage code section

function foo() {
  if (true) {
    var a = 1;
    let b = 2;
    const c = 3;
    // all the output will be printeed without any ReferenceError
    console.log(a); // 1 
    console.log(b); // 2
    console.log(c); // 3
  }
  console.log(a); // 1
  // let and const variable will give ReferenceError as they are only blocked scoped
  console.log(b); // Uncaught ReferenceError
  console.log(c); // Uncaught ReferenceError
}
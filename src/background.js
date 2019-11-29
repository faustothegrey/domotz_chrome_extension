const axios = require('axios')

chrome.runtime.onConnect.addListener(function (port) {
  port.postMessage({ greeting: 'hello' })
})

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...')
  // create alarm after extension is installed / upgraded
  chrome.alarms.create('refresh', { periodInMinutes: 1, delayInMinutes: 1 })
  // axios.get("http://localhost:8080/events/updates")
})

chrome.alarms.onAlarm.addListener(alarm => {
  console.log(alarm.name) // refresh
  axios.get('http://localhost:8080/events/updates').then( (response) => {
        helloWorld(response.data);
    }
  )
})

function helloWorld (data) {
  console.log('Hello, world!')
  console.log("with data " + JSON.stringify(data))
  // Send message from active tab to background:
    //chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // console.log("sending message ...")
    //chrome.runtime.sendMessage('ciao')
    if (data.events.length > 0){
        chrome.browserAction.setBadgeText({ text: '' + data.events.length })
    }
    else {
        chrome.browserAction.setBadgeText({ text: '' })
    }
}

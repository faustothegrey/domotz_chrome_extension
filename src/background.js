const axios = require('axios')

const CONTACT_URL = 'http://batman:5555' // 'http://localhost:8080/events/updates'
// const CONTACT_URL = 'http://localhost:5555'

chrome.runtime.onConnect.addListener(function (port) {
  port.postMessage({ greeting: 'hello' })
})

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...')
  // create alarm after extension is installed / upgraded
  chrome.alarms.create('refresh', { periodInMinutes: 1, delayInMinutes: 1 })

  // reintialize local storage
  // chrome.storage.local.set({ key: [] }, function () {})
})

chrome.alarms.onAlarm.addListener(alarm => {
  console.log(alarm.name) // refresh
  axios.get(CONTACT_URL + '/events/updates').then(response => {
    helloWorld(response.data)
  })
})

function helloWorld (data) {
  console.log('Updating local storage ...')
  console.log('with data ' + JSON.stringify(data))

  if (data.events.length > 0) {
    chrome.browserAction.setBadgeText({ text: '' + data.events.length })
  }

  chrome.storage.local.get(['key'], result => {
    let currentStorage = []

    console.log(
      'Local storage currently is ' +
        result.key +
        ' (length: ' +
        result.key.length +
        ')'
    )
    
    for (let i = 0; i < result.key.length; i++) {
      currentStorage.push(result.key[i])
    }

    for (let j = 0; j < data.events.length; j++) {
      currentStorage.push(data.events[j])
    }

    console.log('Current storage set to ' + currentStorage)

    chrome.storage.local.set({ key: currentStorage })
  })

  // if (data.events.length > 0) {
  //   chrome.browserAction.setBadgeText({ text: '' + data.events.length })
  // }

  // let currentStorage = []

  // chrome.storage.local.get(['key'], result => {
  //   console.log('storage currently is ' + result.key)
  //   for (let i = 0; i++; i < result.key.length) {
  //     currentStorage.push(result.key[i])
  //   }
  // })

  // // data.events.forEach(newEvent => currentStorage.push(newEvent))
  // for (let j = 0; j++; j < data.events.length) {
  //   currentStorage.push(data.events[j])
  // }

  // chrome.storage.local.set({ key: currentStorage })

  // chrome.storage.local.get(['key'], result => {
  //   console.log('storage has been set to ' + result.key)
  // })
}

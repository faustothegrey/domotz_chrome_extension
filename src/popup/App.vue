<template>
  <div>
    <p>Hello Domotz!</p>
  </div>
</template>

<script>
export default {

  data () {
    return {}
  },
  mount() {
    console.log("On mount has been called ")
    chrome.runtime.onMessage.addListener(
      (message, sender, sendResponse) => {
        console.log("Hey I've got this message " + message)
      });
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>

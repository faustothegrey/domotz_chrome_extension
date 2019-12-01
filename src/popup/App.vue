<template>
<div>
    <p>Hello Domotz!!! {{ events }} </p>
</div>
</template>

<script>
export default {

    data() {
        return {
            events: []
        }
    },
    created() {
        console.log("created called")
        // chrome.runtime.onMessage.addListener(
        //   (message, sender, sendResponse) => {
        //     console.log("Hey I've got this message " + message)
        //     this.cane = " un cane "
        //   });
    },
    mounted() {
        console.log("On mount has been called ")
        chrome.browserAction.setBadgeText({
            text: ''
        })
        chrome.storage.local.get(['key'], (result) => {
            console.log('Value currently is ' + result.key);
            this.events = result.key
        });
    }
}
</script>

<style lang="scss" scoped>
p {
    font-size: 20px;
}
</style>

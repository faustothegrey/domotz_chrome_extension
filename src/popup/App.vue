<template>
<div>
    <p>Hello Domotz!!! {{ cane }} </p>
</div>
</template>

<script>
export default {

    data() {
        return {
            cane: "no cane"
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
            text: '4'
        })
        chrome.storage.local.get(['key'], (result) => {
            console.log('Value currently is ' + result.key);
            this.cane = result.key
        });
        // this.cane = 'mounted cane'
    }
}
</script>

<style lang="scss" scoped>
p {
    font-size: 20px;
}
</style>

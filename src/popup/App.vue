<template>
<div class="popup grid">
    <template v-for="(event, index) in events">
        <div v-bind:key="index + '_1'">{{ event.device_display_name }}</div>
        <div v-bind:key="index + '_2'">{{ event.agent_display_name }}</div>
        <div v-bind:key="index + '_3'">{{ event.event_type }}</div>
        <div v-bind:key="index + '_4'">{{ event.event_value }}</div>
    </template>
</div>
</template>

<script>
export default {
    data() {
        return {
            events: []
        };
    },
    created() {
        console.log("created called");
        // chrome.runtime.onMessage.addListener(
        //   (message, sender, sendResponse) => {
        //     console.log("Hey I've got this message " + message)
        //     this.cane = " un cane "
        //   });
    },
    mounted() {
        console.log("On mount has been called ");
        chrome.browserAction.setBadgeText({
            text: ""
        });
        chrome.storage.local.get(["key"], result => {
            console.log("Value currently is " + result.key);
            this.events = result.key;
        });
    }
};
</script>

<style lang="scss" scoped>
.popup {
    width: 440px;
}

.popup>div {
    background: #eee;
    padding: 1em;
}

.popup>div:nth-child(odd) {
    background: #ddd;
}

.grid {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>

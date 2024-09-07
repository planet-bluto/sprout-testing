<script setup lang="ts">
import Sample from "../types/Sample"

const props = defineProps(["sample"])
</script>

<template>
    <div id="sample-latest-cont">
        <div id="sample-latest-left">
            <div id="sample-latest-heading">
                <button id="tag-edit-button"><img src="../assets/tag_edit.png"/></button>
                <p id="sample-latest-heading-text">{{ sample.name }}</p>
                <!-- <div>
                    <p>{{ sample.format }}</p>
                </div> -->
            </div>
            <div>
                <p id="sample-additional-info">{{ [sample.format ].join(", ") }}</p>
            </div>
        </div>
        <button id="more-button"><img src="../assets/more.png"/></button>
    </div>
</template>

<style scoped>
#sample-latest-cont {
    z-index: 0;
    position: relative;
    width: calc(100% - 30px);
    height: calc(110px - 30px);
    padding: 15px;
    display: flex;
    background: #270F07;
    /* margin-top: 15px; */
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    bottom: 0px;
}

#tag-edit-button {
    border: none;
    background: none;
    width: 38px;
    height: 38px;
}

#sample-latest-heading {
    display: flex;
    font-size: 48px;
    color: white;
    height: 38px;
    align-items: center;
}

#sample-latest-heading-text {
    margin-top: 0px;
    margin-bottom: 0px;
    position: relative;
    top: 5px;
    margin-left: 15px;
}

#sample-latest-left {
    width: calc(100% - 64px);
    height: 100%
}

#sample-additional-info {
    font-size: 32px;
    color: #100400;
    margin-top: 0px;
    margin-bottom: 0px;
}

#more-button {
    border: none;
    background: none;
    position: relative;
    right: 0px;
    width: 64px;
    height: 100%;
}

button {
    transition: 100ms;
    transition-property: filter;
}

button:hover {
    filter: brightness(1.5)
}
</style>
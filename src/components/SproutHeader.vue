<script setup lang="ts">
const props = defineProps({
    version: String
})
</script>

<template>
    <div id="sprout-header">
        <p>Sprout</p>
        <p id="sprout-header-version">{{ "V" + props.version }}</p>
    </div>
</template>

<style scoped>
#sprout-header {
    z-index: 10;
    position: relative;
    width: calc(100% - 30px);
    height: 35px;
    display: flex;
    background: #199600;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 32px;
    color: white;
}

#sprout-header-version {
    color: #ffffff7c;
}
</style>
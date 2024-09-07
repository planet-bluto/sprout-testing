<script setup lang="ts">
import SampleViewer from './components/SampleViewer.vue';
import SproutHeader from './components/SproutHeader.vue';
import SampleLatest from './components/SampleLatest.vue';
import { reactive } from 'vue';
import Sample from './types/Sample';

const NO_SAMPLE: Sample = {
  real: false,
  name: "nothing...",
  format: "wav",
  link: "",
  averageFrequency: 0,
  duration: 0,
  x: 0,
  y: 0,
  highlighted: false,
  media: new Audio()
}

const sync = reactive({
  current_sample: NO_SAMPLE
})

function setCurrentSample(sample: Sample) {
  sync.current_sample = (sample != null ? sample : NO_SAMPLE)
}

var sprout_version = "0.0.1"
</script>

<template>
  <div>
    <SproutHeader :version="sprout_version"/>
    <SampleViewer @sampleChange="(sample) => setCurrentSample(sample)"/>
    <SampleLatest :sample="sync.current_sample"/>

    <div id="header-runoff"></div>
    <div id="viewer-border"></div>
    <div id="latest-runoff"></div>
  </div>
</template>

<style scoped>
#header-runoff {
  z-index: 0;
  width: 100%;
  height: 15px;
  position: fixed;
  top: 35px;
  background: #199600;
}

#viewer-border {
  z-index: 1;
  width: 100%;
  height: 30px;
  position: fixed;
  top: calc(35px + 640px - 15px);
  background: #1C0903;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}

#latest-runoff {
  z-index: 0;
  width: 100%;
  height: 30px;
  position: fixed;
  bottom: 110px;
  background: #270F07;
}
</style>

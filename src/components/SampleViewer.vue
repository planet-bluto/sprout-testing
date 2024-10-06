<script setup lang="ts">
import Sample from "../types/Sample"
import {SAMPLES} from "../samples"

const emit = defineEmits(['sampleChange'])

const getBase64ID = (hex: String) => (
	btoa(
		hex.match(/\w{2}/g).map(
			byte => String.fromCharCode(parseInt(byte, 16))
		).join("")
	).replace(/\+/g, "-").replace(/\//g, "_")
)

const remap = (x: number, startA: number, startB: number, endA: number, endB: number) => {
  return (((x - startA) / (startB - startA)) * (endB - endA)) + endA
}

const dist = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}

var highlighed_ind = 0
var last_highlighed_ind = highlighed_ind

var canvas: HTMLCanvasElement | null;
var ctx: CanvasRenderingContext2D | null;

const viewWIDTH = 640
const viewHEIGHT = 640

const marginIndexes = 1
const marginSize = 32

const sampleSize = 18
var samples: Sample[] = []
var mouse = {
  x: 0, 
  y: 0,
  down: false
}

// HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME
// HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME
// HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME
// HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME
// HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME
// HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME
// HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME
// HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME
// HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME

var currentVolume = 0.5

function playSample() {
  if (highlighed_ind != -1) {
    samples.forEach(sample => {
      sample.media.pause()
    })

    samples[highlighed_ind].media.currentTime = 0
    samples[highlighed_ind].media.volume = currentVolume

    console.log(samples[highlighed_ind].media.volume)

    try {
      samples[highlighed_ind].media.play()
    } catch(err) {
      console.log(err)
    }
  }
}

async function main() {
  canvas = document.getElementById("main")

  console.log(canvas)
  if (canvas instanceof HTMLCanvasElement) {
    canvas.addEventListener("mousemove", (event) => {
      mouse.x = event.offsetX
      mouse.y = event.offsetY
    })

    document.body.addEventListener("mousedown", (event) => {
      mouse.down = true
      playSample()
    })

    document.body.addEventListener("mouseup", (event) => {
      mouse.down = false
    })

    clearInterval(int)
    ctx = canvas.getContext('2d')

    // Also get somehow...
    let link = `https://api.filegarden.com/users/64c4adc16e679937bec773f9/pipe?parent=ZUhHjqQOfUVXvT2B`


    let user_id = link.split("/")[4]
    let user_id_based = getBase64ID(user_id)
	  let parent = link.split("/")[6]
	  parent = parent

    // // All the collecting and stuff
    // let path = ""
    // json.ancestors.forEach((ancestor: any) => {
    //   path += `/${ancestor.name}`
    // })

    console.log(SAMPLES)
    
    await SAMPLES.awaitForEach(async (item: any, ind: number) => {
      let format = item.name.split(".").splice(-1, 1)[0].toLowerCase()
      if (item.id != "TRASH" && (item.type.includes("audio") || item.type.includes("video"))) {

        let media_elem;

        try {
          let res = await fetch(item.direct_link)

          console.log(item.direct_link)

          media_elem = new Audio(item.direct_link)
        } catch (err) {
          media_elem = new Audio()
        }

        let sample: Sample = {
          real: true,
          link: item.direct_link, 
          name: item.name.split(".").toSpliced(-1, 1).join("."),
          format,
          media: media_elem
        }
        samples.push(sample)
      }	
    })

    
    // Now we parse thru the samples
    await samples.awaitForEach(async (link_entry: Sample, sample_ind: number) => {
      let thisAverage = 0
      let counts = 0
      
      
      // let response = await fetch(link_entry.link)
      // let arrayBuffer = await response.arrayBuffer()
      // let offlineAudioContext = new OfflineAudioContext({
      //             length: 1,
      //             sampleRate: 44100
      //         });

      // let audioBuffer = await offlineAudioContext.decodeAudioData(arrayBuffer);
      
      // const INT = 1024
      // const signal = new Float32Array(INT);

      // for (let i = 0; i < audioBuffer.sampleRate * audioBuffer.duration; i += INT) {
      //     audioBuffer.copyFromChannel(signal, 0, i);

      //     let float_array: Float32Array = Meyda.extract('powerSpectrum', signal)
      //     thisAverage += ((float_array.reduce((acc, val) => acc + val)) / float_array.length)
      //     // console.log(thisAverage)
      //     counts += 1
      // }

      samples[sample_ind]["averageFrequency"] = randi(0, 100)
      samples[sample_ind]["duration"] = randi(0, 100)
    })

    console.log("Samples Loaded!")
    alert("Samples Loaded!")
  }

  renderCanvas()
}

function randi(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function drawSample(sample: any) {
  if (ctx instanceof CanvasRenderingContext2D) {
    // console.log("redrawn!", sample)
    ctx.fillStyle = (sample.highlighted ? "#ffe737" : "#5BE300")
    ctx.fillRect(sample.x - (sampleSize / 2), sample.y - (sampleSize / 2), sampleSize,  sampleSize)
    ctx.fill()
  }
}

function renderCanvas() {
  requestAnimationFrame(renderCanvas)
  // ctx.clearRect(0, 0, viewWIDTH, viewHEIGHT)

  ctx.fillStyle = "#100400"
  ctx.fillRect(0, 0, viewWIDTH, viewHEIGHT)


  // Render them samples...
  let smallest_dist = Infinity
  highlighed_ind = -1
  // let minDuration = samples.map(sample => sample.duration).reduce((acc: number, curr: number) => { return (curr < acc ? curr : acc)})
  // let maxDuration = samples.map(sample => sample.duration).reduce((acc: number, curr: number) => { return (curr > acc ? curr : acc)})
  // let minFreq = samples.map(sample => sample.averageFrequency).reduce((acc: number, curr: number) => { return (curr < acc ? curr : acc)})
  // let maxFreq = samples.map(sample => sample.averageFrequency).reduce((acc: number, curr: number) => { return (curr > acc ? curr : acc)})
  let durrSort: Sample[] = samples.toSorted((sampleA: Sample, sampleB: Sample) => {return sampleA.duration - sampleB.duration})
  let freqSort: Sample[] = samples.toSorted((sampleA: Sample, sampleB: Sample) => {return sampleB.averageFrequency - sampleA.averageFrequency})

  samples.forEach((sample, sample_ind) => {
    let x_ind = freqSort.indexOf(sample)
    let y_ind = durrSort.indexOf(sample)
    
    let thisWIDTH = (viewWIDTH - marginSize)
    let thisHEIHT = (viewHEIGHT - marginSize)

    samples[sample_ind]["x"] = ((thisWIDTH / (samples.length + (marginIndexes * 2))) * (x_ind + marginIndexes)) + (marginSize / 2)
    samples[sample_ind]["y"] = ((thisHEIHT / (samples.length + (marginIndexes * 2))) * (y_ind + marginIndexes)) + (marginSize / 2)
    // samples[sample_ind]["x"] = (remap(sample.duration, minDuration, maxDuration, 0, 1) * (viewWIDTH - sampleSize)) + (sampleSize / 2)
    // samples[sample_ind]["y"] = (remap(sample.averageFrequency, minFreq, maxFreq, 0, 1) * (viewHEIGHT - sampleSize)) + (sampleSize / 2)

    let mouse_dist = dist(samples[sample_ind]["x"], samples[sample_ind]["y"], mouse["x"], mouse["y"])
    if (mouse_dist < 64 && mouse_dist < smallest_dist) {
      // samples[sample_ind].highlighted = true
      smallest_dist = mouse_dist
      highlighed_ind = sample_ind
    }
  })

  if (highlighed_ind != last_highlighed_ind) {
    last_highlighed_ind = highlighed_ind
    emit("sampleChange", (highlighed_ind > -1 ? samples[highlighed_ind] : null))
    
    if (mouse.down) {
      playSample()
    }
  }

  samples.forEach((sample, sample_ind) => {
    samples[sample_ind].highlighted = (sample_ind == highlighed_ind)

    drawSample(samples[sample_ind])
  })

  if (highlighed_ind != -1) {
    drawSample(samples[highlighed_ind])
  }
}

var int = setInterval(main, 10)
</script>

<template>
    <canvas id="main" width="640" height="640"></canvas>
</template>

<style scoped>
#main {
  z-index: 10;
  position: relative;
  background: #100400;
  border-radius: 15px;
}
</style>
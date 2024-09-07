<script setup lang="ts">
import Sample from "../types/Sample"

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


function playSample() {
  if (highlighed_ind != -1) {
    samples.forEach(sample => {
      sample.media.pause()
    })

    samples[highlighed_ind].media.currentTime = 0
    samples[highlighed_ind].media.play()
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
    let link = `https://api.filegarden.com/users/64c4adc16e679937bec773f9/pipe?parent=ZfKDxznE7hj9GcfA`


    let user_id = link.split("/")[4]
    let user_id_based = getBase64ID(user_id)
	  let parent = link.split("/")[6]
	  parent = parent

    
    // Get somehow...
    let json = JSON.parse(`{"ancestors":[{"id":"ZfKDxznE7hj9GcfA","date":1710392263112,"parent":null,"name":"samples","path":"samples","type":"/","privacy":0,"size":72485937}],"items":[{"id":"ZfKD2DnE7hj9GcfB","date":1710392281306,"parent":"ZfKDxznE7hj9GcfA","name":"AC PERCUSSION 3.wav","path":"samples/AC PERCUSSION 3.wav","type":"audio/wav","size":41644,"privacy":0},{"id":"ZfKEXznE7hj9GcfY","date":1710392415476,"parent":"ZfKDxznE7hj9GcfA","name":"AC PERCUSSION 6.wav","path":"samples/AC PERCUSSION 6.wav","type":"audio/wav","size":20636,"privacy":0},{"id":"ZfSlBPVY1x0rTG7E","date":1710531845040,"parent":"ZfKDxznE7hj9GcfA","name":"Pattern 9.wav","path":"samples/Pattern 9.wav","type":"audio/wav","size":974130,"privacy":0},{"id":"ZfSlvPVY1x0rTG7e","date":1710532029540,"parent":"ZfKDxznE7hj9GcfA","name":"strinhgggs.wav","path":"samples/strinhgggs.wav","type":"audio/wav","size":974130,"privacy":0},{"id":"ZfSuhfVY1x0rTHAl","date":1710534278032,"parent":"ZfKDxznE7hj9GcfA","name":"Sky Hit.wav","path":"samples/Sky Hit.wav","type":"audio/wav","size":506592,"privacy":0},{"id":"ZfS6dfVY1x0rTHH7","date":1710537333595,"parent":"ZfKDxznE7hj9GcfA","name":"RECORDSCRATCHWHAT.wav","path":"samples/RECORDSCRATCHWHAT.wav","type":"audio/wav","size":741082,"privacy":0},{"id":"ZfULa_VY1x0rTIqO","date":1710558059484,"parent":"ZfKDxznE7hj9GcfA","name":"too black too strong.wav","path":"samples/too black too strong.wav","type":"audio/wav","size":609066,"privacy":0},{"id":"ZfvfS7tWwQLycnOG","date":1711005516983,"parent":"ZfKDxznE7hj9GcfA","name":"break 255.wav","path":"samples/break 255.wav","type":"audio/wav","size":2657386,"privacy":0},{"id":"ZfvhObtWwQLycnOQ","date":1711006010121,"parent":"ZfKDxznE7hj9GcfA","name":"KutsuyaVoRand04.wav","path":"samples/KutsuyaVoRand04.wav","type":"audio/wav","size":21076,"privacy":0},{"id":"Zi7bNvZK7yH8-Bvj","date":1714346807075,"parent":"ZfKDxznE7hj9GcfA","name":"f8ovnq.wav","path":"samples/f8ovnq.wav","type":"audio/wav","size":94312,"privacy":0},{"id":"ZjAgEKP0bFK6NDoY","date":1714429969469,"parent":"ZfKDxznE7hj9GcfA","name":"Nervosa_Snare_18_495.wav","path":"samples/Nervosa_Snare_18_495.wav","type":"audio/wav","size":159848,"privacy":0},{"id":"ZjAgFKP0bFK6NDoZ","date":1714429972432,"parent":"ZfKDxznE7hj9GcfA","name":"26_Snare_10_SP.wav","path":"samples/26_Snare_10_SP.wav","type":"audio/wav","size":122984,"privacy":0},{"id":"ZjAjPaP0bFK6NDqg","date":1714430782383,"parent":"ZfKDxznE7hj9GcfA","name":"FutureSoundOfTechno_Kick_SPFT_08.wav","path":"samples/FutureSoundOfTechno_Kick_SPFT_08.wav","type":"audio/wav","size":73832,"privacy":0},{"id":"ZjAjyaP0bFK6NDqv","date":1714430922044,"parent":"ZfKDxznE7hj9GcfA","name":"Kick8.wav","path":"samples/Kick8.wav","type":"audio/wav","size":125054,"privacy":0},{"id":"ZjAj96P0bFK6NDq_","date":1714430967534,"parent":"ZfKDxznE7hj9GcfA","name":"53_Nice_SP_01.wav","path":"samples/53_Nice_SP_01.wav","type":"audio/wav","size":73832,"privacy":0},{"id":"ZjAkX6P0bFK6NDrO","date":1714431072182,"parent":"ZfKDxznE7hj9GcfA","name":"53_Dark_SP_01.wav","path":"samples/53_Dark_SP_01.wav","type":"audio/wav","size":73832,"privacy":0},{"id":"ZjWE7XBkUxBjUlz6","date":1714783469510,"parent":"ZfKDxznE7hj9GcfA","name":"TearoutDnB_Kick_05_454.wav","path":"samples/TearoutDnB_Kick_05_454.wav","type":"audio/wav","size":147560,"privacy":0},{"id":"ZjWFVnBkUxBjUl0A","date":1714783574520,"parent":"ZfKDxznE7hj9GcfA","name":"TearoutDnB_Snare_23_454.wav","path":"samples/TearoutDnB_Snare_23_454.wav","type":"audio/wav","size":147560,"privacy":0},{"id":"ZjWFYXBkUxBjUl0C","date":1714783586522,"parent":"ZfKDxznE7hj9GcfA","name":"TearoutDnB_Hat_20_454.wav","path":"samples/TearoutDnB_Hat_20_454.wav","type":"audio/wav","size":49256,"privacy":0},{"id":"Zj7LSvoh-G9Y8Dn6","date":1715391307100,"parent":"ZfKDxznE7hj9GcfA","name":"95_Kick_SP_22.wav","path":"samples/95_Kick_SP_22.wav","type":"audio/wav","size":405608,"privacy":0},{"id":"Zj7MOvoh-G9Y8DoO","date":1715391547324,"parent":"ZfKDxznE7hj9GcfA","name":"53_CHH_Boulder_SP_01.wav","path":"samples/53_CHH_Boulder_SP_01.wav","type":"audio/wav","size":49256,"privacy":0},{"id":"Zj7Myvoh-G9Y8Dod","date":1715391690607,"parent":"ZfKDxznE7hj9GcfA","name":"23_Kick_09_SP.wav","path":"samples/23_Kick_09_SP.wav","type":"audio/wav","size":196712,"privacy":0},{"id":"Zj7M1voh-G9Y8Dog","date":1715391703102,"parent":"ZfKDxznE7hj9GcfA","name":"Long.wav","path":"samples/Long.wav","type":"audio/wav","size":209000,"privacy":0},{"id":"Zj7M0_oh-G9Y8Dof","date":1715391703216,"parent":"ZfKDxznE7hj9GcfA","name":"ApocalyptoEDM_Shaker_02_SP.wav","path":"samples/ApocalyptoEDM_Shaker_02_SP.wav","type":"audio/wav","size":86120,"privacy":0},{"id":"Zj7Tcfoh-G9Y8Dqe","date":1715393394192,"parent":"ZfKDxznE7hj9GcfA","name":"[1b]crackclassic.wav","path":"samples/[1b]crackclassic.wav","type":"audio/wav","size":73170,"privacy":0},{"id":"Zj7TfPoh-G9Y8Dqf","date":1715393404630,"parent":"ZfKDxznE7hj9GcfA","name":"[1a]whooshclassic.wav","path":"samples/[1a]whooshclassic.wav","type":"audio/wav","size":40846,"privacy":0},{"id":"Zj7XTfoh-G9Y8Drz","date":1715394382398,"parent":"ZfKDxznE7hj9GcfA","name":"backitup.wav","path":"samples/backitup.wav","type":"audio/wav","size":112446,"privacy":0},{"id":"Zj7YSvoh-G9Y8DsA","date":1715394635172,"parent":"ZfKDxznE7hj9GcfA","name":"'gunshotgalil.wav","path":"samples/'gunshotgalil.wav","type":"audio/wav","size":313406,"privacy":0},{"id":"Zj7ZsPoh-G9Y8Dsi","date":1715394993261,"parent":"ZfKDxznE7hj9GcfA","name":"oldrave.wav","path":"samples/oldrave.wav","type":"audio/wav","size":91282,"privacy":0},{"id":"Zj7bhvoh-G9Y8Ds8","date":1715395462781,"parent":"ZfKDxznE7hj9GcfA","name":"80816.wav","path":"samples/80816.wav","type":"audio/wav","size":78060,"privacy":0},{"id":"Zj7cfvoh-G9Y8DtS","date":1715395711345,"parent":"ZfKDxznE7hj9GcfA","name":"break3.wav","path":"samples/break3.wav","type":"audio/wav","size":330804,"privacy":0},{"id":"Zj7gLPoh-G9Y8Du4","date":1715396653143,"parent":"ZfKDxznE7hj9GcfA","name":"polaroid2.wav","path":"samples/polaroid2.wav","type":"audio/wav","size":398602,"privacy":0},{"id":"Zj7lV_oh-G9Y8Dwz","date":1715397976264,"parent":"ZfKDxznE7hj9GcfA","name":"anvil.wav","path":"samples/anvil.wav","type":"audio/wav","size":233170,"privacy":0},{"id":"Zj7n7voh-G9Y8DxS","date":1715398641303,"parent":"ZfKDxznE7hj9GcfA","name":"everyday voice chat.wav","path":"samples/everyday voice chat.wav","type":"audio/wav","size":3818034,"privacy":0},{"id":"Zj7_sfoh-G9Y8EFc","date":1715404721751,"parent":"ZfKDxznE7hj9GcfA","name":"'ladiesbooty.wav","path":"samples/'ladiesbooty.wav","type":"audio/wav","size":305640,"privacy":0},{"id":"ZkRE5AbiZDsBIZrW","date":1715750116936,"parent":"ZfKDxznE7hj9GcfA","name":"Trilobyte 1 [SL].wav","path":"samples/Trilobyte 1 [SL].wav","type":"audio/wav","size":139364,"privacy":0},{"id":"ZkRSQQbiZDsBIZyx","date":1715753538328,"parent":"ZfKDxznE7hj9GcfA","name":"DubstepInvasion_140_Snare_001_428.wav","path":"samples/DubstepInvasion_140_Snare_001_428.wav","type":"audio/wav","size":233576,"privacy":0},{"id":"ZkTl3xd9PloMz-A5","date":1715791327831,"parent":"ZfKDxznE7hj9GcfA","name":"whatindafuc.ogg","path":"samples/whatindafuc.ogg","type":"audio/ogg","size":18210,"privacy":0},{"id":"ZpmSmBbyKSpKbOmz","date":1721340569492,"parent":"ZfKDxznE7hj9GcfA","name":"tf is this.wav","path":"samples/tf is this.wav","type":"audio/wav","size":18316,"privacy":0},{"id":"Zpms5xbyKSpKbPEz","date":1721347309938,"parent":"ZfKDxznE7hj9GcfA","name":"fragments_L.wav","path":"samples/fragments_L.wav","type":"audio/wav","size":27807468,"privacy":0},{"id":"Zpms5xbyKSpKbPE0","date":1721347314648,"parent":"ZfKDxznE7hj9GcfA","name":"fragments_R.wav","path":"samples/fragments_R.wav","type":"audio/wav","size":27807468,"privacy":0},{"id":"ZrGcdjd7bx__ipcY","date":1722915958754,"parent":"ZfKDxznE7hj9GcfA","name":"scratch.wav","path":"samples/scratch.wav","type":"audio/wav","size":97380,"privacy":0},{"id":"ZrGfMzd7bx__ipdK","date":1722916660149,"parent":"ZfKDxznE7hj9GcfA","name":"MachineLove_Kick_316_14.wav","path":"samples/MachineLove_Kick_316_14.wav","type":"audio/wav","size":540776,"privacy":0},{"id":"ZrGfNTd7bx__ipdL","date":1722916662284,"parent":"ZfKDxznE7hj9GcfA","name":"hardbassdrumz_039.wav","path":"samples/hardbassdrumz_039.wav","type":"audio/wav","size":49196,"privacy":0},{"id":"ZrGfOjd7bx__ipdM","date":1722916666996,"parent":"ZfKDxznE7hj9GcfA","name":"CYCdh_ElecK05-Kick01.wav","path":"samples/CYCdh_ElecK05-Kick01.wav","type":"audio/wav","size":306530,"privacy":0},{"id":"ZrGfejd7bx__ipdP","date":1722916731505,"parent":"ZfKDxznE7hj9GcfA","name":"MinimalElectronic_Kick_15_464.wav","path":"samples/MinimalElectronic_Kick_15_464.wav","type":"audio/wav","size":319592,"privacy":0},{"id":"ZrGjgzd7bx__ipeb","date":1722917764209,"parent":"ZfKDxznE7hj9GcfA","name":"CATARA~3.WAV","path":"samples/CATARA~3.WAV","type":"audio/wav","size":529244,"privacy":0},{"id":"Zr5Dz9Zhlw9209vd","date":1723745232239,"parent":"ZfKDxznE7hj9GcfA","name":"EtherealCircuit_Kick_SP_12.wav","path":"samples/EtherealCircuit_Kick_SP_12.wav","type":"audio/wav","size":86120,"privacy":0},{"id":"Zr6tE7pcdh70xALd","date":1723772179859,"parent":"ZfKDxznE7hj9GcfA","name":"26_Snare_07_SP.wav","path":"samples/26_Snare_07_SP.wav","type":"audio/wav","size":172136,"privacy":0},{"id":"ZsuhIVj2w3l6wqSv","date":1724621090428,"parent":"ZfKDxznE7hj9GcfA","name":"pingas.ogg","path":"samples/pingas.ogg","type":"audio/ogg","size":4593,"privacy":1}]}`)
    

    
    // All the collecting and stuff
    let path = ""
    json.ancestors.forEach((ancestor: any) => {
      path += `/${ancestor.name}`
    })
    
    json.items.forEach((item: any, ind: number) => {
      if (item.id != "TRASH") {
        let sample: Sample = {
          real: true,
          link: `https://file.garden/${user_id_based}${path}/${encodeURI(item.name)}`, 
          name: item.name.split(".").toSpliced(-1, 1).join("."),
          format: item.name.split(".").splice(-1, 1)[0].toLowerCase(),
          media: new Audio(`https://file.garden/${user_id_based}${path}/${encodeURI(item.name)}`)
        }
        samples.push(sample)
      }	
    })

    
    // Now we parse thru the samples
    await samples.awaitForEach(async (link_entry: Sample, sample_ind: number) => {
      let thisAverage = 0
      let counts = 0
      
      
      let response = await fetch(link_entry.link)
      let arrayBuffer = await response.arrayBuffer()
      let offlineAudioContext = new OfflineAudioContext({
                  length: 1,
                  sampleRate: 44100
              });

      let audioBuffer = await offlineAudioContext.decodeAudioData(arrayBuffer);
      
      const INT = 1024
      const signal = new Float32Array(INT);

      for (let i = 0; i < audioBuffer.sampleRate * audioBuffer.duration; i += INT) {
          audioBuffer.copyFromChannel(signal, 0, i);

          let float_array: Float32Array = Meyda.extract('powerSpectrum', signal)
          thisAverage += ((float_array.reduce((acc, val) => acc + val)) / float_array.length)
          // console.log(thisAverage)
          counts += 1
      }

      samples[sample_ind]["averageFrequency"] = (thisAverage / counts)
      samples[sample_ind]["duration"] = audioBuffer.duration
    })
  }

  renderCanvas()
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
    if (mouse_dist < 16 && mouse_dist < smallest_dist) {
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
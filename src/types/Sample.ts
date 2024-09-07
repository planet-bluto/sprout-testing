export default interface Sample {
    real: Boolean,
    link: String,
    name: String,
    format: "wav" | "mp3" | "ogg" | "flac",
    averageFrequency: number,
    duration: number,
    x: number,
    y: number,
    highlighted: Boolean,
    media: HTMLMediaElement
}
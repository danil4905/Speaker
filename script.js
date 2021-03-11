const { speechSynthesis } = window;

const voicesSelect = document.getElementById("voices");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const text = document.getElementById("text");
const start = document.getElementById("btn-start");
const stop = document.getElementById("btn-stop");

let voices = [];

const generateVoices = () => {
  voices = speechSynthesis.getVoices();
  const voicesList = voices
    .map(
      (voice, index) =>
        `<option value="${index}">${voice.name} (${voice.lang}) </option>`
    )
    .join("");
  voicesSelect.innerHTML = voicesList;
};

const speaking = () => {
  if (speechSynthesis.speaking) {
    console.error("Speaking");
    return;
  }
  if (text.value !== "") {
      speechSynthesis.cancel();
    const ssUtterance = new SpeechSynthesisUtterance(text.value);
    ssUtterance.voice = voices[voicesSelect.value];
    ssUtterance.rate = rate.value;
    ssUtterance.pitch = pitch.value;

    speechSynthesis.speak(ssUtterance);
  }
};

generateVoices();
rate.oninput = function () {
  document.querySelector(".rate-value").innerHTML = this.value;
};
pitch.oninput = function () {
  document.querySelector(".pitch-value").innerHTML =this.value;
}

voicesSelect.addEventListener('change', speaking);

start.addEventListener("click", speaking);
stop.addEventListener("click", () => speechSynthesis.cancel());

speechSynthesis.addEventListener("voiceschanged", generateVoices);

class Audio {
    constructor() {
        let voices = speechSynthesis.getVoices(),
            utterance = new SpeechSynthesisUtterance(" ");
        utterance.voice = voices[0];
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);

        let audioButton = `<button type="button" id="audioButton" class="btn audioButton"><i class="material-icons md-36">headset</i>
        </button>`;

        $('.navbar-collapse').append(audioButton);
    }

    onClick() {

        let audioButtonText = $(this).find('i');

        if (!window.speechSynthesis.speaking) {
            let voices = speechSynthesis.getVoices(),
                utterance;

            audioButtonText.text("stop");
            let textSynthesis = window.getSelection() + "";
            if (textSynthesis === "") {
                textSynthesis = document.getElementsByClassName("currentPageText")[0].textContent;
            }
            //if (window.innerWidth < breakpoint) {
            if (textSynthesis.length > 500) {
                while (textSynthesis.length > 500) {
                    let textSynthesisPart = textSynthesis.substring(0, 500);
                    textSynthesis = textSynthesis.slice(500);
                    utterance = new SpeechSynthesisUtterance(textSynthesisPart);
                    utterance.voice = voices[0];
                    window.speechSynthesis.speak(utterance);
                }
            }
            //}
            utterance = new SpeechSynthesisUtterance(textSynthesis);
            utterance.voice = voices[0];
            window.speechSynthesis.speak(utterance);

            utterance.onend = () => audioButtonText.text("headset");

        } else {
            audioButtonText.text("headset");
            window.speechSynthesis.cancel();
        }
    }
}

let audio = new Audio();
document.getElementById("audioButton").onclick = audio.onClick;
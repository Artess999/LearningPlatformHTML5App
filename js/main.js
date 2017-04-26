/**
 * Created by Artem on 08.02.2017.
 */
const breakpoint = 767;
const indexAnimationTime = 350;
const contentAnimationTime = 350;

class Display {
    constructor(breakpoint) {
        this.setCurrentSizes();
        this.breakpoint = breakpoint;

        this._initial();
        this.correctStyle();
    }

    setCurrentSizes() {
        this.headerHeigth = $("header").outerHeight(true);
        this.footerHeight = $("footer").outerHeight(true);
        this.mainHeight = window.innerHeight - (this.headerHeigth + this.footerHeight);
        this.width = window.innerWidth;
    }

    _initial() {
        this.minHeight = "0px";
        if (this.width < this.breakpoint) {
            this.minHeight = this.mainHeight + "px";
            document.getElementById("content").style.minHeight = this.mainHeight + "px";
            $("#index").removeClass("show");
            let buttonText = $(".indexButton i").text();
            buttonText === "list" ? buttonText = "clear" : buttonText = "list";
            $(".indexButton i").text(buttonText);
        }
    }

    correctStyle() {
        document.getElementById("content").style.height = this.mainHeight + "px";

        if (this.width > this.breakpoint) {
            document.getElementById("index").style.height = this.mainHeight + "px";
            document.getElementById("index-list").style.height = this.mainHeight + "px";
            document.getElementById("index").classList.add("show");
        }
        else {
            document.getElementsByTagName("footer")[0].style.position = "static";
            document.getElementById("index-container").style.display = "block";
            document.getElementById("index").classList.remove("show");
        }
    }

    onResize() {
        if (this.width > this.breakpoint && window.innerWidth < this.breakpoint) {
            $(".indexButton i").text("list");
            document.getElementById("navbar-collapse").classList.remove("show");
            document.getElementById("content").style.minHeight = this.minHeight;
        }
        if (this.width < this.breakpoint && window.innerWidth > this.breakpoint) {
            $(".indexButton i").text("clear");
            document.getElementById("content").classList.remove("col-md-12");
            document.getElementById("content").style.minHeight = "0px";
        }
        this.setCurrentSizes();
        this.correctStyle();
    }
}

let display = new Display(breakpoint);
window.onresize = () => display.onResize();

document.getElementById("indexButton").onclick = indexOnClick;

function indexOnClick() {
    let buttonText = $(".indexButton i").text();
    buttonText === "list" ? buttonText = "clear" : buttonText = "list";
    $(".indexButton i").text(buttonText);
    if (window.innerWidth > breakpoint) {
        //$(".index-container").toggleClass("hidden");
        if ($("aside").hasClass("show")) {
            $("aside").collapse("hide");
            setTimeout(() => {
                $("#index-container").hide();
                $(".content").addClass("col-md-12");
            }, indexAnimationTime)

        } else {
            $(".content").removeClass("col-md-12");
            setTimeout(() => {
                $("#index-container").show();
                $("aside").collapse("show");
            }, contentAnimationTime)
        }
    } else {
        $("aside").collapse("toggle");
    }
}


let voices = speechSynthesis.getVoices(),
            utterance = new SpeechSynthesisUtterance(" ");
        utterance.voice = voices[0];
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);

document.getElementById("audioButton").onclick = function () {
    if (!window.speechSynthesis.speaking) {
        
		let voices = speechSynthesis.getVoices(),
            utterance;
        
        $(".audioButton i").text("stop");
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

        utterance.onend = () => $(".audioButton i").text("headset");

    } else {
        $(".audioButton i").text("headset");
        window.speechSynthesis.cancel();
    }
};

$(".next").click(function () {
    $.getJSON("http://localhost:63342/LearningPlatformHTML5App/JSONProvider.php?id=2",
        function (data) {
            $(".currentPageText").text(data.text)
        })
});

$(".previous").click(function () {
    $.getJSON("http://localhost:63342/LearningPlatformHTML5App/JSONProvider.php?id=1",
        function (data) {
            $(".currentPageText").text(data.text)
        })
});

let elems = document.getElementById("index-list").childNodes;

function BuildList(elems) {
    for (let elem of elems) {
        if (typeof elem.tagName === "string" && elem.id.startsWith("for")) {
            for (let el of elem.childNodes) {
                if (typeof el.tagName === "string" && el.id.startsWith("p")) {
                    elem.onclick = function (e) {
                        let classes = el.classList;
                        classes.contains("collapse") ? classes.remove("collapse") : classes.add("collapse");
                        e.stopPropagation();
                    };
                    BuildList(el.childNodes);
                }
            }
        }
    }
}

BuildList(elems);

$("ul li").click(function (e) {
    e.stopPropagation();
});


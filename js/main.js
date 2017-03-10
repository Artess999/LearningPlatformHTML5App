/**
 * Created by Artem on 08.02.2017.
 */
const breakpoint = 767;

class Display {
    constructor(breakpoint) {
        this.setCurrentSizes();
        this.breakpoint = breakpoint;

        this._initial();
        this.correctStyle();
    }

    setCurrentSizes(){
        this.headerHeigth = $("header").outerHeight(true);
        this.footerHeight = $("footer").outerHeight(true);
        this.mainHeight = window.innerHeight - (this.headerHeigth + this.footerHeight);
        this.width = window.innerWidth;
    }

    _initial() {
        if (this.width < this.breakpoint) {
            document.getElementById("content").style.minHeight = this.mainHeight + "px";
            $("#index").removeClass("show");
            $(".indexButton i").toggleClass("fa-book fa-times");
        }
    }

    correctStyle() {
        if (this.width > this.breakpoint) {
            document.getElementById("index").style.height = this.mainHeight + "px";
            document.getElementById("content").style.height = this.mainHeight + "px";

            document.getElementById("index").classList.remove("collapse");
        }
        else {
            document.getElementsByTagName("footer")[0].style.position = "static";
            document.getElementById("content").style.height = this.mainHeight + "px";

            document.getElementById("index").classList.remove("hidden");
            document.getElementById("index").classList.add("collapse");
        }
    }

    onResize() {
        if (this.width > this.breakpoint && window.innerWidth < this.breakpoint) {
            $(".indexButton i").addClass("fa-book").removeClass("fa-times");
            document.getElementById("navbar-collapse").classList.remove("show");
        }
        if (this.width < this.breakpoint && window.innerWidth > this.breakpoint) {
            $(".indexButton i").addClass("fa-times").removeClass("fa-book");
            document.getElementById("content").classList.remove("col-md-12");
        }
        this.setCurrentSizes();
        this.correctStyle();
    }
}

let display = new Display(breakpoint);


document.getElementById("indexButton").onclick = function () {
    if (window.innerWidth > breakpoint) {
        $("aside").toggleClass("hidden");
        $(".content").toggleClass("col-md-12")
    } else {
        $("aside").collapse("toggle");
    }
    $(".indexButton i").toggleClass("fa-book fa-times");
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

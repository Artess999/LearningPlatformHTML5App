/**
 * Created by Artem on 08.02.2017.
 */
const breakpoint = 767;


function CorrectStyle(breakpoint) {
    var height1 = $("header").outerHeight(true);
    var height2 = $("footer").outerHeight(true);
    var height = window.innerHeight - (height1 + height2) + "px";
    ButtonEvent();
    if (window.innerWidth > breakpoint) {
        document.getElementById("index").style.height = height;
        document.getElementById("content").style.height = height;
        $("#index").addClass("show");

    }
    else {
        document.getElementsByTagName("footer")[0].style.position = "static";
        document.getElementById("content").style.height = height;
        $("#index").removeClass("show");
    }
}

function ButtonEvent() {
    $(".indexButton").click(function () {
        if (window.innerWidth > breakpoint) {
            $("aside").toggleClass("hidden");
            $(".content").toggleClass("col-md-12");
            $(".indexButton").removeAttribute("data-toggle");
            $(".indexButton").removeAttribute("data-target");
        } else {
            $(".indexButton").attr({
                "data-toggle": "collapse",
                "data-target": "#index"
            });
        }
        $(".indexButton i").toggleClass("fa-book fa-times");
    });
}

$(document).ready(
    function () {
        /*        if (window.innerWidth < breakpoint)
         $("#index").removeClass("show");*/
        CorrectStyle(breakpoint);
    }
);

window.onresize = function () {
    CorrectStyle(breakpoint);
    ButtonEvent();
}


$(".next").click(function () {
    $.getJSON("http://localhost:63342/LearningPlatformHTML5App/JSONProvider.php?id=2",
        function (data) {
            $(".currentPageText").text(data.text)
        })
})

$(".previous").click(function () {
    $.getJSON("http://localhost:63342/LearningPlatformHTML5App/JSONProvider.php?id=1",
        function (data) {
            $(".currentPageText").text(data.text)
        })
})

var elems = document.getElementById("index-list").childNodes;

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
        ;
    }
}

BuildList(elems)

$("ul li").click(function (e) {
    e.stopPropagation();
})

/**
 * Created by Artem on 08.02.2017.
 */
var breakpoint = 767;


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
/*        document.getElementById("index").style.height = "auto";
        document.getElementById("content").style.height = "auto";*/
        document.getElementById("content").style.height = height;
        $("#index").removeClass("show");
    }
}

function ButtonEvent() {
    $(".indexButton").click(function () {
        $("aside").toggleClass("hidden");
        $(".content").toggleClass("col-md-12");

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
    console.log(232);
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


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
            document.getElementById("index").style.height = '';
            document.getElementById("index-list").style.height = '';
        }
    }

    onResize() {
        if (this.width > this.breakpoint && window.innerWidth < this.breakpoint) {
            $(".indexButton i").text("list");
            document.getElementById("navbar-collapse").classList.remove("show");
            document.getElementById("content").style.minHeight = this.minHeight;
            document.getElementById("index").classList.remove("show");
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
    let buttonText = $(".indexButton").find("i").text();
    buttonText === "list" ? buttonText = "clear" : buttonText = "list";
    $(".indexButton").find("i").text(buttonText);
    if (window.innerWidth > breakpoint) {
        //$(".index-container").toggleClass("hidden");
        //первый if - обработка бага с изменением темы
        if ($("#index").hasClass("show") && $(".content").hasClass("col-md-12")) {
            $(".content").removeClass("col-md-12");
            $("#index").removeClass('show');
            setTimeout(() => {
                $("#index-container").show();
                $("#index").collapse("show");
            }, contentAnimationTime)

        } else if ($("#index").hasClass("show")) {
            $("#index").collapse("hide");
            setTimeout(() => {
                $("#index-container").hide();
                $(".content").addClass("col-md-12");
            }, indexAnimationTime)

        } else {
            $(".content").removeClass("col-md-12");
            setTimeout(() => {
                $("#index-container").show();
                $("#index").collapse("show");
            }, contentAnimationTime)
        }
    } else {
        try {
            $("aside").collapse("toggle");
        }
        catch (e) {
        }
    }
}
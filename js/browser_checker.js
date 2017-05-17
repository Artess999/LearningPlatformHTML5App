/**
 * Created by Artess on 09.05.17.
 */

class InitialChecks {
    constructor() {

        this.version = "";
        this.browser = "";
        this.requirements = {
            "opr": 43,
            "chrome": 51,
            "firefox": 51,
            "safari": 10
        };
        this.nav = navigator.userAgent.toLowerCase();

        this.setBrowser();
        this.setVersion();
        this.checkRequirements(this.browser, this.version);

        console.log(this.browser);
        console.log(this.version);
    }


    setBrowser() {
        let nav = this.nav;
        switch (true) {
            case nav.indexOf("opr") > -1:
                this.browser = "opr";
                break;
            case nav.indexOf("edge") > -1:
                this.browser = "other";
                break;
            case nav.indexOf("chrome") > -1:
                this.browser = "chrome";
                break;
            case nav.indexOf("firefox") > -1:
                this.browser = "firefox";
                break;
            case nav.indexOf("safari") > -1:
                this.browser = "safari";
                break;
            default:
                this.browser = "other";
                break;
        }
    }

    setVersion() {
        let nav = this.nav;
        let namePos = -1;
        let version = "";

        switch (this.browser) {
            case "opr":
                this.version = ver("opr");
                break;
            case "chrome":
                this.version = ver("chrome");
                break;
            case "firefox":
                this.version = ver("firefox");
                break;
            case "safari":
                this.version = ver("version");
                break;
            default:
                this.version = "other";
                break;
        }

        function ver(browserName) {
            namePos = nav.indexOf(browserName + "/");
            if (namePos !== -1) {
                version = nav.slice(nav.indexOf("/", namePos) + 1, nav.indexOf(" ", namePos));
                if (version.indexOf(".") > -1) {
                    version = version.slice(0, version.indexOf("."));
                }
            } else {
                version = "NaN";
            }
            return +version;
        }
    }

    checkRequirements(browser, version) {
        if (isNaN(version)){
            browser = "other";
        }
        if (version < this.requirements[browser]) {
            alert(`Версия вашего браузера не поддерживается. Для корректной работы системы используйте версию браузера начиная с ${this.requirements[browser]}.`);
        }
        if (browser === "other") {
            alert("Ваш браузер не поддерживается. Для корректной работы системы используйте Chrome, Opera, Firefox или Safari.");
        }
    }
}

let initialChecks = new InitialChecks();
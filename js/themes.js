/**
 * Created by Artem on 28.04.2017.
 */
class ThemeModal {
    constructor() {
        let themeButton = $('<button class="btn themeButton" data-toggle="modal" data-target="#theme-modal">' +
            '<i class="material-icons">color_lens</i>' +
            '</button>');

        let themeModal = $(`<div class="modal fade theme-modal" id="theme-modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Темы</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="themes-container">
                
                </div>            
            </div>
        </div>
    </div>
</div>`);

        $('.navbar-collapse').append(themeButton);
        $('body').append(themeModal);

        this.themesContainer = $('.theme-modal').find('.themes-container');
    }

    createButton(classname, text, handler, message) {

        let button = $(`<button class="button-theme ${classname}">${text}</button>`);

        button.on('click', handler);
        $(this.themesContainer).append(button);
    }
}

class Styles {
    static setStandart() {
        let headerFooterStyle = {'background-color': '', 'color': ''};
        let bodyStyle = {'background-color': '', 'font-size': ''};
        let contentStyle = {
            'background-color': '',
            'color': ''
        };
        let headerButtonsStyle = {'color': '', 'font-size': ''};
        let leadStyle = headerButtonsStyle;

        Styles.applyStyle(headerFooterStyle, bodyStyle, contentStyle, headerButtonsStyle, leadStyle);
    }

    static setBright() {
        let headerFooterStyle = {'background-color': 'orange', 'color': ''};
        let bodyStyle = {'background-color': '', 'font-size': ''};
        let contentStyle = {
            'background-color': '',
            'color': ''
        };
        let headerButtonsStyle = {'color': '', 'font-size': ''};
        let leadStyle = headerButtonsStyle;

        Styles.applyStyle(headerFooterStyle, bodyStyle, contentStyle, headerButtonsStyle, leadStyle);
    }

    static setDark() {

        let headerFooterStyle = {'background-color': '#212121', 'color': ''};
        let bodyStyle = {'background-color': '#303030', 'font-size': ''};
        let contentStyle = {
            'background-color': '#424242',
            'color': 'white'
        };
        let headerButtonsStyle = {'color': '', 'font-size': ''};
        let leadStyle = headerButtonsStyle;

        Styles.applyStyle(headerFooterStyle, bodyStyle, contentStyle, headerButtonsStyle, leadStyle);
    }

    static setLight() {
        let headerFooterStyle = {'background-color': '#c2c2c2', 'color': 'black'};
        let bodyStyle = {'background-color': '#f5f5f5', 'font-size': ''};
        let contentStyle = {
            'background-color': '',
            'color': ''
        };
        let headerButtonsStyle = {'color': 'rgba(0,0,0,0.8)', 'font-size': ''};
        let leadStyle = {'color': 'black', 'font-size': ''};

        Styles.applyStyle(headerFooterStyle, bodyStyle, contentStyle, headerButtonsStyle, leadStyle);
    }

    static setWeakSighted() {
        let headerFooterStyle = {'background-color': 'white', 'color': 'black'};
        let bodyStyle = {'background-color': 'white', 'font-size': '30px'};
        let contentStyle = {
            'background-color': '',
            'color': ''
        };
        let headerButtonsStyle = {'color': 'black', 'font-size': '40px'};
        let leadStyle = {'color': 'black', 'font-size': '30px'};

        Styles.applyStyle(headerFooterStyle, bodyStyle, contentStyle, headerButtonsStyle, leadStyle);
    }

    static applyStyle(headerFooterStyle, bodyStyle, contentStyle, headerButtonsStyle, leadStyle) {
        $('header').css(headerFooterStyle);
        $('footer').css(headerFooterStyle);
        $('body').css(bodyStyle);
        $('#index').css(contentStyle);
        $('.card-header').filter('.controlfunctions').css(contentStyle);
        $('.card-header').find('i').css(contentStyle);
        $('.currentPage').css(contentStyle);
        $('header').find('button').css(headerButtonsStyle);

        $('.social-button').css(headerButtonsStyle);

        $('.lead').css(leadStyle);

        display.setCurrentSizes();
        display.correctStyle();
    }

}

let themeChooser = new ThemeModal();
themeChooser.createButton('standart', '', Styles.setStandart);
themeChooser.createButton('bright', '', Styles.setBright);
themeChooser.createButton('dark', '', Styles.setDark);
themeChooser.createButton('light', '', Styles.setLight);
themeChooser.createButton('weak-sighted', '<i class="material-icons">visibility</i>', Styles.setWeakSighted);
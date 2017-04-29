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
        let headerFooterStyle = {'background-color': ''};
        let bodyStyle = {'background-color': ''};
        let contentStyle = {
            'background-color': '',
            'color': ''
        };

        Styles.applyStyle(headerFooterStyle, bodyStyle, contentStyle);
    }

    static setBright() {
        let headerFooterStyle = {'background-color': 'orange'};
        let bodyStyle = {'background-color': ''};
        let contentStyle = {
            'background-color': '',
            'color': ''
        };

        Styles.applyStyle(headerFooterStyle, bodyStyle, contentStyle);
    }

    static setDark() {

        let headerFooterStyle = {'background-color': '#212121'};
        let bodyStyle = {'background-color': '#303030'};
        let contentStyle = {
            'background-color': '#424242',
            'color': 'white'
        };

        Styles.applyStyle(headerFooterStyle, bodyStyle, contentStyle);
    }

    static setLight() {
        $('header').css('background-color', '#EEEEEE');
        $('footer').css('background-color', '#EEEEEE');
    }

    static setWeakSighted() {
        $('header').css('background-color', '#2196F3');
        $('footer').css('background-color', '#2196F3');
    }

    static applyStyle(headerFooterStyle, bodyStyle, contentStyle) {
        $('header').css(headerFooterStyle);
        $('footer').css(headerFooterStyle);
        $('body').css(bodyStyle);
        $('#index').css(contentStyle);
        $('.card-header').filter('.controlfunctions').css(contentStyle);
        $('.card-header').find('i').css(contentStyle);
        $('.currentPage').css(contentStyle);
    }

}

let themeChooser = new ThemeModal();
themeChooser.createButton('standart', '', Styles.setStandart);
themeChooser.createButton('bright', '', Styles.setBright);
themeChooser.createButton('dark', '', Styles.setDark);
themeChooser.createButton('light', '', Styles.setLight);
themeChooser.createButton('weak-sighted', '<i class="material-icons">visibility</i>', Styles.setWeakSighted);
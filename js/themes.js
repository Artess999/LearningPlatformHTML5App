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
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Отменить</button>
                <button type="button" class="btn btn-primary">Сохранить</button>
            </div>
        </div>
    </div>
</div>`);

        $('.navbar-collapse').append(themeButton);
        $('body').append(themeModal);

        this.modalBody = $('.theme-modal').find('.modal-body');
    }

    createButton(classname, text, handler){
        let button = $(`<button class="${classname}">${text}</button>`);
        button.on('click', handler);
        $(this.modalBody).append(button);
    }
}

class Styles {

    static setOrangeStyle(){
        $('header').css('background-color', 'orange');
        $('footer').css('background-color', 'orange');
    }

}

let themeChooser = new ThemeModal();
themeChooser.createButton('orange', 'оранж', Styles.setOrangeStyle);
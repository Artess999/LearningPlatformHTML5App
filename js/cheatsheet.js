/**
 * Created by Artess on 07.05.17.
 */

class CheatModal {
    constructor() {
        this.cheatButton = $('<button class="btn cheatButton" data-toggle="modal" data-target="#cheat-modal">' +
            '<i class="material-icons">book</i>' +
            '</button>');
        this.cheatAddButton = $('<button class="btn cheatAddButton">' +
            '<i class="material-icons">note_add</i>' +
            '</button>');

        let cheatModal = $(`<div class="modal fade cheat-modal" id="cheat-modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Шпаргалка</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <textarea class="cheat-container">
                
                </textarea>            
            </div>
        </div>
    </div>
</div>`);

        $('body').append(cheatModal);

        this.cheatContainer = $('.cheat-modal').find('.cheat-container');
        this.cheatContainer.change(() => localStorage.cheatText = this.cheatContainer.val());


        localStorage.cheatText = localStorage.cheatText || "";
    }

    cheatButtonSetup() {
        this.cheatButton.click(() => this.cheatContainer.val(localStorage.cheatText));
        $('.navbar-collapse').append(this.cheatButton);
    }

    cheatAddButtonSetup() {
        this.cheatAddButton.click(() => {
            let text = window.getSelection().toString();
            if (text) {
                localStorage.cheatText += text;
            }
            else {
                alert("Выберите текст для добавления в шпаргалки!");
            }
        });
        $('.navbar-collapse').append(this.cheatAddButton);
    }
}

let cheatModal = new CheatModal();
cheatModal.cheatButtonSetup();
cheatModal.cheatAddButtonSetup();
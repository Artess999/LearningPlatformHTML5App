/**
 * Created by Artem on 14.05.2017.
 */

class Auth {
    constructor() {
        this.bookId = 1;
        this.addr = 'http://elbook.ml/api/rest/';

        this._initial();
    }

    _initial() {
        $.ajax(this.addr + 'getparametrs', {
            data: {"bookId": this.bookId, "params": 'title'},
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.code === 401) {
                    alert("Вы не авторизованы!");
                    document.body.innerHTML = '<div class="alert">Вы не авторизованы!</div>';
                }
            }
        })
    }
}

let auth = new Auth();
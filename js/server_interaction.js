/**
 * Created by Artem on 12.05.2017.
 */

class Server {
    constructor() {
        this.bookId = 1;
        this._initial();
    }

    _initial() {
        let required = ['title', 'copyright'];
        $.ajax('http://elbook.ml/api/rest/getparametrs', {
            data: {"bookId": this.bookId, "params": required.toString()},
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.code === 200){
                    res.response.forEach(function (param) {
                        switch (param.name){
                            case 'title':
                                $('#title').html(param.value);
                                break;
                            case 'copyright':
                                $('#copyright').html(param.value);
                                break;
                        }
                    })
                }
            },
            error: function (xmlhttprequest, textstatus, message) {
                console.log(xmlhttprequest, textstatus, message);
            }
        })
    }
}

let server = new Server();
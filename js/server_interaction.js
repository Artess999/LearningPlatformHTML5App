/**
 * Created by Artem on 12.05.2017.
 */

class Server {
    constructor() {
        this.bookId = 1;
        this.addr = 'http://elbook.ml/api/rest/';

        this._initial();

        this.getPage(1);
    }

    _initial() {
        let required = ['title', 'copyright'];
        $.ajax(this.addr + 'getparametrs', {
            data: {"bookId": this.bookId, "params": required.toString()},
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.code === 200) {
                    res.response.forEach(function (param) {
                        switch (param.name) {
                            case 'title':
                                $('#title').html(param.value);
                                break;
                            case 'copyright':
                                $('#copyright').html(param.value);
                                break;
                        }
                    })
                } else {
                    alert("Произошла ошибка! Номер ошибки: " + res.code);
                }
            },
            error: function (xmlhttprequest, textstatus, message) {
                console.log(xmlhttprequest, textstatus, message);
                alert("Произошла ошибка!");
            }
        })
    }

    getPage(id){
        $.ajax(this.addr + 'getpade', {
            data: {"bookId": this.bookId, "pades": id},
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.code === 200) {
                    res.response.forEach(function (page) {
                        console.log(page.id, page.title, page.content);
                    })
                } else {
                    alert("Произошла ошибка! Номер ошибки: " + res.code);
                }
            },
            error: function (xmlhttprequest, textstatus, message) {
                console.log(xmlhttprequest, textstatus, message);
                alert("Произошла ошибка!");
            }
        })
    }
}

let server = new Server();
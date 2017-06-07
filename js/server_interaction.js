/**
 * Created by Artem on 12.05.2017.
 */

// ЗАПИЛИТЬ ТАЙМАУТ 10 СЕКУНД!!!!

class Server {
    constructor() {
        this.bookId = 1;
        this.addr = 'http://elbook.ml/api/rest/';
        this.curPageIndex = 0;
        this.navTree = [];

        this._initial();

        this.getPage(1);
        this.getNavigation(1);
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

    getPage(id) {
        $.ajax(this.addr + 'getpade', {
            data: {"bookId": this.bookId, "pades": id},
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.code === 200) {
                    res.response.forEach(page => {
                        //console.log(page.id, page.title, page.content);
                        $("#currentPageTitle").text(page.title);
                        $("#currentPageText").html(page.content);
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

    getNavigation(id) {
        $.ajax(this.addr + 'getparametrs', {
            data: {"bookId": this.bookId, "params": "nav"},
            dataType: "json",
            context: this,
            success: function (res) {
                console.log(res);
                if (res.code === 200) {
                    res.response.forEach(data => {
                        let $nav = $('<ul class="nav flex-column" id="index-list"></ul>');
                        let navTreeJSON = JSON.parse(data.value);
                        navTreeJSON.content.forEach(el => {
                            if (el.child.length == 0) {
                                console.log(el.name, el.id);
                                let $el = $(`<li>${el.name}</li>`);
                                $el.click(()=> {
                                        this.curPageIndex = this.navTree.indexOf(el.id);
                                        this.getPage(el.id)
                                    }
                                );
                                $nav.append($el);
                                this.navTree.push(el.id);
                            } else {
                                let $el = $(`<li>${el.name}<i class="material-icons">arrow_drop_down</i><ul class="collapse"></ul></li>`);
                                $el.click(function () {
                                    $(this).find('ul').toggleClass('collapse')
                                });
                                $nav.append($el);
                                el.child.forEach(childEl => {
                                    let $childEl = $(`<li>${childEl.name}</li>`);
                                    $childEl.click((e)=> {
                                        e.stopPropagation();
                                        this.getPage(childEl.id);
                                        this.curPageIndex = this.navTree.indexOf(childEl.id);
                                    });
                                    $nav.find('ul').append($childEl);
                                    this.navTree.push(childEl.id);
                                    console.log(childEl.name);
                                });
                            }
                        });
                        $('#index').html($nav);
                        $('.previous').click(()=> {
                            if (this.curPageIndex > 0) {
                                let i = --this.curPageIndex;
                                this.getPage(this.navTree[i]);
                            }
                        });
                        $('.next').click(()=> {
                            if (this.curPageIndex < this.navTree.length - 1) {
                                let i = ++this.curPageIndex;
                                this.getPage(this.navTree[i]);
                            }
                        });
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
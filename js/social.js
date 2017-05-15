/**
 * Created by Artess on 09.05.17.
 */

class Social {
    constructor() {
        let social = `<div class="col-md-4 socicons">
                <a href="https://vk.com/share.php?url=http://obuchaushaiaplatforma.com&title=Я пользуюсь Учебной Платформой!!!!" target="_blank"
                   class="socicon-vkontakte social-button">
                </a>
                <a href="http://twitter.com/intent/tweet?text=Я пользуюсь Учебной Платформой!!!!" target="_blank"
                   class="socicon-twitter social-button">
                </a>
                <a href="http://www.facebook.com/sharer.php?s=100" target="_blank" class="socicon-facebook social-button">
                </a>
            </div>`;

        $('footer').find('.row').append(social);
    }
}

let social = new Social();
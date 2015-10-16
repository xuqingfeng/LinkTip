/**
 * Created by jsxqf on 15/9/14.
 */

var linkTipStyleHTML = "<style type='text/css' id='link-tip-style'>@import url(" + chrome.runtime.getURL('content_scripts/link-tip.css') + ")</style>";
var linkTipHintHTML = "<style type='text/css' id='link-tip-hint'>@import url(" + chrome.runtime.getURL('lib/hint.min.css') + ")</style>";
var linkTipNotificationHTML = "<div class='link-tip-notification'>LinkTip Is Activated .</div>";

$('body').append("<div id='link-tip-area'></div>");
// use shadow dom
var linkTipArea = document.querySelector('#link-tip-area');
var shadowRoot = linkTipArea.createShadowRoot();

var linksIgnored = [
    "javascript",
    "javascript:",
    "javascript:void(0)"
];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if ('toggle-link-tip' == request.action) {

        if (request.activated) {

            $('#link-tip-area').empty();
            shadowRoot.innerHTML = '';

            chrome.storage.local.set({'activated': false});

            // remove tooltip
            $('a').each(function () {
                var href = $(this).attr('href');
                if (href) {
                    $(this).removeClass('hint--bottom hint--rounded hint--bounce hint--info');
                    $(this).removeAttr('data-hint');
                }
            });

        } else {

            shadowRoot.innerHTML = linkTipStyleHTML + linkTipHintHTML + linkTipNotificationHTML;

            // $('#link-tip-area').append(linkTipStyleHTML);
            // $('#link-tip-area').append(linkTipHintHTML);
            // $('#link-tip-area').append(linkTipNotificationHTML);

            chrome.storage.local.set({'activated': true});

            // add tooltip
            $('a').each(function () {
                var href = $(this).attr('href');
                if (href && linksIgnored.indexOf(href) == -1 && !$(this).hasClass('hidden')) {
                    $(this).addClass('hint--bottom hint--rounded hint--bounce hint--info');
                    // use attr instead
                    //$(this).data('hint', href);
                    $(this).attr('data-hint', href);
                }
            });
        }

    }
});
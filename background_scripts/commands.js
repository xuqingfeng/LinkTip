/**
 * Created by jsxqf on 15/9/14.
 */

chrome.storage.local.set({'activated': false});

chrome.commands.onCommand.addListener(function (command) {

    if ('toggle-link-tip' == command) {

        chrome.storage.local.get('activated', function (items) {
            // put in callback.
            var message = {};
            message.action = "toggle-link-tip";
            message.activated = items.activated;

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
                });
            });
        });

    }
});
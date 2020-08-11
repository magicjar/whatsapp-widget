[![npm version](https://img.shields.io/npm/v/whatsapp-widget.svg)](https://www.npmjs.com/package/whatsapp-widget)
[![JS gzip size](https://img.badgesize.io/magicjar/whatsapp-widget/master/dist/js/whatsapp-widget.min.js?compression=gzip&label=JS%20gzip%20size)](https://github.com/magicjar/whatsapp-widget/tree/master/dist/js/whatsapp-widget.min.js)
[![CSS gzip size](https://img.badgesize.io/magicjar/whatsapp-widget/master/dist/css/whatsapp-widget.min.css?compression=gzip&label=CSS%20gzip%20size)](https://github.com/magicjar/whatsapp-widget/tree/master/dist/css/whatsapp-widget.min.css)
[![Code license](https://img.shields.io/github/license/magicjar/whatsapp-widget)](#license)

# WhatsApp Widget

A simple WhatsApp live chat widget for your website.

## Table of content

- [Getting started](#getting-started)
- [Usage](#usage)
    - [Built in form](#built-in-form)
    - [Custom form](#custom-form)
- [Configs](#configs)
- [License](#license)

## Getting started

There are some ways to import the package
- [Download the latest release.](https://github.com/magicjar/whatsapp-widget/releases)
- Clone the repo:

    `git clone https://github.com/magicjar/whatsapp-widget.git`
    
- Install with [npm](https://www.npmjs.com/):
    
    `npm install whatsapp-widget`

- CDN from [jsDelivr](https://www.jsdelivr.com)

    [https://www.jsdelivr.com/package/npm/whatsapp-widget](https://www.jsdelivr.com/package/npm/whatsapp-widget)

## Usage

Include the `css` inside `head` tag and `javascript` file inside `body` tag of your html file.

``` html
<link rel="stylesheet" href="/dist/css/whatsapp-widget.min.css">
```

``` html
<script src="/dist/js/whatsapp-widget.min.js"></script>
```

### Built in form

To use our built-in chat form, copy and paste this HTML code inside `<body>` tag. Replace `{phone_number}` with your number in international format (Leading zero replaced with country code) and omit any brackets and dashes.

``` html
<form id="whatsapp" class="wa-widget" action="{phone_number}" data-chat="whatsapp"></form>
```

To initiate the built in widget, place this script before `</body>` closing tag.

``` html
<script>
    // WhatsAppWidget(element, { configs }, [ inputs ])

    var chat = new WhatsAppWidget(document.getElementById('whatsapp'), {
        // configs...
    }, [
        // array of input object
    ]);
</script>
```
From v1.2.0, you can create as many inputs as you want with `built-in form` by creating an array of input object with `data`, `type`, and `required` properties.

Example:
``` text
[{
    data: 'name',
    type: 'text',
    required: true
}, {
    data: 'email',
    type: 'email',
    required: false
}, {
    data: 'message',
    type: 'text',
    required: true
}]
```

This will create three inputs.
 1. `Name` input with `text` type and it's required / mandatory
 2. `Email` input with `email` type and it's opsional
 3. `Message` input with `text` type and it's required / mandatory

### Custom form

To make a custom form, first you have to create `form` element with an `id` attribute, `data-chat` attribute and `action` attribute to put your phone number. Inside the form you have to add an element with `wa-widget-content` class.

``` html
<form id="billing-support" action="{phone_number}" data-chat="billing-support">
    <div class="wa-widget-content">
        <!-- your input -->
    </div>
</form>
```

And for the input form to write a chat or message, you only need to create an `input` element with `data-message` attribute inside the form element. You can add an input as many as you want as long as it has `data-message` attribute.

``` html
<input data-message="name" type="text" placeholder="Your name" required>
<input data-message="message" type="text" placeholder="Your message">
<!-- more input -->
```

Lastly, add a button inside the form with `submit` type and `data-toggle="wa-send"` attribute to send the chat.

``` html
<button type="submit" data-toggle="wa-send">Chat</button>
```

**The custom form will automaticaly initiated without a script.**

### Toggleable custom form

If you want to make your custom form toggleable (show and hide) with a click. Just create a link element `a` or a `button` element with `data-toggle="wa-chat"` and `data-target="#{form_id}"`.

``` html
<a class="button" data-toggle="wa-chat" data-target="#billing-support" href="#billing-support">Link</a>

<!-- OR -->

<button class="button" data-toggle="wa-chat" data-target="#customer-support">Button</button>
```

On button toggled, it will automaticaly add `expanded` class on it self and on the `form` element on show, and will remove `expanded` class on hide.

## Configs

Name | Type | Default | Description
---- | ---- | ------- | -----------
name | string | '' | Chat / person name
division | string | '' | Division name
photo | string | '' | Company logo or person photo
introduction | string | '' | Chat introduction

## License

Copyright (c) 2020 - Fajar Setya Budi.

WhatsApp Widget released under the [MIT License](https://github.com/magicjar/whatsapp-widget/blob/master/LICENSE).
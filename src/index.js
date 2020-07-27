/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
const CLASS_NAME_WIDGET_CONTAINER = 'wa-widget'
const CLASS_NAME_WIDGET_COLLAPSED = 'collapsed'
const CLASS_NAME_WIDGET_TOGGLE = 'wa-widget-toggle'
const CLASS_NAME_WIDGET_CONTENT = 'wa-widget-content'

const SELECTOR_CHAT_WIDGET = '[data-chat]'
const SELECTOR_DATA_TOGGLE = '[data-toggle="wa-chat"]'
const SELECTOR_DATA_SUBMIT = '[data-chat="submit"]'

const DefaultConfig = {
    show: false,
    phoneNumber: '',
    name: 'Default Name',
    division: 'Customer Supports',
    photo: '',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
}

const DefaultType = {
    show: 'boolean',
    phoneNumber: 'string',
    name: 'string',
    division: 'string',
    photo: 'string',
    introduction: 'string'
}

const ChatData = {}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
export default class Chat {
    constructor(element, config) {
        if (ChatData[element.id])
            return

        this._element = element       
        this._config = this._getConfig(config)
        this._config.phoneNumber = this._element.getAttribute('action')
        this._isShown = this._config.show ? true : false
        this._toggleElement = ''
        this._contentElement = ''
        this._submitButton = ''
        this._buildHTML = this._buildHTML()
        this._cacheElements()
        if (this._buildHTML)
            this._isShown ? this._show() : this._hide()
        else
            this._show()
        
        ChatData[element.id] = this
        console.log(ChatData);
    }

    // PUBLIC
    toggle() {
        console.log('TOGGLED');
        this._isShown ? this._hide() : this._show()
    }

    // PRIVATE
    _sendMessage() {
        const send_url = 'https://web.whatsapp.com/send'

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            send_url = 'whatsapp://send'

        const message = this._element.querySelectorAll('[data-message="message"]').value
        const parameters = send_url + '?phone=' + this._config.phoneNumber + '&text=' + message

        window.open(parameters, '_blank')
    }

    _buildHTML() {
        if (this._element.innerHTML) {
            return false
        }

        const _collapsed = this._isShown ? CLASS_NAME_WIDGET_COLLAPSED : ''

        const HTML_ELEMENT_WIDGET_MAIN = 
            `<a class="${CLASS_NAME_WIDGET_TOGGLE} ${_collapsed}" data-toggle="wa-chat" href="#${this._element.id}" data-target="#${this._element.id}"></a>
            <div id="${this._element.id}" class="${CLASS_NAME_WIDGET_CONTENT} chat-tab ${_collapsed}">
                <header class="chat-header">
                    <img class="chat-admin-picture" src="${this._config.photo}" alt="${this._config.name}'s Photos">
                    <div class="chat-admin-details">
                        <h3>${this._config.name}</h3>
                        <p>${this._config.division}</p>
                    </div>
                </header>
                <div class="chat-content">
                    <div class="chat-item">
                        <img class="chat-admin-picture" src="${this._config.photo}" alt="${this._config.name}'s Photos">
                        <div>
                            <p>${this._config.introduction}</p>
                        </div>
                    </div>
                </div>
                <div class="chat-form">
                    <input data-message="name" type="text" placeholder="Your name">
                    <input data-message="message" type="text" placeholder="Your message">
                    <button class="chat-send" type="submit" data-chat="submit"><strong>Send</strong></button>
                </div>
            </div>`
        
        this._element.insertAdjacentHTML('afterbegin', HTML_ELEMENT_WIDGET_MAIN)
        return true
    }

    _cacheElements() {
        this._toggleElement = this._element.querySelector(SELECTOR_DATA_TOGGLE)
        this._contentElement = this._element.getElementsByClassName(`${CLASS_NAME_WIDGET_CONTENT}`).item(0)
        this._submitButton = this._element.querySelector(SELECTOR_DATA_SUBMIT)
        
        if (this._toggleElement) {
            this._toggleElement.addEventListener("click", () => {
                this.toggle()
            })
        }
    }

    _show() {
        console.log('SHOW')
        this._element.classList.add(CLASS_NAME_WIDGET_COLLAPSED)
        if (this._toggleElement){
            this._toggleElement.classList.add(CLASS_NAME_WIDGET_COLLAPSED)
            this._contentElement.classList.add(CLASS_NAME_WIDGET_COLLAPSED)
            this._expandSection()
        }
        
        this._submitButton.addEventListener('click', (e) => {
            e.preventDefault()
            this._sendMessage()
        })

        this._isShown = true
    }

    _hide() {
        console.log('HIDE')
        this._element.classList.remove(CLASS_NAME_WIDGET_COLLAPSED)
        if (this._toggleElement) {
            this._toggleElement.classList.remove(CLASS_NAME_WIDGET_COLLAPSED)
            this._contentElement.classList.remove(CLASS_NAME_WIDGET_COLLAPSED)
            this._collapseSection()
        }
        
        this._submitButton.removeEventListener('click', (e) => {
            e.preventDefault()
            this._sendMessage()
        })

        this._isShown = false
    }

    _expandSection() {
        const element = this._element
        const contentElement = this._contentElement

        element.style.width = contentElement.scrollWidth + 'px'
    }

    _collapseSection() {
        const element = this._element
        const toggleElement = this._toggleElement
        element.style.width = toggleElement.scrollWidth + 'px'
    }

    _getConfig(config) {
        config = {
            ...DefaultConfig,
            ...config
        }
        this._typeCheckConfig('Widget', config, DefaultType)
        return config
    }

    _typeCheckConfig(componentName, config, configTypes) {
        Object.keys(configTypes).forEach(property => {
            const expectedTypes = configTypes[property]
            const value = config[property]
            const valueType = value && this._isElement(value) ?
                'element' :
                this._toType(value)

            if (!new RegExp(expectedTypes).test(valueType)) {
                throw new Error(
                    `${componentName.toUpperCase()}: ` +
                    `Option "${property}" provided type "${valueType}" ` +
                    `but expected type "${expectedTypes}".`)
            }
        })
    }

    _isElement(obj) {
        (obj[0] || obj).nodeType
    }

    // AngusCroll (https://goo.gl/pxwQGp)
    _toType(obj) {
        if (obj === null || obj === undefined) {
            return `${obj}`
        }

        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
    }
}

const _getElementFromSelector = element => {
    const selector = _getSelector(element)

    return selector ? document.querySelector(selector) : null
}

const _getSelector = element => {
    let selector = element.getAttribute('data-chat')

    if (!selector || selector === '#') {
        const hrefAttr = element.getAttribute('href')
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null
    }

    return selector
}

const _getDataAttributes = element => {
    if (!element) {
        return {}
    }

    const attributes = {
        ...element.dataset
    }

    Object.keys(attributes).forEach(key => {
        attributes[key] = _normalizeData(attributes[key])
    })

    return attributes
}

const _normalizeData = val => {
    if (val === 'true') {
        return true
    }

    if (val === 'false') {
        return false
    }

    if (val === Number(val).toString()) {
        return Number(val)
    }

    if (val === '' || val === 'null') {
        return null
    }

    return val
}

document.body.onload = () => {
    const chatSelector = document.querySelectorAll(SELECTOR_CHAT_WIDGET)
    for (let i = 0; i < chatSelector.length; i++) {
        const element = chatSelector[i]
        const data = new Chat(element, {})
    }
}

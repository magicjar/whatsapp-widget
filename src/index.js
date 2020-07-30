/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
const CLASS_NAME_WIDGET_TOGGLE = 'wa-widget-toggle'
const CLASS_NAME_WIDGET_CONTENT = 'wa-widget-content'
const CLASS_NAME_WIDGET_EXPANDED = 'expanded'

const SELECTOR_VALUE_TOGGLE_CHAT = 'wa-chat'
const SELECTOR_VALUE_TOGGLE_SEND = 'wa-send'

const SELECTOR_CHAT_WIDGET = '[data-chat]'
const SELECTOR_DATA_TOGGLE_CHAT = `[data-toggle="${SELECTOR_VALUE_TOGGLE_CHAT}"]`
const SELECTOR_DATA_TOGGLE_SEND = `[data-toggle="${SELECTOR_VALUE_TOGGLE_SEND}"]`

const DefaultConfig = {
    show: false,
    name: 'Default Name',
    division: 'Customer Supports',
    photo: '',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
}

const DefaultType = {
    show: 'boolean',
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
        this._phoneNumber = this._element.getAttribute('action')
        this._isShown = this._config.show ? true : false
        this._toggleChat = ''
        this._contentElement = ''
        this._toggleSend = ''
        this._buildHTML()
        this._cacheElements()
        if (this._isShown) this._show()

        ChatData[element.id] = this
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
        const parameters = send_url + '?phone=' + this._phoneNumber + '&text=' + message

        window.open(parameters, '_blank')
    }

    _buildHTML() {
        if (this._element.innerHTML) return false

        const HTML_ELEMENT_WIDGET_MAIN = 
            `<a class="${CLASS_NAME_WIDGET_TOGGLE}" data-toggle="${SELECTOR_VALUE_TOGGLE_CHAT}" data-target="#${this._element.id}" href="#${this._element.id}"></a>
            <div class="${CLASS_NAME_WIDGET_CONTENT} chat-tab">
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
                    <button class="chat-send" type="submit" data-toggle="${SELECTOR_VALUE_TOGGLE_SEND}"><strong>Send</strong></button>
                </div>
            </div>`
        
        this._element.insertAdjacentHTML('afterbegin', HTML_ELEMENT_WIDGET_MAIN)
        return true
    }

    _cacheElements() {
        this._toggleChat = document.querySelector(`${SELECTOR_DATA_TOGGLE_CHAT}[data-target="#${this._element.id}"]`)
        this._contentElement = this._element.getElementsByClassName(CLASS_NAME_WIDGET_CONTENT).item(0)
        this._toggleSend = this._element.querySelector(SELECTOR_DATA_TOGGLE_SEND)
        if (this._toggleChat) {
            this._toggleChat.addEventListener("click", (e) => {
                e.preventDefault()
                this.toggle()
            })
        }
        if (this._toggleSend) {
            this._toggleSend.addEventListener('click', (e) => {
                e.preventDefault()
                this._sendMessage()
            })
        }
    }

    _show() {
        console.log('SHOW')
        this._element.classList.add(CLASS_NAME_WIDGET_EXPANDED)
        this._toggleChat.classList.add(CLASS_NAME_WIDGET_EXPANDED)
        this._contentElement.classList.add(CLASS_NAME_WIDGET_EXPANDED)
        this._expandSection()

        this._isShown = true
    }

    _hide() {
        console.log('HIDE')
        this._element.classList.remove(CLASS_NAME_WIDGET_EXPANDED)
        this._toggleChat.classList.remove(CLASS_NAME_WIDGET_EXPANDED)
        this._contentElement.classList.remove(CLASS_NAME_WIDGET_EXPANDED)
        this._collapseSection()
        
        this._isShown = false
    }

    _expandSection() {
        const element = this._element
        const contentElement = this._contentElement
        element.style.width = contentElement.scrollWidth + 'px'
    }

    _collapseSection() {
        const element = this._element
        const toggleElement = this._toggleChat
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

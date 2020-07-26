/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const CLASS_NAME_WIDGET_CONTAINER = 'wa-widget'
const CLASS_NAME_WIDGET_COLLAPSED = 'collapsed'
const CLASS_NAME_WIDGET_TOGGLE = 'wa-widget-toggle'
const CLASS_NAME_WIDGET_CONTENT = 'wa-widget-content'

const DefaultConfig = {
    show: false,
    theme: 'default',
    phoneNumber: '62891234567890',
    name: 'Fajar Setya Budi',
    division: 'Customer Supports',
    photo: '',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
}

const DefaultType = {
    show: 'boolean',
    theme: 'string',
    phoneNumber: 'string',
    name: 'string',
    division: 'string',
    photo: 'string',
    introduction: 'string'
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

export default class Chat {
    constructor(element, config) {
        this._element = document.querySelector(`.${CLASS_NAME_WIDGET_CONTAINER}[data-chat="${element}"]`)
        this._elementInnerHTML = this._element
        this._config = this._getConfig(config)
        this._isShown = this._config.show ? true : false
        this._toggleElement = ''
        this._contentElement = ''
    }

    // PUBLIC
    init() {
        this._buildHTML()
    }

    // PRIVATE
    _toggle() {
        console.log('TOGGLED');
        this._isShown ? this._hide() : this._show()
    }

    _buildHTML() {
        this._element.innerHTML = ''

        const _collapsed = this._isShown ? CLASS_NAME_WIDGET_COLLAPSED : ''

        const HTML_ELEMENT_WIDGET_MAIN = `<div class="${CLASS_NAME_WIDGET_TOGGLE} ${_collapsed}"></div>
        <div class="${CLASS_NAME_WIDGET_CONTENT} chat-tab ${_collapsed}">
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
                <input type="text" placeholder="Your message">
                <button class="chat-send" type="submit"><strong>Send</strong></button>
            </div>
        </div>`
        
        this._elementInnerHTML = this._element.insertAdjacentHTML('afterbegin', HTML_ELEMENT_WIDGET_MAIN)
        this._toggler = this._element.getElementsByClassName(`${CLASS_NAME_WIDGET_TOGGLE}`).item(0)
        this._contentElement = this._element.getElementsByClassName(`${CLASS_NAME_WIDGET_CONTENT}`).item(0)
        this._toggler.addEventListener("click", () => {
            this._toggle()
        })
    }

    _show() {
        console.log('SHOW')
        this._isShown = true
        this._element.classList.add(CLASS_NAME_WIDGET_COLLAPSED)
        this._toggler.classList.add(CLASS_NAME_WIDGET_COLLAPSED)
        this._contentElement.classList.add(CLASS_NAME_WIDGET_COLLAPSED)
    }

    _hide() {
        console.log('HIDE')
        this._isShown = false
        this._element.classList.remove(CLASS_NAME_WIDGET_COLLAPSED)
        this._toggler.classList.remove(CLASS_NAME_WIDGET_COLLAPSED)
        this._contentElement.classList.remove(CLASS_NAME_WIDGET_COLLAPSED)
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

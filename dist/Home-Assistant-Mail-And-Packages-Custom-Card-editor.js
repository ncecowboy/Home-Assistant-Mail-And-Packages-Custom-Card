const fireEvent = (node, type, detail, options) => {
    options = options || {};
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

const LitElement = customElements.get("hui-masonry-view") ?
    Object.getPrototypeOf(customElements.get("hui-masonry-view")) :
    Object.getPrototypeOf(customElements.get("hui-view"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

export class MailAndPackagesCardEditor extends LitElement {
    setConfig(config) {
        this._config = config;
    }

    static get properties() {
        return {
            hass: {},
            _config: {}
        };
    }

    get _name() {
        return this._config.name || "";
    }

    get _updated() {
        return this._config.updated || "";
    }

    get _deliveries_message() {
        return this._config.deliveries_message || "";
    }

    get _packages_delivered() {
        return this._config.packages_delivered || "";
    }

    get _packages_in_transit() {
        return this._config.packages_in_transit || "";
    }

    get _fedex_packages() {
        return this._config.fedex_packages || "";
    }

    get _ups_packages() {
        return this._config.ups_packages || "";
    }

    get _usps_packages() {
        return this._config.usps_packages || "";
    }

    get _amazon_packages() {
        return this._config.amazon_packages || "";
    }

    get _usps_mail() {
        return this._config.usps_mail || "";
    }

    get _gif_sensor() {
        return this._config.gif_sensor || "";
    }

    get _camera_entity() {
        return this._config.camera_entity || "";
    }

    get _image() {
        return this._config.image !== false;
    }

    get _camera() {
        return this._config.camera !== false;
    }

    get _details() {
        return this._config.details !== false;
    }

    render() {
        if (!this.hass) {
            return html ``;
        }

        return html `
      <div class="card-config">
    Version: 1.1.2
        <div>
          <ha-textfield
            label="Name"
            .value="${this._name}"
            .configValue="${"name"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
            <ha-switch
            .checked=${this._details}
            .configValue="${"details"}"
            @change="${this._valueChanged}"
            >Show Details</ha-switch>
          <ha-entity-picker
            label="Mail Updated Sensor"
            .hass="${this.hass}"
            .value="${this._updated}"
            .configValue=${"updated"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            label="Delivery Message Sensor"
            .hass="${this.hass}"
            .value="${this._deliveries_message}"
            .configValue=${"deliveries_message"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            label="Packages Delivered Sensor"
            .hass="${this.hass}"
            .value="${this._packages_delivered}"
            .configValue=${"packages_delivered"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            label="Packages In Transit Sensor"
            .hass="${this.hass}"
            .value="${this._packages_in_transit}"
            .configValue=${"packages_in_transit"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            label="FedEx Package Sensor"
            .hass="${this.hass}"
            .value="${this._fedex_packages}"
            .configValue=${"fedex_packages"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            label="UPS Package Sensor"
            .hass="${this.hass}"
            .value="${this._ups_packages}"
            .configValue=${"ups_packages"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            label="USPS Package Sensor"
            .hass="${this.hass}"
            .value="${this._usps_packages}"
            .configValue=${"usps_packages"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            label="Amazon Package Sensor"
            .hass="${this.hass}"
            .value="${this._amazon_packages}"
            .configValue=${"amazon_packages"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            label="USPS Mail Sensor"
            .hass="${this.hass}"
            .value="${this._usps_mail}"
            .configValue=${"usps_mail"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
          <ha-switch
            .checked=${this._image}
            .configValue="${"image"}"
            @change="${this._valueChanged}"
            >Show Image</ha-switch
          >
          <ha-entity-picker
            label="GIF Sensor"
            .hass="${this.hass}"
            .value="${this._gif_sensor}"
            .configValue=${"gif_sensor"}
            domain-filter="sensor"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>

        <ha-switch
            .checked=${this._camera}
            .configValue="${"camera"}"
            @change="${this._valueChanged}"
            >Show Camera</ha-switch
          >

        <ha-entity-picker
            label="Camera Entity"
            .hass="${this.hass}"
            .value="${this._camera_entity}"
            .configValue=${"camera_entity"}
            domain-filter="camera"
            @change="${this._valueChanged}"
            allow-custom-entity
          ></ha-entity-picker>
        </div>
      </div>
    `;
    }

    _valueChanged(ev) {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target;
        if (this[`_${target.configValue}`] === target.value) {
            return;
        }
        if (target.configValue) {
            if (target.value === "") {
                delete this._config[target.configValue];
            } else {
                this._config = {
                    ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
                };
            }
        }
        fireEvent(this, "config-changed", {
            config: this._config
        });
    }

    static get styles() {
        return css `
      ha-switch {
        padding-top: 16px;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1;
        padding-right: 4px;
      }
    `;
    }
}

customElements.define("mail-and-packages-card-editor", MailAndPackagesCardEditor);

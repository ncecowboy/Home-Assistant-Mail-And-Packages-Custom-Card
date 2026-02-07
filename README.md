# Home-Assistant-Mail-And-Packages-Custom-Card
A Custom Lovelace card to pull together the mail and packages sensors.

> **⚠️ Important**: If your card stopped working after updating the Mail and Packages integration, see the [Migration Guide](MIGRATION.md) for instructions on updating your configuration.

<img src="https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages-Custom-Card/blob/master/img/card-image.png?raw=true" alt="Preview of card" />

## Lovelace GUI Setup

## Manual Install
Both JS files need to be stored inside the path/to/config/www/ folder. In the Lovelace reource URL path, local is the same as the www folder. Construct your path to the JS inside the www folder for the resurce URL. For the example below:
```
path/to/config/www/Home-Assistant-Mail-And-Packages-Custom-Card/Home-Assistant-Mail-And-Packages-Custom-Card.js

path/to/config/www/Home-Assistant-Mail-And-Packages-Custom-Card/Home-Assistant-Mail-And-Packages-Custom-Card-editor.js
```
Configuration > Lovelace Dashboards > Resources

```
url: /local/Home-Assistant-Mail-And-Packages-Custom-Card/Home-Assistant-Mail-And-Packages-Custom-Card.js
type: Javascript Module
```

## HACS Install

[HACS](https://hacs.xyz) will install the files and add an entry in the Lovelace resource
* Have [HACS](https://hacs.xyz) installed in your instance of HASS
* Add URL: **https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages-Custom-Card** as a custom repository with Type: **LOVELACE**
* Navigate to the Frontend directory
* Search for Mail and Packages, then choose install
* You may need to empty your browser cache for the frontend to recognize the new files.

HACS install path
```
/path/to/config/www/community/Home-Assistant-Mail-And-Packages-Custom-Card/
```
Path HACS adds to Lovelace resources
```
/hacsfiles/Home-Assistant-Mail-And-Packages-Custom-Card/Home-Assistant-Mail-And-Packages-Custom-Card.js
```

## Card Configuration

Add a manual card then input the yaml below.
```
type: 'custom:mail-and-packages-card'
name: Mail Summary
updated: sensor.mail_updated
details: true
image: true
gif_sensor: sensor.mail_image_url
usps_mail: sensor.mail_usps_mail
usps_packages: sensor.mail_usps_packages
ups_packages: sensor.mail_ups_packages
fedex_packages: sensor.mail_fedex_packages
amazon_packages: sensor.mail_amazon_packages
packages_delivered: sensor.mail_packages_delivered
packages_in_transit: sensor.mail_packages_in_transit
```

Or use the visual editor to complete the setup by assigning the sensors you have enabled in the [Mail and Packages integration](https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages).

#### Required Sensors

* **Mail Updated Sensor**: `sensor.mail_updated` (required) - Timestamp of last update

#### Optional Sensors

Configure these sensors based on what you have enabled in the Mail and Packages integration:

* **USPS Mail Sensor**: `sensor.mail_usps_mail` - Number of mail pieces from USPS Informed Delivery
* **USPS Packages**: `sensor.mail_usps_packages` - Total USPS packages
* **UPS Packages**: `sensor.mail_ups_packages` - Total UPS packages
* **FedEx Packages**: `sensor.mail_fedex_packages` - Total FedEx packages
* **Amazon Packages**: `sensor.mail_amazon_packages` - Total Amazon packages
* **Packages Delivered**: `sensor.mail_packages_delivered` - Total packages delivered today
* **Packages In Transit**: `sensor.mail_packages_in_transit` - Total packages in transit

#### USPS Mail Image Display

The integration creates two sensors for displaying mail images:

* **GIF Sensor**: `sensor.mail_image_url` - Use this sensor in the card's "GIF Sensor" field to display USPS mail images. The integration automatically manages image files with random names for security.

* **Camera Entity**: `camera.mail_usps_camera` - Alternatively, use the camera entity created by the integration. Set this in the card's "Camera Entity" field.

**Note**: The integration now uses random image file names for security. You no longer need to manually configure image paths.

#### Delivery Message Sensor

The delivery message sensor (e.g., `sensor.mail_deliveries`) is not created by the [Mail and Packages Integration](https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages). You must create a [template sensor](https://www.home-assistant.io/integrations/template/) if you want custom delivery messages. This is left out of the integration on purpose so you can customize it as you see fit.

<img src="https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages-Custom-Card/blob/master/img/visual-editor.png?raw=true" alt="Preview of visual-editor" />

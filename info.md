# Home-Assistant-Mail-And-Packages-Custom-Card
A Custom Lovelace card to pull together the mail and packages sensors.

<img src="https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages-Custom-Card/blob/master/img/card-image.png?raw=true" alt="Preview of card" />

## Lovelace GUI Setup

Both JS files need to be stored inside the path/to/config/www/ folder. In the Lovelace resource URL path, local is the same as the www folder. Construct your path to the JS inside the www folder for the resource URL. For the example below:

path/to/config/www/Home-Assistant-Mail-And-Packages-Custom-Card/Home-Assistant-Mail-And-Packages-Custom-Card.js

path/to/config/www/Home-Assistant-Mail-And-Packages-Custom-Card/Home-Assistant-Mail-And-Packages-Custom-Card-editor.js

Configuration > Lovelace Dashboards > Resources

```
url: /local/Home-Assistant-Mail-And-Packages-Custom-Card/mail-and-packages-card.js
type: Javascript Module
```
Add the card configuration to the cards: section of the view you want the card to be in.

Minimal Setup:
The remaining sensors can be added in the card configurator.
```
- type: 'custom:mail-and-packages-card'
  name: Mail Summary
  updated: sensor.mail_updated
  details: true
  image: true
  gif_sensor: sensor.mail_image_url
```

## Sensor Configuration

The card works with sensors from the [Mail and Packages integration](https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages). Configure the following sensors in the card's visual editor:

### Required
* **updated**: `sensor.mail_updated` - Timestamp of last update

### Optional Package Sensors
* **usps_packages**: `sensor.mail_usps_packages`
* **ups_packages**: `sensor.mail_ups_packages`
* **fedex_packages**: `sensor.mail_fedex_packages`
* **amazon_packages**: `sensor.mail_amazon_packages`
* **packages_delivered**: `sensor.mail_packages_delivered`
* **packages_in_transit**: `sensor.mail_packages_in_transit`

### Optional Mail Sensors
* **usps_mail**: `sensor.mail_usps_mail` - USPS mail pieces count
* **gif_sensor**: `sensor.mail_image_url` - URL to USPS mail images (recommended)
* **camera_entity**: `camera.mail_usps_camera` - Alternative to gif_sensor

**Note**: Use `sensor.mail_image_url` for the GIF Sensor field. The integration automatically manages image files with random names for security.

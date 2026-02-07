# Migration Guide: Updating Card Configuration for Integration v1.0.0+

## Problem Statement

After updating the Mail and Packages integration to v1.0.0 or later, the custom card stopped displaying information. This was due to outdated documentation that didn't reflect changes in how the integration handles USPS mail images.

## What Changed in the Integration

### Before (< v1.0.0)
- Mail images saved as `mail_today.gif` with a fixed filename
- Users configured the card with a direct path like `/local/mail_today.gif`
- Image security was optional

### After (>= v1.0.0)
- Mail images use random filenames for security (always enabled)
- Integration provides `sensor.mail_image_url` containing the image URL
- Integration provides `sensor.mail_image_system_path` with the system path
- Integration provides `camera.mail_usps_camera` as an alternative

## How to Fix Your Card Configuration

### Option 1: Use the Image URL Sensor (Recommended)

Update your card configuration to use `sensor.mail_image_url`:

```yaml
type: 'custom:mail-and-packages-card'
name: Mail Summary
updated: sensor.mail_updated
details: true
image: true
gif_sensor: sensor.mail_image_url  # ← Add this line
usps_mail: sensor.mail_usps_mail
# ... other sensors
```

### Option 2: Use the Camera Entity

Alternatively, use the camera entity:

```yaml
type: 'custom:mail-and-packages-card'
name: Mail Summary
updated: sensor.mail_updated
details: true
image: false
camera: true
camera_entity: camera.mail_usps_camera  # ← Add this line
# ... other sensors
```

## Complete Sensor List

All sensors created by the integration v1.0.0+:

### Required
- `sensor.mail_updated` - Last update timestamp

### Package Tracking (Per Carrier)
- `sensor.mail_usps_packages` - USPS total packages
- `sensor.mail_ups_packages` - UPS total packages
- `sensor.mail_fedex_packages` - FedEx total packages
- `sensor.mail_amazon_packages` - Amazon total packages

### Aggregate Sensors
- `sensor.mail_packages_delivered` - Total delivered today (all carriers)
- `sensor.mail_packages_in_transit` - Total in transit (all carriers)

### USPS Mail
- `sensor.mail_usps_mail` - Mail pieces count
- `sensor.mail_image_url` - URL to mail images GIF
- `sensor.mail_image_system_path` - System file path to images
- `camera.mail_usps_camera` - Camera entity for mail images

## Visual Editor Configuration

1. Open your dashboard in edit mode
2. Click on your Mail and Packages card
3. Click "Show Code Editor" then "Show Visual Editor"
4. Configure these fields:
   - **Mail Updated Sensor**: `sensor.mail_updated` (required)
   - **Show Image**: Toggle ON
   - **GIF Sensor**: Select `sensor.mail_image_url`
   - **USPS Mail Sensor**: Select `sensor.mail_usps_mail`
   - Add other sensors as needed
5. Save the card

## Troubleshooting

### Card shows "Entity not available"
- Verify the Mail and Packages integration is installed and configured
- Check that `sensor.mail_updated` exists in Developer Tools > States
- If you see sensors with email suffixes (e.g., `sensor.mail_updated_yourname_gmail_com`), use those instead

### No mail images display
- Ensure **Show Image** is toggled ON in the card settings
- Set **GIF Sensor** to `sensor.mail_image_url`
- Verify you're enrolled in USPS Informed Delivery
- Check that the integration successfully connected to your email

### Card is blank or shows no data
- Verify all configured sensors exist in Developer Tools > States
- Remove sensors you don't have enabled in the integration
- Check the integration configuration has the correct email credentials
- Review Home Assistant logs for integration errors

## Additional Resources

- [Mail and Packages Integration](https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages)
- [Integration Wiki](https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages/wiki)
- [Example Automations](https://github.com/ncecowboy/Home-Assistant-Mail-And-Packages/wiki/Example-Automations-and-Templates)

## Summary

The key change is using `sensor.mail_image_url` instead of a hardcoded path. This sensor is automatically created by the integration and contains the URL to the current mail images. No manual path configuration is needed.

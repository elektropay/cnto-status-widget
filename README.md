## Requirements
 - jQuery (any version)

## Usage
URL to the Cachet API can be changed in `assets/script.js` under `cachet_api_url`.

The widget is updated automatically when the page is fully loaded and ready.

To add as a widget on Enjin, simply create a new HTML module, copy content from `status-widget.html`, `assets/script.js`, `assets/style.css` into, respectively, HTML, JS, CSS module sections on Enjin panel.

### Aliases
Aliases allow to display a component with a different name on the widget than on the Cachet website. To add an alias simply add an object into the `config.alias` array where `cachet_name` is the component's name on Cachet and `widget_name` is the name displayed on the widget. For example:
```javascript
{    cachet_name: "my cachet component name",
     widget_name: "cool widget name" }
```
**NB**: `cachet_name` is case *insensitive*, so can be all lowercase or uppercase, but it *must* match letter by letter (spaces included).

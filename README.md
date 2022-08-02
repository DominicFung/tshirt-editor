# Shopify TShirt Editor ![version]

<p align="center">
<img src="https://github.com/DominicFung/logistical.ly/blob/master/src/img/screen-shot-win.png?raw=true" align="center"
     alt="Screenshot of Logistical.ly" width="830" height="456">
</p>

This article teaches you how to include the custom T-Shirt Editor into your Shopify site.

[version]:       https://img.shields.io/badge/version-1-green

<br /><br />

# Getting Started

<br />

## Create a new template

Go to the admin page. Click edit code and create a new template. You can call it whatever you want, but I used `page.react-test.liquid`

Add the following code snippet:
```
<script defer type="module" src="{{ "bundle.js" | asset_url }}"></script>
<div id="react-shopify-test"></div>
```

<p align="center">
<img src="https://github.com/DominicFung/logistical.ly/blob/master/src/img/screen-shot-win.png?raw=true" align="center"
     alt="Screenshot of Logistical.ly" width="830" height="456">
</p>

<br /><br />

## Uploading the JS bundle

Download all files inside the `dist/` folder. Upload them into the `assets/` folder on the Shopify Admin console.

<p align="center">
<img src="https://github.com/DominicFung/logistical.ly/blob/master/src/img/screen-shot-win.png?raw=true" align="center"
     alt="Screenshot of Logistical.ly" width="830" height="456">
</p>

<br /><br />

## Create a new page using the template

Save and Exit the code editor. Go to "Online Store" -> "Pages", Click on "Add page" button. You can call it whatever you want. For the "Theme template", choose the one we just created aka: "react-test".

<p align="center">
<img src="https://github.com/DominicFung/logistical.ly/blob/master/src/img/screen-shot-win.png?raw=true" align="center"
     alt="Screenshot of Logistical.ly" width="830" height="456">
</p>


```
ref:
https://www.cadence-labs.com/2019/12/how-to-add-react-to-a-shopify-theme/
https://skcript.com/svr/using-webpack-with-react-typescript/
```
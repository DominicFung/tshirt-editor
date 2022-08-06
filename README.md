# Shopify TShirt Editor ![version]

<p align="center">
<img src="https://github.com/DominicFung/tshirt-editor/blob/main/instructions/images/1.demo-shot.png?raw=true" align="center"
     alt="Screenshot of Logistical.ly" width="830" height="456">
</p>

<br />

### Preface

> This article teaches you how to include a **custom image editor**, hooked up directly to your **Print On Demand** of choice to your **Shopify Site**! You will need to compile the package bundle yourself from this source code (with your own personal API Key of course!), but don't worry it will be a breeze.

> You will need to install a couple of dev tools including:
> - **git** *(for pulling this source code, not required - you can also just hit the download button on the left)*
> - **node & npm** *(installing and compiling the source code)*
> - **text editor** *(for adding your own api token)*

Current or intended features:
 - [x] Bundling Demo to Shopify
 - [x] Image Editor Integration (Toast-ui/image-editor)
- [x] Print On Demand API hookup (Printify)
 - [ ] 3D mockup of the shirt (Threejs)


[version]:       https://img.shields.io/badge/version-1-green

<br />

# Getting Started

<br />

## Installing Dev Tools

<br />

## Getting Your Print On Demand API Key
- Getting your [Printful API Key](./instructions/Printful/Printful.md)
- Getting your [Printify API Key](./instructions/Printify/Printify.md)

<br />

## Compiling your JavaScript Bundle

Open a command prompt or shell terminal.
```
cd <Location of this Source Code>
npm install
npm run shop-build
```

## Create a new Template

Go to the admin page. Click edit code and create a new template. You can call it whatever you want, but I used `page.react-test.liquid`

Add the following code snippet:
```
<script defer type="module" src="{{ "bundle.js" | asset_url }}"></script>
<div id="react-shopify-test"></div>
```

<p align="center">
<img src="https://github.com/DominicFung/tshirt-editor/blob/main/instructions/images/2.edit-code.png?raw=true" align="center"
     alt="Screenshot of Logistical.ly" width="830" height="320">
</p>

<br /><br />

## Uploading the JS bundle

Download all files inside the `dist/` folder. Upload them into the `assets/` folder on the Shopify Admin console.

<p align="center">
<img src="https://github.com/DominicFung/tshirt-editor/blob/main/instructions/images/3.upload-js.png?raw=true" align="center"
     alt="Screenshot of Logistical.ly" width="830" height="390">
</p>

<br /><br />

## Create a new page using the Template

Save and Exit the code editor. Go to "Online Store" -> "Pages", Click on "Add page" button. You can call it whatever you want. For the "Theme template", choose the one we just created aka: "react-test".

<p align="center">
<img src="https://github.com/DominicFung/tshirt-editor/blob/main/instructions/images/4.new-page.png?raw=true" align="center"
     alt="Screenshot of Logistical.ly" width="830" height="456">
</p>


```
refs:
  https://www.cadence-labs.com/2019/12/how-to-add-react-to-a-shopify-theme/
  https://skcript.com/svr/using-webpack-with-react-typescript/
```
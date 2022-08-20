# Embeddable Tshirt Editor ![version]

> A **Toast UI Image Editor**[^1] you can embed on your **Shopify** site (or other e-commerce site). It connects to your **Print On Demand** of choice!

<br />

<p align="center">
<img src="https://github.com/DominicFung/tshirt-editor/blob/main/instructions/images/1.demo-shot.png?raw=true" align="center"
     alt="Screenshot of Logistical.ly" width="830" height="456">
</p>

<br />

## Preface

***To those who want an e-commerce edge ..*** 

Whether it's to give your customers more design autonomy as you consult or allow your customers to tweak your proprietary designs, this editor is designed to give your customers convenience of designing right from your storefront. 

***More about me and the state of this project:***

Feel free to request new features [here](https://github.com/DominicFung/tshirt-editor/issues/new) and label it as an "*enhancement*"! For now, to make this work, you need to compile both the app (into a Javascript bundle) AND spin up your own cloud infrastructure (all code and instructions below). This is not for the faint of heart but feel free to reach out to me for any clarification.

<br />

> You will need to install a couple of dev tools including:
> - **git** *(for pulling this source code, not required - you can also just hit the download button on the left)*
> - **node & npm** *(installing and compiling the source code)*
> - **text editor** *(for adding your own api token)*
> - **AWS** account (Azure is coming soon)

Current or intended features:
 - [x] Bundling to Shopify
 - [x] Image Editor Integration (Toast-ui/image-editor)
 - [x] Print On Demand API hookup (Printify / Printful / etc.)
 - [x] Cloud Infrastructure
 - - [x] AWS
 - - [ ] Azure
 - [ ] 3D mockup of the shirt (Threejs)


[version]:       https://img.shields.io/badge/version-1.1-green

<br />

# Getting Started

## Installing Dev Tools & Getting the Latest TShirt Editor Source Code

The only installation you really need is [NodeJS](https://nodejs.org/en/download/). Let's get that now. Please install the LTS (Long Term Support) version on your platform of choice (Windows / MacOS).

For more detailed instructions:
 - [MacOS](https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/)
 - [Windows]()

### Getting the Source Code



<br />

## Getting Your Print On Demand API Key
- Getting your [Printful API Key](./instructions/Printful/Printful.md)
- Getting your [Printify API Key](./instructions/Printify/Printify.md)

<br />

## Spinning up your Cloud Infrastructure

Since Printful / Printify are CORS protected backend APIs - we need our own cloud infrastructure. Most platforms also don't have an internal storage (relying on an image storage you provide). To keep cost low, our IaC uses serverless solutions when possible.

- Spinning up [AWS Infrastructure](./backend/aws/README.md)
- Spinning up [Azure Infrastructure](./backend/azure/README.md)

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

[^1]: https://ui.toast.com/tui-image-editor
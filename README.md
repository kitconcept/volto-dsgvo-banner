# Volto DSGVO Banner

[![NPM](https://img.shields.io/npm/v/@kitconcept/volto-dsgvo-banner.svg)](https://www.npmjs.com/package/@kitconcept/volto-dsgvo-banner)
[![Build Status](https://github.com/kitconcept/volto-dsgvo-banner/actions/workflows/code.yml/badge.svg)](https://github.com/kitconcept/volto-dsgvo-banner/actions)
[![Build Status](https://github.com/kitconcept/volto-dsgvo-banner/actions/workflows/unit.yml/badge.svg)](https://github.com/kitconcept/volto-dsgvo-banner/actions)
[![Build Status](https://github.com/kitconcept/volto-dsgvo-banner/actions/workflows/acceptance.yml/badge.svg)](https://github.com/kitconcept/volto-dsgvo-banner/actions)

![kitconcept GmbH](https://github.com/kitconcept/volto-blocks/raw/master/kitconcept.png)

The Volto DSGVO Banner addon gives the user the possibility to accept certain cookies.

## Screenshots

When you visit the website for the first time you will get the following overlay:

![Accept](https://github.com/kitconcept/volto-dsgvo-banner/raw/master/accept.png)

If you select "Adjust Privacy Settings" you can select which cookies you want to accept:

![Settings](https://github.com/kitconcept/volto-dsgvo-banner/raw/master/settings.png)

If you view a piece of content where you haven't accepted the cookie for you will be notified and have the option to change the cookies.

![Message](https://github.com/kitconcept/volto-dsgvo-banner/raw/master/message.png)

There is also a block which you can insert on your data protection page to adjust the settings there.

![Block](https://github.com/kitconcept/volto-dsgvo-banner/raw/master/block.png)

## Installation

Create a new Volto project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon @kitconcept/volto-dsgvo-banner
cd my-volto-project
```

Add `@kitconcept/volto-dsgvo-banner`to your package.json:

```
"addons": [
    "@kitconcept/volto-dsgvo-banner"
],

"dependencies": {
    "@kitconcept/volto-dsgvo-banner": "*"
}
```

Download and install the new add-on by running:

```
yarn install
```

Start Volto with:

```
yarn start
```

Go to http://localhost:3000, and the cookie confirmation screen will popup.

## Compatibility

From `2.0.0` version on, it supports Google Analytics 4 and deprecates version 3. If you are still using GA3, you should use a version of this package of the 1.x.x series.

|Version   |GA version    |
|----------|--------------|
|>=2.0.0   |GA4           |
|<2.0.0    |GA3           |

## Customization

You can customize your Google Analytics tracking id, the url where your privacy page is located and the modules you want to enable.

```
config.settings.DSGVOBanner = {
  ...(config.settings.DSGVOBanner || {}),
  trackingId: 'UA-123456789-1',
  modules: ['tracking', 'youtube', 'facebook'],
  privacy_url: '/privacy',
};
```

If you want to use Matomo instead of Google Analytics:

```
config.settings.DSGVOBanner = {
  ...(config.settings.DSGVOBanner || {}),
  tracker: {
    type: 'matomo',
    id: 3,
    urlBase: "https://matomo.example.com/"
  },
  modules: ['tracking', 'youtube', 'facebook'],
  privacy_url: '/privacy',
};
```
You can customize the Style of the Modal Buttons
```
config.settings.DSGVOBanner = {
  bannerAgreeButtonColor: "branded olive",
  bannerAdjustButtonColor: "branded blue",
  ...(config.settings.DSGVOBanner || {}),
}
```
Or something like  
```
config.settings.DSGVOBanner = {
  bannerAgreeButtonColor: "red",
  bannerAdjustButtonColor: "pink",
  ...(config.settings.DSGVOBanner || {}),
}
```
Keep in mind though, that the 'Adjust privacy Setting' Button will always stay inverted

You can also configure the Banner to not show the first time a User connects to your Site, and only use the Cookie Block and the Disclaimer of the respective Blocks
```
config.settings.DSGVOBanner = {
  useBanner: false,
  ...(config.settings.DSGVOBanner || {}),
}
```
You can also hide the greyed-out 'Technically required' Slider
```
config.settings.DSGVOBanner = {
  showTechRequired: false,
  ...(config.settings.DSGVOBanner || {}),
}
```

# Supported Modules
- 'tracking'
- 'youtube'
- 'facebook'
- 'google'
- 'twitter'
- 'vimeo'

# License

The project is licensed under the MIT license.

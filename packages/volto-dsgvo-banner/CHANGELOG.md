# kitconcept's volto-dsgvo-banner Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

## 3.0.0 (2025-08-26)

### Breaking

- Add reject button @rboixaderg [#46](https://github.com/kitconcept/volto-dsgvo-banner/issue/46)

### Feature

- Update Dutch/Flemish translations. @fredvd [#48](https://github.com/kitconcept/volto-dsgvo-banner/issue/48)
- Update Brazilian Portuguese translations. @ericof 

## 2.5.2 (2025-08-18)

### Bugfix

- Fixed settings. @Tishasoumya-02
  * Change default of `showBanner` back to `true`. It was changed in version 2.5.0 but should not have been, because it was a breaking change.
  * Remove `showOverlay` setting. It was added in 2.5.0 but didn't do anything. [#44](https://github.com/kitconcept/volto-dsgvo-banner/issue/44)
- Fixed possible error during hydration by not rendering the DSGVO banner on the server. @Tishasoumya-02 
- If `showBanner` is false, the button in the `IfConfirm` component now accepts the cookie immediately instead of opening the banner. @Tishasoumya-02 
- Updated the message shown in the `IfConfirm` component so that it makes sense even if the user hasn't seen the banner yet. @Tishasoumya-02 

## 2.5.1 (2025-07-23)

## 2.5.0 (2025-07-15)

### Feature

- Display overlay when the add-on conditions are not met. @Tishasoumya-02 [#43](https://github.com/kitconcept/volto-dsgvo-banner/issue/43)

### Internal

- New setup. @Tishasoumya-02 [#42](https://github.com/kitconcept/volto-dsgvo-banner/issue/42)

## 2.4.0 (2025-06-04)

### Feature

- - Add Catalan translations @rboixaderg [#41](https://github.com/kitconcept/volto-dsgvo-block/pull/41)

## 2.3.2 (2024-01-12)

### Bugfix

- Fix default export in `index.js` @sneridagh [#29](https://github.com/kitconcept/volto-dsgvo-block/pull/29)

## 2.3.1 (2024-01-11)

### Bugfix

- Update the video block customization to latest volto. @iFlameing [#26](https://github.com/kitconcept/volto-dsgvo-block/pull/26)

## 2.3.0 (2023-12-28)

### Feature

- Added Differentiation between Youtube and Vimeo Videos in the Video-View, and added Twitter Module and Cookie Option if someone uses volto-social-blocks with this Addon @Molochem [#23](https://github.com/kitconcept/volto-dsgvo-block/pull/23)
- Added : Interchangeable Button Colors, The Option to Hide the Banner on First Connect and the Option to hide the "Technically Required" Checkbox @Molochem [#24](https://github.com/kitconcept/volto-dsgvo-block/pull/24)

## 2.2.0 (2023-07-26)

### Feature

- Add Spanish translations @macagua [#17](https://github.com/kitconcept/volto-dsgvo-block/pull/17)
- Updated docker env @sneridagh [#20](https://github.com/kitconcept/volto-dsgvo-block/pull/20)

### Bugfix

- Change ifconfirm component for compatibility with volto-light-theme @iFlameing [#19](https://github.com/kitconcept/volto-dsgvo-block/pull/19)


## 2.1.0 (2023-04-03)

### Feature

- Make IfConfirm component available in registry @danlavrz [#14](https://github.com/kitconcept/volto-export/pull/14)


## 2.0.0 (2023-03-16)

### Breaking

- Upgrade react-ga4 in order to also support Google Analytics GA4 @avoinea [#9](https://github.com/kitconcept/volto-export/pull/9)


## 1.3.0 (2023-02-13)

### Feature

- Adopt the new way of developing using docker @sneridagh [#13](https://github.com/kitconcept/volto-export/pull/13)

### Bugfix

- Avoid error in cookie consent buttons with undefined module @reebalazs [#12](https://github.com/kitconcept/volto-export/pull/12)


## 1.2.1 (2022-11-04)

### Internal

- Update @plone/scripts @davisagli

## 1.2.0 (2022-10-24)

### Feature

- Romanian translations @avoinea
- Added Google support @steffenri

## 1.1.2 (2022-09-20)

### Bugfix

- Fix cookiebanner on small devices (make it fullscreen) @steffenri

## 1.1.1 (2022-09-19)

### Bugfix

- Fix mobile modal @robgietema

## 1.1.0 (2022-09-16)

### Feature

- Always set focus on Banner, improve scroll behavior for mobile @steffenri

## 1.0.0 (2022-09-02)

### Feature

- Initial release @kindermann @robgietema
- Added Matomo support @robgietema
- Add multi-lingual privacy policy links @robgietema

### Bugfix

- Fixed privacy policy text @robgietema

### Internal

- Added github workflows @robgietema

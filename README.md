# <img src='./md/near-social-local-viewer-logo.png' height='24' alt='NEAR Social Bridge Logo' /> NEAR Social Local Viewer

[![Build Status](https://img.shields.io/github/actions/workflow/status/wpdas/near-social-local-viewer/publish.yml?style=for-the-badge&colorB=000000)](https://github.com/wpdas/near-social-local-viewer/actions?query=workflow%3Apublish)
[![Version](https://img.shields.io/npm/v/near-social-local-viewer?style=for-the-badge&colorB=000000)](https://www.npmjs.com/package/near-social-local-viewer)
[![Downloads](https://img.shields.io/npm/dt/near-social-local-viewer.svg?style=for-the-badge&colorB=000000)](https://www.npmjs.com/package/near-social-local-viewer)

A CLI tool that allows you to run and test your Near Social Widgets locally using just your preferred code editor and your default browser.

Tool intended only for Widgets that will run within [Near Social](https://alpha.near.org/)

Check out a demo app built using this tool [here](https://github.com/wpdas/chatv2-near-widget-app).

**Install it using npm or yarn:**

```
# npm
npm install near-social-local-viewer --save-dev

# yarn
yarn add near-social-local-viewer -D
```

## Starting the Viewer

You can start by running the following command:

```
npx init-viewer path/to/widgets/
```

The Viewer is going to open automatically and watch all the widgets inside `path/to/widgets/` folder.

## Changing the Viewer PORT

You can change the viewer port:

```
VIEWER_PORT=3005 npx init-viewer path/to/widgets/
```

## Widgets example

Below is an example of 2 widgets with interactions:

**UserNameAccountView**

```jsx
const userName = props.name;
const userAccoundId = props.accountId;

return (
  <div>
    <span>{userName}</span> <span>(@{userAccoundId})</span>
  </div>
);
```

**ProfileView**

```jsx
const IPFS_NEAR_SOCIAL_THUMBNAIL_URL =
  "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/";

const accountId = context.accountId || "wendersonpires.near";
const profile = socialGetr(`${accountId}/profile`);
const profileImage = `${IPFS_NEAR_SOCIAL_THUMBNAIL_URL}${profile.image.ipfs_cid}`;

return (
  <div>
    <img src={profileImage} alt="profile avatar" />
    {/* Use another local or remote widget */}
    <Widget
      src={"wendersonpires.near/widget/NSLVWidget"}
      props={{
        src: "wendersonpires.near/widget/UserNameAccountView",
        props: { name: "Wendz", accountId },
      }}
    />
  </div>
);
```

<p align="center">
  <img src="md/demo.gif" />
</p>

## Good to know

This project was inspired by [NearSocial Viewer](https://github.com/NearSocial/viewer)

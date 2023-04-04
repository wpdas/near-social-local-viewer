# NEAR Social Local Viewer

A CLI tool that allows you to run your Widgets locally.

## Setup & Development

Initialize repo:

```
yarn add near-social-local-viewer
```

Start development version:

```
npx ns-view path/to/MyWidget.jsx

#or just

ns-view path/to/MyWidget.jsx
```

## Widget example

Profile view

```jsx
let accountId = props.accountId || "eugenethedream";
let profile = socialGetr(`${accountId}/profile`);

<div>
  <img src={profile.image.url} />
  <span>{profile.name}</span> <span>(@{accountId})</span>
</div>;
```

# Pantry

A small next.js web-app that tracks what we currently have in our pantry. Each pantry item can either have a `count` or a `range` to indicate how much we have left before we need to replenish again.

The most interesting part is the raspberry pi touch screen setup that is next to the pantry that is running the app. Helps with keeping it up-to-date when using items in the pantry! :)

- Icons from [Icons8](https://icons8.com/icon/pack/food/cotton)
- [Color scheme](https://mycolor.space/?hex=%23845EC2&sub=1)

# Tech and hardware

- [firebase]()
- [nextjs]()
- [zeit now]()
- [raspberry pi 4b]()
- [raspberry pi touchscreen]()
- [raspberry pi chromium in kiosk mode]()

# From scratch local setup

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. `nvm install && nvm use` while in the root of this project
3. Install [yarn](https://classic.yarnpkg.com/en/docs/install#alternatives-stable)
4. `yarn install`
5. Install the `now` cli via `yarn global add now`
6. `now env pull` to get development environment (it's prod secrets, we're not that fancy)
7. `now dev` to start the local development environment

# RaspberryPi from scratch setup (headless)

1. create `wpa_supplicant` file with ssid / wifi-network information
2. `touch ssh` in the `boot` directory to enable the ssh daemon on boot
3. turn it on by plugging it in
4. `ssh pi@raspberrypi.local`, default password is `raspberry`
5. run the app via `chromium-browser --kiosk https://pantry.alorg.net`

# To set up your own one of these

1. decide if you want a raspberry pi setup or not
2. fork the repo
3. set up your own [zeit.co](https://zeit.co) account for deployments
4. start a new [firebase project]()
5. add the firebase configuration to your [zeit.co]() project's environment page for all environments (production, preview, development).
6. Link your [zeit.co]() account with the Google Cloud Integration
7. Upload a service account json key to your [zeit.co] google cloud integration
8. enable firebase admin service account, so your production/preview environments get the `GCLOUD_CREDENTIALS` environment variable
9. `echo $(cat ./path/to/sa/json/key) | base64` run that on your ServiceAccount json key to base64 encode it. Add the output to our `.env` file as the environment var `GCLOUD_CREDENTIALS` (to replicate production)
10. Add this base64 encoded variable to your [zeit.co]() project's environment page under development.
11. To enable continuous deployment, connect your [zeit.co]() account with your github and give it access to the fork.
12. Joy

# License

MIT

---

# Example app with styled-components

This example features how you use a different styling solution than [styled-jsx](https://github.com/zeit/styled-jsx) that also supports universal styles. That means we can serve the required styles for the first render within the HTML and then load the rest in the client. In this case we are using [styled-components](https://github.com/styled-components/styled-components).

For this purpose we are extending the `<Document />` and injecting the server side rendered styles into the `<head>`, and also adding the `babel-plugin-styled-components` (which is required for server side rendering). Additionally we set up a global [theme](https://www.styled-components.com/docs/advanced#theming) for styled-components using NextJS custom [`<App>`](https://nextjs.org/docs#custom-app) component.

## Deploy your own

Deploy the example using [ZEIT Now](https://zeit.co/now):

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/import/project?template=https://github.com/zeit/next.js/tree/canary/examples/with-styled-components)

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npm init next-app --example with-styled-components with-styled-components-app
# or
yarn create next-app --example with-styled-components with-styled-components-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-styled-components
cd with-styled-components
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [ZEIT Now](https://zeit.co/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

### Try it on CodeSandbox

[Open this example on CodeSandbox](https://codesandbox.io/s/github/zeit/next.js/tree/canary/examples/with-styled-components)

### Notes

When wrapping a [Link](https://nextjs.org/docs/api-reference/next/link) from `next/link` within a styled-component, the [as](https://styled-components.com/docs/api#as-polymorphic-prop) prop provided by `styled` will collide with the Link's `as` prop and cause styled-components to throw an `Invalid tag` error. To avoid this, you can either use the recommended [forwardedAs](https://styled-components.com/docs/api#forwardedas-prop) prop from styled-components or use a different named prop to pass to a `styled` Link.

<details>
<summary>Click to expand workaround example</summary>
<br />

**components/StyledLink.js**

```javascript
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = ({ as, children, className, href }) => (
  <Link href={href} as={as} passHref>
    <a className={className}>{children}</a>
  </Link>
);

export default styled(StyledLink)`
  color: #0075e0;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #40a9ff;
  }

  &:focus {
    color: #40a9ff;
    outline: none;
    border: 0;
  }
`;
```

**pages/index.js**

```javascript
import React from 'react';
import StyledLink from '../components/StyledLink';

export default () => (
  <StyledLink href="/post/[pid]" forwardedAs="/post/abc">
    First post
  </StyledLink>
);
```

</details>

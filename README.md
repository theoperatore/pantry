# Pantry

A small next.js web-app that tracks what we currently have in our pantry. Each pantry item can either have a `count` or a `range` to indicate how much we have left before we need to replenish again.

The most interesting part is the raspberry pi touch screen setup that is next to the pantry that is running the app. Helps with keeping it up-to-date when using items in the pantry! :)

- Icons from [Icons8](https://icons8.com/icons/cotton) and [Tabler Icons React](https://tabler.io/icons)
- [Color scheme](https://mycolor.space/?hex=%23845EC2&sub=1)

# Tech and hardware

- [postgres]()
- [nextjs](https://nextjs.org/)
- [mantine.dev](https://mantine.dev/)
- [Vercel]()
- [raspberry pi 4b]()
- [raspberry pi touchscreen]()
- [raspberry pi chromium in kiosk mode]()

# From scratch local setup

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. `nvm install && nvm use` while in the root of this project
3. Install deps using `npm install`

# RaspberryPi from scratch setup (headless)

1. create `wpa_supplicant` file with ssid / wifi-network information
2. `touch ssh` in the `boot` directory to enable the ssh daemon on boot
3. turn it on by plugging it in
4. `ssh pi@raspberrypi.local`, default password is `raspberry`
5. run the app via `chromium-browser --kiosk https://pantry.alorg.net`

# To set up your own one of these

1. decide if you want a raspberry pi setup or not
2. fork the repo
3. set up your own [Vercel]() account for deployments
4. get a new [postgres]() database from somewhere (like [Supabase]() or [Digital Ocean]())
5. add the database configuration to your [Vercel]() project's environment page for all environments (production, preview, development).
6. Link your [Vercel]() and [Github]() account with the database provider
7. Joy

# License

MIT

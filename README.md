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

# Working with Supabase

## Migrations

Supabase has a nice migration workflow to handle schema evolution. Generally, when you when you want to update the database schema you do so in a new migration **locally** where it's safe to thrash the database as you prototype the changes you want.

```bash
# create a new migration file
npm exec supabase migrations new <name your thing>
```

Once you have a migration file you can run it against the local database via:

```bash
# ensure the db is started
npm run db:start

# if you want to keep your current history and only apply the changes run
npm exec supabase migrations up

# alternatively you can destroy your
# current db and re-apply the new changes.
# this also reseeds the database
npm exec supabase db reset

# run after database changes to regenerate the kysely typescript types
# from the new schema updates
npm run db:types
```

Now play around with the new schema!

Once everything is good you can apply the changes to production by running:

```bash
# push any finalized non-applied mirations to production
npm exec supabase db push
```

### Rolling back a migration

It's all manual for right now. So to remove a migration you're gonna need to manually run the sql that reverts the migration aapplied. Once you do that you can also delete the row in the migrations schema that marks that migration as applied.

sorry future self! :(

## Upgrading the cli

Supabase cli wants to be run on a clean local database, so the docs say to stop and destroy the containers. Before you do that you can dump the data in the databasae into the seed.sql file so that you can restore from where you were:

```bash
npm exec supabase db diff my_schema
npm exec supabase db dump --local --data-only > supabase/seed.sql
```

then when you stop the db you can safely drop the backup volumn and restart the server:

```bash
npm exec supabase stop --no-backup
npm exec supabase start
```

running start should download the new docker images, apply any migrations on the fresh volumnes, and reseed from the sql file.

# License

MIT

# Now Playing for Spotify
It displays what is currently playing in a browser window!

# FAQ

## Why?
* I like to play music on my Sonos speakers via Spotify.
* I have two TVs in prominent areas of the house that I would love to display what is currently playing on
  the Sonos speakers. If I cast Spotify to the TV, then the music comes out of the TV, and not all the
  Sonos speakers I have around the house.
* This lets me run this on my local server and then cast it to the TVs so that they show what's currently
  playing without having to mess with the Spotify app on them!

# How do I run it?

I built this using Vite and ReactJS. You'll need to have npm installed on your machine.

You'll also need to have a Spotify Developer account:

* https://developer.spotify.com/dashboard

From there you'll need to register an application and get a Client ID. You don't need a secret key
because this is just a single-page-app and does an Authorization Code Flow with PKCE for the rest.

Once you have that Client ID put it into a `.env` file in the root of the repo:

```
VITE_SPOTIFY_CLIENT_ID = "aaabbbcccdddeeefff00011122233344"
```

Once done, you can just install and run:

```bash
npm install
npm run dev
```

## What's it look like?
![Alt text](/public/nowplaying.png?raw=true "Never Gonna Give You Up")

## It doesn't work - can you help me?
I'll be happy to talk but in general I'm just developing this locally, so not really.

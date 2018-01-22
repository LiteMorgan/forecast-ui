## Weather UI

Technical test integrating the [OpenWeatherMap API](http://openweathermap.org/api) with a custom UI.

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Getting started](#getting-started)
- [Changing location](#changing-location)
- [Creating ForecastUI](#creating-forecastui)
  - [Early choices](#early-choices)
  - [Designing](#designing)
  - [Building](#building)
- [Issues](#issues)
- [What would I change?](#what-would-i-change)

## Getting started

```
git clone git@github.com:getignited/forecast-ui.git
cd forecast-ui
npm install
npm start
```

You can then open [http://localhost:3000/](http://localhost:3000/) to view the site.

Tip: If available, [Yarn](https://yarnpkg.com/lang/en/) can be used instead!

## Changing location

To set a new location, edit the `location.city`, `location.country_code`, and `location.country_name` states in `App.js`. Country code should follow [ISO-3166 naming conventions](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).

## Creating ForecastUI

My early planning for the project started by setting up a React app and getting the OpenWeatherMap API working. This would allow me to view what data I had available, and inform my design choices.

I chose React due its ability to set States - making it easier to pass along data to the relevant sections where needed. This would also allow for dynamic changes, where necessary, such as the shift from day to night mode.

Redux would have been ideal to use with the project, due to its nature of keeping State's separate and accessible for all elements, versus having to pass State's from parent to child as I have done in my execution. Redux wasn't used simply due to lack of knowledge in that language.

### Early choices

OpenWeatherMap's guidelines requested not sending multiple requests - more than once per 10 minutes - and so I implemented a timer function to save locally the time the last API request was made, and the data received. After 10 minutes passed, more data could be pulled, and updated locally. This would provide me with the necessary data to build with later on.

Another feature I experimented with early on was providing the city name, via IP lookup, to each request. This would allow for the user to receive relevant, local information. However, upon testing this, I found the free IP service unreliable - working fine from home, but falling apart when travelling, and when in a more remote location. I decided to push this feature back, and use a fixed point to work with.

### Designing

> Design assets can be viewed on [Sketch Cloud](https://sketch.cloud/s/oYy7j)

First stages of design involved pen and paper. Simple wireframe mock-ups were drawn to explore some potential ideas.

I took these designs into *Sketch* and began to further explore ideas. The initial design stuck quite closely to my pen and paper sketches, and I deemed it too simplistic, and not engaging enough for an audience.

![Early designs](https://i.imgur.com/lcZQp1K.png)

The next few iterations explored a layout I liked, making use of large icons and a colour theme related to the weather. This idea was then taken further through bringing the icon to life with vector art - a clear day represented by a bright sun, an overcast day represented by multiple clouds blowing across the screen and so on. The design changed shape slightly, moving away from a more playful approach with curved lines to a clear, almost widget-like appearance.

![Design iterations](https://i.imgur.com/gQTkayQ.png)

It was in this final exploration that the idea really came to life. The current weather would be presented on a backdrop of vector art, whilst clean blocks contained representations of the next 24 hours. This was followed by an accordion-like set of drawers for the next five days, containing smaller samplings of data from that day.

![Final designs](https://i.imgur.com/XZg6gzF.png)

I created a variety of icons to go along with this design. I also made three vector art backgrounds - Clear Day, Clear Night and a Snowy representation (due to the local weather at the time!). I would have liked to create more of these, but I decided to prioritise building the site from this point.

### Building

With data already pulling into the local website, I was able to start building straight away. I broke the design into components, and built these out in turn. Data was sent through and utilised as props - keeping the majority of the components Stateless, to avoid having to continually overwrite data upon changes.

Local storage was used to store forecast data, so that I could work around the ten minute limit of the OWM API. This also allowed me to store user settings - such as the chosen Measurement Unit type.

## Issues

I encountered some issues with the OpenWeatherMap API. Rain and Snow levels were always at 0, seemingly due to an error with Weather Stations or being a free user (others have encountered this issue [as reported here](https://openweathermap.desk.com/customer/portal/questions/16790933-rain-parameter-not-showing-up-?t=535697)). Despite a lot of rain, and a whole day of snow, outside, these levels never changed. Within the working site, the Rain Level is kept on display as theoretically it would prove useful. Snow Levels are hidden, due to it being a rarer weather occurance, but would show up if the Snow Level response changed.

As previously mentioned, I had attempted to get a location-based service working with the site. However, due to the Free IP solution I was using, data received was irrelevant.

I considered using Geolocation, however I found the co-ordinates were too inconsistent and would therefore constantly request new data from the OpenWeatherMap API. This was due to an early way I had locked my API requests - to either make a fresh call after ten minutes, or update when the location changed. I deemed this unsuitable for my uses, and instead went with a fixed location.

I had also attempted to implement a live refresh button within the site, that would display when it was safe to refresh the data (along with how long had passed since last updating). Unfortunately, poor implementation of the setInterval function ended up crashing most of my test devices, and I decided to scrap it and focus on the UI instead.

## What would I change?

As well as getting more weather states represented in the top vector art, I would have liked to get the location services working. Supplying data for the users current location, and for other potential locations they might be working/visiting in the day would be a far more beneficial UI experience.

Allowing the user to refresh the data from within the site, or automatically doing so every 10 minutes, would have been preferred to a manual refresh.

Finally, more options within the settings, such as a 24/12 hour display toggle, a day/night mode adjustment that wasn't tied directly into the weather, and the option to set a default starting location when loading the site.

An error state would also have been beneficial, for when data becomes unavailable (and subsequently, fallback data has to be used).

From a design/development perspective, I think it would have benefitted me greatly to make use of existing icon sets, as opposed to designing my own. I chose to do this however to give the site its own unique personality - plus I was able to customise some of the colour attributes for weather icons.

I would also make use of a CSS framework like Bootstrap, to save on the construction of many components, and repetitive CSS throughout the app. Utility flexbox classes would also have been greatly beneficial.



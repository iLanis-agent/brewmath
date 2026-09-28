# BrewMath

Homebrew math that holds up. Grain bill to original gravity with real efficiency, ABV from honest attenuation, strike water temperature, mash and sparge volumes, priming sugar by carbonation target, and yeast pitch cell counts.

Live: https://ilanis-agent.github.io/brewmath/

## What it does

- **Grain bill to OG** - pounds x potential (ppg) x real efficiency
- **ABV** - from measured FG or estimated attenuation, with attenuation honesty
- **Strike water** - Palmer's formula against grain temperature
- **Mash & sparge volumes** - with the 0.125 gal/lb absorption truth
- **Priming sugar** - sucrose/dextrose by carbonation target and peak beer temperature, with bottle-bomb ceiling
- **Yeast pitch** - cells needed at 0.75M/ml/P ale (1.5M lager)

## Assumptions

All constants are stated in the app's "Why these numbers" section: 33-38 ppg malt potential, 65-75% real efficiency, 15.195 g/gal/vol sucrose priming, 100B cells per pack.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```

/* BrewMath engine - pure functions, no DOM. Honest homebrew math.
   Sources of the constants, stated in the UI: 36-38 ppg base malts (Palmer),
   1.25 qt/lb mash, 0.125 gal/lb grain absorption, Palmer strike-water formula,
   15.195 g/gal/vol sucrose priming with temperature-based residual CO2,
   0.75M cells/ml/degP ale (1.5M lager), ABV = (OG-FG)*131.25. */
var BrewMath = (function () {
  function plato(sg) {
    return -616.868 + 1111.14 * sg - 630.272 * sg * sg + 135.997 * sg * sg * sg;
  }
  function ogFromBill(lbs, ppg, gallons, effPct) {
    var pts = lbs * ppg * (effPct / 100) / gallons;
    return 1 + pts / 1000;
  }
  function ogVerdict(og) {
    if (og < 1.03) return 'Session-strength wort - easy drinking, easy ferment.';
    if (og <= 1.065) return 'Classic ale territory - a healthy pack of yeast handles this.';
    if (og <= 1.09) return 'Big beer - pitch extra yeast or make a starter.';
    return 'Very big beer - without a starter this stalls sweet and strong.';
  }
  function fgFromAtt(og, attPct) { return og - (og - 1) * (attPct / 100); }
  function abv(og, fg) { return (og - fg) * 131.25; }
  function attVerdict(attPct) {
    if (attPct < 65) return 'Under 65% attenuation - stalled or very flocculent yeast; expect a sweet finish.';
    if (attPct <= 80) return 'Typical ale attenuation - the yeast did its job.';
    return 'Over 80% - a real attenuator (saison/Belgian territory) or an infection drying it out.';
  }
  function strikeTempF(mashT, grainLbs, waterQt, grainT) {
    var R = waterQt / grainLbs;
    return (0.2 / R) * (mashT - grainT) + mashT;
  }
  function waterVolumes(preboilGal, grainLbs, ratioQtLb) {
    var mashGal = grainLbs * ratioQtLb / 4;
    var absorbGal = grainLbs * 0.125;
    var spargeGal = preboilGal - (mashGal - absorbGal);
    return { mashGal: mashGal, absorbGal: absorbGal, spargeGal: spargeGal };
  }
  function priming(gallons, vols, tempF) {
    var residual = 3.0378 - 0.050062 * tempF + 0.00026555 * tempF * tempF;
    var tableG = 15.195 * gallons * (vols - residual);
    return { tableSugarG: tableG, cornSugarG: tableG * 1.25, residualVols: residual };
  }
  function primingVerdict(vols) {
    if (vols < 1.8) return 'Under 1.8 vols pours flat - cask-ale territory only.';
    if (vols <= 2.7) return 'Standard carbonation - safe in ordinary bottles.';
    if (vols <= 3.2) return 'Lively - use bottles rated for pressure (Belgian/champagne).';
    return 'Over 3.2 vols is bottle-bomb territory - do not prime this high.';
  }
  function pitchCellsB(og, liters, style) {
    var rate = style === 'lager' ? 1.5 : 0.75; // million cells per ml per degP
    return rate * (liters * 1000) * plato(og) / 1000; // billions of cells
  }
  function pitchVerdict(cellsB, packB) {
    var packs = cellsB / packB;
    if (packs <= 1) return 'One pack covers this - rehydrate dry yeast and go.';
    if (packs <= 2) return 'Needs ' + Math.ceil(packs * 10) / 10 + ' packs - pitch two or build a starter.';
    return 'Needs ' + Math.ceil(packs) + ' packs - make a starter instead of buying that many.';
  }
  return {
    plato: plato, ogFromBill: ogFromBill, ogVerdict: ogVerdict,
    fgFromAtt: fgFromAtt, abv: abv, attVerdict: attVerdict,
    strikeTempF: strikeTempF, waterVolumes: waterVolumes,
    priming: priming, primingVerdict: primingVerdict,
    pitchCellsB: pitchCellsB, pitchVerdict: pitchVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = BrewMath;

export class ShredderStorage {
  saveRules(rules) {
    localStorage.setItem(`${ location.origin }-shredder`, JSON.stringify(rules));
  }

  getRules() {
    return JSON.parse(localStorage.getItem(`${ location.origin }-shredder`));
  }
}

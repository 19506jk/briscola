export default class PlayerModel {
  constructor(name, isLead) {
    console.log(name);
    this.name = name;
    this.hand = [];
    this.points = 0;
    this.lead = isLead;
  }
};

export default class PlayerModel {
  constructor(name, isLead) {
    this.name = name;
    this.hand = [];
    this.points = 0;
    this.lead = isLead;
  }
};

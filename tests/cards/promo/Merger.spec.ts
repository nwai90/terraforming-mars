import {expect} from 'chai';
import {ICard} from '../../../src/cards/ICard';
import {Merger} from '../../../src/cards/promo/Merger';
import {Game} from '../../../src/Game';
import {SelectCard} from '../../../src/inputs/SelectCard';
import {Player} from '../../../src/Player';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';
import {ArcadianCommunities} from '../../../src/cards/promo/ArcadianCommunities';
import {SaturnSystems} from '../../../src/cards/corporation/SaturnSystems';
import {TerralabsResearch} from '../../../src/cards/turmoil/TerralabsResearch';
import {Splice} from '../../../src/cards/promo/Splice';
import {VestaShipyard} from '../../../src/cards/base/VestaShipyard';
import {Resources} from '../../../src/Resources';
import {Ants} from '../../../src/cards/base/Ants';
import {Polyphemos} from '../../../src/cards/colonies/Polyphemos';
import {CARD_COST} from '../../../src/constants';
import {TharsisRepublic} from '../../../src/cards/corporation/TharsisRepublic';
import {CardName} from '../../../src/CardName';
import {PointLuna} from '../../../src/cards/prelude/PointLuna';
import {Teractor} from '../../../src/cards/corporation/Teractor';
import {RobinsonIndustries} from '../../../src/cards/prelude/RobinsonIndustries';
import {Helion} from '../../../src/cards/corporation/Helion';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {SelectHowToPay} from '../../../src/inputs/SelectHowToPay';
import {UnitedNationsMarsInitiative} from '../../../src/cards/corporation/UnitedNationsMarsInitiative';
import {Factorum} from '../../../src/cards/promo/Factorum';
import {SelectOption} from '../../../src/inputs/SelectOption';
import {ProjectWorkshop} from '../../../src/cards/community/corporations/ProjectWorkshop';
import {CardType} from '../../../src/cards/CardType';
import {StormCraftIncorporated} from '../../../src/cards/colonies/StormCraftIncorporated';
import {AndOptions} from '../../../src/inputs/AndOptions';
import {SelectAmount} from '../../../src/inputs/SelectAmount';
import {Aridor} from '../../../src/cards/colonies/Aridor';
import {PharmacyUnion} from '../../../src/cards/promo/PharmacyUnion';
import {IndustrialMicrobes} from '../../../src/cards/base/IndustrialMicrobes';

describe('Merger', function() {
  let card : Merger; let player : Player; let player2: Player; let game : Game;

  beforeEach(() => {
    card = new Merger();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({preludeExtension: true});
    game = Game.newInstance('foobar', [player, player2], player, gameOptions);

    // Preset corporation deck for testing
    game.dealer.corporationCards = [new ArcadianCommunities(), new SaturnSystems(), new TerralabsResearch(), new Polyphemos()];
  });

  it('Can play as long as have enough M€', function() {
    player.megaCredits = 28; // 28 + 14 from Terralabs is just enough to pay the cost of 42 M€
    card.play(player);

    const selectCorp = game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    expect(selectCorp.cards).has.length(4);
  });

  it('Excludes corps that player cannot afford', function() {
    player.megaCredits = 27;
    card.play(player);

    const selectCorp = game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    expect(selectCorp.cards).has.length(3);
  });

  it('Can play as long as have enough M€', function() {
    player.megaCredits = 28; // 28 + 14 from Terralabs is just enough to pay the cost of 42 M€
    card.play(player);

    const selectCorp = game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    const index = selectCorp.cards.findIndex((card) => card.name === CardName.ARCADIAN_COMMUNITIES);
    selectCorp.cb([selectCorp.cards[index]]); // Arcadian

    game.deferredActions.pop()!.execute(); // SelectHowToPayDeferred
    expect(player.isCorporation(CardName.ARCADIAN_COMMUNITIES)).is.true;
    expect(player.pendingInitialActions).has.length(1);
  });

  it('Player has 2 corps after playing Merger', function() {
    player.corporationCards.push(new Splice());  
    card.play(player);

    const selectCorp = game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    selectCorp.cb([selectCorp.cards[0]]);
    expect(player.corporationCards).has.length(2);
  });

  it('Player has effects of both corps', function() {
    player.corporationCards.push(new Splice());
    player.corporationCards.push(new SaturnSystems());
    player.megaCredits = 0;

    expect(player.isCorporation(CardName.SPLICE)).is.true;
    expect(player.isCorporation(CardName.SATURN_SYSTEMS)).is.true;

    player2.playCard(new VestaShipyard());
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(1); // Saturn Sys

    player2.playCard(new Ants());
    // Play the card
    game.deferredActions.runNext();
    // Give Splice its 2 M€
    game.deferredActions.runNext();
    expect(player.megaCredits).to.eq(2); // Splice
  });

  it('Works with Terralabs played via Merger', function() {
    player.megaCredits = 50; // Ensure enough to pay for Merger cost
    card.play(player);

    const selectCorp = game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    const index = selectCorp.cards.findIndex((card) => card.name === CardName.TERRALABS_RESEARCH);
    selectCorp.cb([selectCorp.cards[index]]); // Terralabs
    expect(player.cardCost).to.eq(1);
  });

  it('Works with Polyphemos played via Merger', function() {
    card.play(player);

    const selectCorp = game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    const index = selectCorp.cards.findIndex((card) => card.name === CardName.POLYPHEMOS);
    selectCorp.cb([selectCorp.cards[index]]); // Polyphemos
    expect(player.cardCost).to.eq(5);
  });

  it('Works with both Terralabs and Polyphemos together', function() {
    game.playCorporationCard(player, new TerralabsResearch());
    Merger.playSecondCorporationCard(player, new Polyphemos());
    expect(player.cardCost).to.eq(CARD_COST);
  });

  it('Adds Merger corp initial action to player.pendingInitialActions', function() {
    game.playCorporationCard(player, new TharsisRepublic());
    expect(player.pendingInitialActions).has.length(1);

    card.play(player);

    const selectCorp = game.deferredActions.pop()!.execute() as SelectCard<ICard>;
    const index = selectCorp.cards.findIndex((card) => card.name === CardName.ARCADIAN_COMMUNITIES);
    selectCorp.cb([selectCorp.cards[index]]); // Arcadian
    expect(player.pendingInitialActions).has.length(2);
  });

  it('Works with Point Luna and second corp with Earth tag', function() {
    game.playCorporationCard(player, new PointLuna());
    const handSize = player.cardsInHand.length;

    Merger.playSecondCorporationCard(player, new Teractor());
    game.deferredActions.runAll(() => {});
    expect(player.cardsInHand.length).to.eq(handSize + 1);
  });

  it('dealCorporationCards does not deal corps already in play', function() {
    const pointLuna = new PointLuna();
    const teractor = new Teractor();
    game.dealer.corporationCards = [pointLuna, teractor, ...game.dealer.corporationCards];
    player.corporationCards = [pointLuna];
    player2.corporationCards = [teractor];

    const dealtCorps = Merger.dealCorporationCards(player, game.dealer);
    expect(dealtCorps).has.length(4);
    expect(dealtCorps).to.not.include(pointLuna);
    expect(dealtCorps).to.not.include(teractor);
  });

  it('dealCorporationCards does not deal discarded corps', function() {
    const pointLuna = new PointLuna();
    const teractor = new Teractor();
    game.dealer.discarded = [pointLuna, teractor];

    const dealtCorps = Merger.dealCorporationCards(player, game.dealer);
    expect(dealtCorps).has.length(4);
    expect(dealtCorps).to.not.include(pointLuna);
    expect(dealtCorps).to.not.include(teractor);
  });

  it('Works with Helion + Robinson Industries', () => {
    setupHelionForPlayer(player);
    const robinson = new RobinsonIndustries();

    player.megaCredits = 3;
    expect(robinson.canAct(player)).is.false;

    player.heat = 1;
    expect(robinson.canAct(player)).is.true;

    // Setting a larger amount of heat just to make the test results
    player.heat = 5;

    const selectResource = robinson.action(player) as OrOptions;
    expect((selectResource.options[1].title as String).includes('steel')).is.true;

    selectResource.options[1].cb();
    TestingUtils.runAllActions(game);

    const howToPay = player.getWaitingFor() as SelectHowToPay;
    howToPay.cb({megaCredits: 2, heat: 2, steel: 0, titanium: 0, microbes: 0, floaters: 0, science: 0, graphene: 0, asteroids: 0, plants: 0, spireScience: 0});
    TestingUtils.runAllActions(game);
    expect(player.getProduction(Resources.STEEL)).to.eq(1);
    expect(player.megaCredits).to.eq(1);
    expect(player.heat).to.eq(3);
  });

  it('Works with Helion + UNMI', () => {
    setupHelionForPlayer(player);
    const unmi = new UnitedNationsMarsInitiative();

    player.increaseTerraformRating();
    expect(player.getTerraformRating()).to.eq(21);

    player.megaCredits = 2;
    expect(unmi.canAct(player)).is.false;

    player.heat = 1;
    expect(unmi.canAct(player)).is.true;

    // Setting a larger amount of heat just to make the test results
    player.heat = 5;

    unmi.action(player);
    TestingUtils.runAllActions(game);

    const howToPay = player.getWaitingFor() as SelectHowToPay;
    howToPay.cb({megaCredits: 1, heat: 2, steel: 0, titanium: 0, microbes: 0, floaters: 0, science: 0, graphene: 0, asteroids: 0, plants: 0, spireScience: 0});
    TestingUtils.runAllActions(game);

    expect(player.getTerraformRating()).to.eq(22);
    expect(player.megaCredits).to.eq(1);
    expect(player.heat).to.eq(3);
  });

  it('Works with Helion + Factorum', () => {
    setupHelionForPlayer(player);
    const factorum = new Factorum();

    player.megaCredits = 2;
    player.energy = 5;
    expect(factorum.canAct(player)).is.false;

    player.heat = 1;
    expect(factorum.canAct(player)).is.true;

    // Setting a larger amount of heat just to make the test results more interesting
    player.heat = 5;

    const selectOption = factorum.action(player) as SelectOption;
    selectOption.cb();
    TestingUtils.runAllActions(game);

    const howToPay = player.getWaitingFor() as SelectHowToPay;
    howToPay.cb({megaCredits: 1, heat: 2, steel: 0, titanium: 0, microbes: 0, floaters: 0, science: 0, graphene: 0, asteroids: 0, plants: 0, spireScience: 0});
    TestingUtils.runAllActions(game);

    expect(player.cardsInHand).has.lengthOf(1);
    expect(player.megaCredits).to.eq(1);
    expect(player.heat).to.eq(3);
  });

  it('Works with Helion + Project Workshop', () => {
    setupHelionForPlayer(player);
    const pw = new ProjectWorkshop();

    player.megaCredits = 4;
    expect(pw.canAct(player)).is.false;

    player.heat = 1;
    expect(pw.canAct(player)).is.true;

    // Setting a larger amount of heat just to make the test results more interesting
    player.heat = 5;

    pw.action(player);
    TestingUtils.runAllActions(game);

    const howToPay = player.getWaitingFor() as SelectHowToPay;
    howToPay.cb({megaCredits: 3, heat: 2, steel: 0, titanium: 0, microbes: 0, floaters: 0, science: 0, graphene: 0, asteroids: 0, plants: 0, spireScience: 0});
    TestingUtils.runAllActions(game);

    expect(player.megaCredits).to.eq(1);
    expect(player.heat).to.eq(3);
    expect(player.cardsInHand).has.lengthOf(1);
    expect(player.cardsInHand[0].cardType).to.eq(CardType.ACTIVE);
  });

  it('Works with Helion + Stormcraft', () => {
    setupHelionForPlayer(player);
    const stormcraft = new StormCraftIncorporated();
    player.corporationCards.push(stormcraft);

    player.heat = 4;
    player.megaCredits = 0;

    expect(player.availableHeat).eq(4);
    expect(player.canAfford(10)).is.false;

    stormcraft.resourceCount = 3;

    expect(player.availableHeat).eq(10);
    expect(player.canAfford(10)).is.true;

    // Stormcraft's AndOptions for selecting payment amounts
    const action = player.spendHeat(7) as AndOptions;

    const heatOption = action.options[0] as SelectAmount;
    const floaterOption = action.options[1] as SelectAmount;
    heatOption.cb(3);
    floaterOption.cb(2);
    action.cb();

    expect(player.heat).eq(1);
    expect(stormcraft.resourceCount).eq(1);
  });

  it('Works with Aridor', () => {
    const aridor = new Aridor();
    aridor.play();
    player.corporationCards.push(aridor);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(0);

    const pharmacyUnion = new PharmacyUnion();
    Merger.playSecondCorporationCard(player, pharmacyUnion);

    TestingUtils.runAllActions(game);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(1);
  });

  it('Works with Splice + Pharmacy Union', () => {
    const splice = new Splice();
    player.corporationCards.push(splice);
    const pharmacyUnion = new PharmacyUnion();
    player.corporationCards.push(pharmacyUnion);

    player.megaCredits = 1;

    const industrialMicrobes = new IndustrialMicrobes();
    player.playCard(industrialMicrobes);
    // PU first causes player to lose 4 M€ or as much as possible
    game.deferredActions.runNext();
    expect(player.megaCredits).to.eq(0);

    // Splice then gives the player 2 M€
    game.deferredActions.runNext();
    expect(player.megaCredits).to.eq(2);
  });

  function setupHelionForPlayer(player: Player) {
    const helion = new Helion();
    helion.play(player);
    player.corporationCards.push(helion);
  }
});

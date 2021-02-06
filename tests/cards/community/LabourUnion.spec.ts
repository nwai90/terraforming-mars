import {expect} from 'chai';
import {AquiferStandardProject} from '../../../src/cards/base/standardProjects/AquiferStandardProject';
import {CityStandardProject} from '../../../src/cards/base/standardProjects/CityStandardProject';
import {LabourUnion} from '../../../src/cards/community/corporations/LabourUnion';
import {DiscardCards} from '../../../src/deferredActions/DiscardCards';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestingUtils';

describe('LabourUnion', function() {
  let card : LabourUnion; let player : Player; let game: Game;

  beforeEach(function() {
    card = new LabourUnion();
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('foobar', [player], player);

    card.play();
    player.corporationCard = card;
  });

  it('Must discard down to 10 cards at generation end', function() {
    for (let i = 0; i < 14; i++) {
      player.cardsInHand.push(game.dealer.dealCard(game));
    }

    player.runProductionPhase();
    expect(game.deferredActions).has.lengthOf(1);

    const selectDiscard = game.deferredActions.peek()! as DiscardCards;
    expect(selectDiscard instanceof DiscardCards).is.true;
  });

  it('Standard projects cost 4 MC less', function() {
    const aquifer = new AquiferStandardProject();
    player.megaCredits = aquifer.cost - 4;
    expect(aquifer.canAct(player)).is.true;

    const city = new CityStandardProject();
    player.megaCredits = city.cost - 4;
    expect(city.canAct(player)).is.true;
  });
});

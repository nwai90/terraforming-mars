import {expect} from 'chai';
import {MartianZoo} from '../../../src/cards/colonies/MartianZoo';
import {IProjectCard} from '../../../src/cards/IProjectCard';
import {Tags} from '../../../src/cards/Tags';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';

describe('MartianZoo', function() {
  let card : MartianZoo; let player : Player; let player2 : Player;

  beforeEach(() => {
    card = new MartianZoo();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
  });

  it('Can\'t play', function() {
    expect(card.canPlay(player)).is.false;
  });

  it('Should play', function() {
    const lands = player.game.board.getAvailableSpacesOnLand(player);
    player.game.addCityTile(player, lands[0].id);
    player.game.addCityTile(player, lands[1].id);
    expect(card.canPlay(player)).is.true;

    const action = card.play();
    expect(action).is.undefined;
  });

  it('Can\'t act', function() {
    player.playedCards.push(card);
    expect(card.canAct()).is.false;
  });

  it('Should act', function() {
    player.playedCards.push(card);

    card.onCardPlayed(player, {tags: [Tags.EARTH, Tags.EARTH]} as IProjectCard);
    expect(card.resourceCount).eq(2);

    card.onCardPlayed(player2, {tags: [Tags.EARTH, Tags.EARTH]} as IProjectCard);
    expect(card.resourceCount).eq(2);

    expect(card.canAct()).is.true;
    card.action(player);
    expect(player.megaCredits).eq(2);
  });
});

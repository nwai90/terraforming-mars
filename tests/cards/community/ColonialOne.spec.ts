import {expect} from 'chai';
import {ColonialOne} from '../../../src/cards/community/corporations/ColonialOne';
import {Player} from '../../../src/Player';
import {Game, GameOptions} from '../../../src/Game';
import {setCustomGameOptions, TestPlayers} from '../../TestingUtils';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {SelectColony} from '../../../src/inputs/SelectColony';
import {ColonyName} from '../../../src/colonies/ColonyName';

describe('ColonialOne', function() {
  let card : ColonialOne; let player : Player; let game : Game;

  beforeEach(function() {
    card = new ColonialOne();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();

    const gameOptions = setCustomGameOptions({coloniesExtension: true}) as GameOptions;
    game = Game.newInstance('foobar', [player, redPlayer], player, gameOptions);

    card.play(player);
    player.corporationCard = card;
  });

  it('Starts with 3 fighter resources', function() {
    expect(card.resourceCount).to.eq(3);
  });

  it('Can spend fighter resource to trade for free', function() {
    const action = card.action(player, game);
    expect(action instanceof OrOptions).to.eq(true);
    expect(action!.options.length).to.eq(2);

    action!.options[0].cb();
    expect(game.deferredActions.length).to.eq(1);
    const selectColony = game.deferredActions.next()!.execute() as SelectColony;
    selectColony.cb((<any>ColonyName)[selectColony.coloniesModel[0].name.toUpperCase()]);

    expect(card.resourceCount).to.eq(2);
  });

  it('Can move a colony tile track', function() {
    const action = card.action(player, game);
    action!.options[1].cb();
    expect(game.deferredActions.length).to.eq(1);

    const selectColony = game.deferredActions.next()!;
    expect(selectColony.execute() instanceof SelectColony).to.eq(true);
  });
});

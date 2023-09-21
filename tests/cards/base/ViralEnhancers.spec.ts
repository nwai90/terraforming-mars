import {expect} from 'chai';
import {ViralEnhancers} from '../../../src/cards/base/ViralEnhancers';
import {IProjectCard} from '../../../src/cards/IProjectCard';
import {Tags} from '../../../src/cards/Tags';
import {Game} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {Player} from '../../../src/Player';
import {ResourceType} from '../../../src/ResourceType';
import {TestPlayers} from '../../TestPlayers';

describe('ViralEnhancers', function() {
  let card : ViralEnhancers; let player : Player; let player2 : Player; let game : Game;

  beforeEach(() => {
    card = new ViralEnhancers();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Should play', function() {
    card.play();
    player.playedCards.push(card);

    const ants = {tags: [Tags.ANIMAL], resourceType: ResourceType.MICROBE, resourceCount: 0} as IProjectCard;
    const birds = {tags: [Tags.ANIMAL], resourceType: ResourceType.ANIMAL, resourceCount: 0} as IProjectCard;
    const moss = {tags: [Tags.PLANT]} as IProjectCard;
    
    card.onCardPlayed(player, birds);
    expect(game.deferredActions).has.lengthOf(1);

    const orOptions = game.deferredActions.pop()!.execute() as OrOptions;
    orOptions.options[0].cb();
    expect(player.getResourcesOnCard(birds)).eq(1);
    orOptions.options[1].cb();
    expect(player.plants).eq(1);

    card.onCardPlayed(player, ants);
    expect(game.deferredActions).has.lengthOf(1);

    const orOptions2 = game.deferredActions.pop()!.execute() as OrOptions;
    orOptions2.options[0].cb();
    expect(player.getResourcesOnCard(ants)).eq(1);
    orOptions2.options[1].cb();
    expect(player.plants).eq(2);

    card.onCardPlayed(player, moss);
    expect(player.plants).eq(3);

    card.onCardPlayed(player2, moss);
    expect(player.plants).eq(3);
    expect(player2.plants).eq(0);
  });

  it('Should play for each tag', function() {
    card.play();
    player.playedCards.push(card);

    const ecologicalZone = {tags: [Tags.PLANT, Tags.ANIMAL], resourceType: ResourceType.ANIMAL, resourceCount: 0} as IProjectCard;
    card.onCardPlayed(player, ecologicalZone);
    expect(game.deferredActions).has.lengthOf(2);

    const orOptions = game.deferredActions.pop()!.execute() as OrOptions;
    orOptions.options[0].cb();
    expect(player.getResourcesOnCard(ecologicalZone)).eq(1);
    expect(game.deferredActions).has.lengthOf(1);

    const orOptions2 = game.deferredActions.pop()!.execute() as OrOptions;
    orOptions2.options[1].cb();
    expect(player.plants).eq(1);
    expect(game.deferredActions).has.lengthOf(0);
  });
});

import {expect} from 'chai';
import {Ants} from '../../../src/cards/base/Ants';
import {MedicalLab} from '../../../src/cards/base/MedicalLab';
import {Research} from '../../../src/cards/base/Research';
import {CardType} from '../../../src/cards/CardType';
import {ICard} from '../../../src/cards/ICard';
import {ValleyTrust} from '../../../src/cards/prelude/ValleyTrust';
import {Game} from '../../../src/Game';
import {SelectCard} from '../../../src/inputs/SelectCard';
import {Player} from '../../../src/Player';
import {TestingUtils} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayers';

describe('ValleyTrust', function() {
  let card : ValleyTrust; let player : Player;

  beforeEach(() => {
    card = new ValleyTrust();
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = TestingUtils.setCustomGameOptions({preludeExtension: true});
    Game.newInstance('foobar', [player], player, gameOptions);
  });

  it('Does not get card discount for other tags', function() {
    expect(card.getCardDiscount(player, new Ants())).eq(0);
  });

  it('Gets card discount for science tags', function() {
    expect(card.getCardDiscount(player, new MedicalLab())).eq(2);
    expect(card.getCardDiscount(player, new Research())).eq(4);
  });

  it('Should play', function() {
    const action = card.play();
    expect(action).is.undefined;
  });

  it('initial action', () => {
    const selectCard = card.initialAction(player) as SelectCard<ICard>;
    expect(selectCard.cards).has.length(3);
    expect(selectCard.cards.filter((c) => c.cardType === CardType.PRELUDE)).has.length(3);
  });

  it('Card works even without prelude', () => {
    Game.newInstance('foobar', [player], player);

    const selectCard = card.initialAction(player) as SelectCard<ICard>;
    expect(selectCard.cards).has.length(3);
    expect(selectCard.cards.filter((c) => c.cardType === CardType.PRELUDE)).has.length(3);
  });
});

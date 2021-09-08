import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {LeaderCard} from '../LeaderCard';
import {PlayerInput} from '../../PlayerInput';
import {ALL_AWARDS, AMAZONIS_PLANITIA_AWARDS, ARABIA_TERRA_AWARDS, TERRA_CIMMERIA_AWARDS, VASTITAS_BOREALIS_AWARDS} from '../../awards/Awards';
import {IAward} from '../../awards/IAward';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {Card} from '../Card';
import {CardType} from '../CardType';

export class Asimov extends Card implements LeaderCard {
  constructor() {
    super({
      name: CardName.ASIMOV,
      cardType: CardType.LEADER,
      metadata: {
        cardNumber: 'L01',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().award().asterix();
        }),
        description: 'Once per game, put an award into the game and fund it.',
      },
    });
  }

  public isDisabled = false;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return !player.game.allAwardsFunded() && this.isDisabled === false;
  }

  public action(player: Player): PlayerInput | undefined {
    const game = player.game;
    const availableAwards = ALL_AWARDS.filter((award) => {
      if (game.awards.includes(award)) return false;
      if (!game.gameOptions.venusNextExtension && award.name === 'Venuphile') return false;
      if (!game.gameOptions.turmoilExtension && award.name === 'Politician') return false;
      if (!game.gameOptions.aresExtension && award.name === 'Entrepreneur') return false;
      if (!game.gameOptions.moonExpansion && award.name === 'Full Moon') return false;
      if (!game.gameOptions.moonExpansion && award.name === 'Lunar Magnate') return false;

      if (!game.gameOptions.newOpsExpansion) {
        const fanAwards = [...AMAZONIS_PLANITIA_AWARDS, ...ARABIA_TERRA_AWARDS, ...TERRA_CIMMERIA_AWARDS, ...VASTITAS_BOREALIS_AWARDS];
        if (fanAwards.includes(award)) return false;
      }

      return true;
    })

    const freeAward = new OrOptions();
    freeAward.title = 'Select award to put into play and fund';
    freeAward.buttonLabel = 'Confirm';
    freeAward.options = availableAwards.map((award) => this.selectAwardToFund(player, award));

    return freeAward;
  }

  private selectAwardToFund(player: Player, award: IAward): SelectOption {
    return new SelectOption('Fund ' + award.name + ' award', 'Confirm', () => {
      player.game.awards.push(award);
      player.game.fundAward(player, award);
      this.isDisabled = true;
      return undefined;
    });
  }
}

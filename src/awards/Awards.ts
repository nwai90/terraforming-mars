import {Landlord} from './Landlord';
import {Banker} from './Banker';
import {Scientist} from './Scientist';
import {Thermalist} from './Thermalist';
import {Miner} from './Miner';
import {Venuphile} from './Venuphile';
import {IAward} from './IAward';
import {Industrialist} from './Industrialist';
import {Celebrity} from './Celebrity';
import {DesertSettler} from './DesertSettler';
import {EstateDealer} from './EstateDealer';
import {Benefactor} from './Benefactor';
import {Cultivator} from './Cultivator';
import {Magnate} from './Magnate';
import {SpaceBaron} from './SpaceBaron';
import {Excentric} from './Excentric';
import {Contractor} from './Contractor';
import {Entrepreneur} from './Entrepreneur';
import {FullMoon} from '../moon/FullMoon';
import {LunarMagnate} from '../moon/LunarMagnate';
import {Adapter} from './vastitasBorealis/Adapter';
import {Edgedancer} from './vastitasBorealis/Edgedancer';
import {Hoarder} from './vastitasBorealis/Hoarder';
import {Naturalist} from './vastitasBorealis/Naturalist';
import {Voyager} from './vastitasBorealis/Voyager';
import {Generator} from './arabiaTerra/Generator';
import {Highlander} from './arabiaTerra/Highlander';
import {Producer} from './arabiaTerra/Producer';
import {Purist} from './arabiaTerra/Purist';
import {Worker} from './arabiaTerra/Worker';
import {Biologist} from './terraCimmeria/Biologist';
import {Economizer} from './terraCimmeria/Economizer';
import {Politician} from './terraCimmeria/Politician';
import {Urbanist} from './terraCimmeria/Urbanist';
import {Warmonger} from './terraCimmeria/Warmonger';
import {Curator} from './amazonisPlanitia/Curator';
import {Historian} from './amazonisPlanitia/Historian';
import {Tourist} from './amazonisPlanitia/Tourist';
import {Zoologist} from './amazonisPlanitia/Zoologist';
import {Engineer} from './amazonisPlanitia/Engineer';
import {Player} from '../Player';
import {VictoryPointsBreakdown} from '../VictoryPointsBreakdown';

export const ORIGINAL_AWARDS: Array<IAward> = [
  new Landlord(),
  new Scientist(),
  new Banker(),
  new Thermalist(),
  new Miner(),
];

export const VENUS_AWARDS: Array<IAward> = [
  new Venuphile(),
];

export const ELYSIUM_AWARDS: Array<IAward> = [
  new Celebrity(),
  new Industrialist(),
  new DesertSettler(),
  new EstateDealer(),
  new Benefactor(),
];

export const HELLAS_AWARDS: Array<IAward> = [
  new Cultivator(),
  new Magnate(),
  new SpaceBaron(),
  new Excentric(),
  new Contractor(),
];

export const VASTITAS_BOREALIS_AWARDS: Array<IAward> = [
  new Adapter(),
  new Edgedancer(),
  new Hoarder(),
  new Naturalist(),
  new Voyager(),
];

export const ARABIA_TERRA_AWARDS: Array<IAward> = [
  new Generator(),
  new Highlander(),
  new Producer(),
  new Purist(),
  new Worker(),
];

export const TERRA_CIMMERIA_AWARDS: Array<IAward> = [
  new Biologist(),
  new Economizer(),
  new Politician(),
  new Urbanist(),
  new Warmonger(),
];

export const AMAZONIS_PLANITIA_AWARDS: Array<IAward> = [
  new Curator(),
  new Engineer(),
  new Historian(),
  new Tourist(),
  new Zoologist(),
];

export const ARES_AWARDS: Array<IAward> = [
  new Entrepreneur(),
];

export const MOON_AWARDS: Array<IAward> = [
  new FullMoon(),
  new LunarMagnate(),
];

export const ALL_AWARDS: Array<IAward> = [
  ...ORIGINAL_AWARDS,
  ...ELYSIUM_AWARDS,
  ...HELLAS_AWARDS,
  ...VENUS_AWARDS,
  ...ARES_AWARDS,
  ...MOON_AWARDS,
  ...VASTITAS_BOREALIS_AWARDS,
  ...ARABIA_TERRA_AWARDS,
  ...TERRA_CIMMERIA_AWARDS,
  ...AMAZONIS_PLANITIA_AWARDS,
];

export namespace Awards {
  export const ALL = ALL_AWARDS;

  export function getByName(name: string): IAward {
    const award = ALL_AWARDS.find((a) => a.name === name);
    if (award) {
      return award;
    }
    throw new Error(`Award ${name} not found.`);
  }

  export function giveAwards(player: Player, vpb: VictoryPointsBreakdown): void {
    player.game.fundedAwards.forEach((fundedAward) => {
      // Awards are disabled for 1 player games
      if (player.game.isSoloMode()) return;

      const awardStr = fundedAward.award.name + ' award (funded by ' + fundedAward.player.name + ')';
      const players: Array<Player> = player.game.getPlayers();
      players.sort((p1, p2) => fundedAward.award.getScore(p2) - fundedAward.award.getScore(p1));

      // We have one rank 1 player
      if (fundedAward.award.getScore(players[0]) > fundedAward.award.getScore(players[1])) {
        if (players[0].id === player.id) vpb.setVictoryPoints('awards', 5, '1st place for ' + awardStr);
        players.shift();

        if (players.length > 1) {
          // We have one rank 2 player
          if (fundedAward.award.getScore(players[0]) > fundedAward.award.getScore(players[1])) {
            if (players[0].id === player.id) vpb.setVictoryPoints('awards', 2, '2nd place for ' + awardStr);
          // We have at least two rank 2 players
          } else {
            const score = fundedAward.award.getScore(players[0]);
            while (players.length > 0 && fundedAward.award.getScore(players[0]) === score) {
              if (players[0].id === player.id) vpb.setVictoryPoints('awards', 2, '2nd place for ' + awardStr);
              players.shift();
            }
          }
        }
      // We have at least two rank 1 players
      } else {
        const score = fundedAward.award.getScore(players[0]);
        while (players.length > 0 && fundedAward.award.getScore(players[0]) === score) {
          if (players[0].id === player.id) vpb.setVictoryPoints('awards', 5, '1st place for ' + awardStr);
          players.shift();
        }
      }
    });
  }
}

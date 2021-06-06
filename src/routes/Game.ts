import * as http from 'http';
import {Handler} from './Handler';
import {IContext} from './IHandler';
import {Database} from '../database/Database';
import {BoardName, BoardRandomOption} from '../boards/BoardName';
import {Cloner} from '../database/Cloner';
import {GameLoader} from '../database/GameLoader';
import {Game} from '../Game';
import {Player} from '../Player';
import {Server} from '../models/ServerModel';
import {ServeAsset} from './ServeAsset';

// Oh, this could be called Game, but that would introduce all kinds of issues.
export class GameHandler extends Handler {
  public static readonly INSTANCE = new GameHandler();
  private constructor() {
    super();
  }

  public generateRandomId(prefix: string): string {
    // 281474976710656 possible values.
    return prefix + Math.floor(Math.random() * Math.pow(16, 12)).toString(16);
  }

  public get(req: http.IncomingMessage, res: http.ServerResponse, ctx: IContext): void {
    req.url = '/assets/index.html';
    ServeAsset.INSTANCE.get(req, res, ctx);
  }

  // TODO(kberg): much of this code can be moved outside of handler, and that
  // would be better.
  public put(req: http.IncomingMessage, res: http.ServerResponse, ctx: IContext): void {
    let body = '';
    req.on('data', function(data) {
      body += data.toString();
    });
    req.once('end', () => {
      try {
        const gameReq = JSON.parse(body);
        const gameId = this.generateRandomId('g');
        const spectatorId = this.generateRandomId('s');
        const players = gameReq.players.map((obj: any) => {
          return new Player(
            obj.name,
            obj.color,
            obj.beginner,
            Number(obj.handicap), // For some reason handicap is coming up a string.
            this.generateRandomId('p'),
          );
        });
        let firstPlayerIdx: number = 0;
        for (let i = 0; i < gameReq.players.length; i++) {
          if (gameReq.players[i].first === true) {
            firstPlayerIdx = i;
            break;
          }
        }

        if (gameReq.board === BoardRandomOption.RANDOM_OFFICIAL) {
          const officialBoards = [BoardName.ORIGINAL, BoardName.HELLAS, BoardName.ELYSIUM];
          gameReq.board = officialBoards[Math.floor(Math.random() * officialBoards.length)];
        } else if (gameReq.board === BoardRandomOption.RANDOM_ALL) {
          const boards = Object.values(BoardName);
          gameReq.board = boards[Math.floor(Math.random() * boards.length)];
        }

        const gameOptions = {
          boardName: gameReq.board,
          clonedGamedId: gameReq.clonedGamedId,

          undoOption: gameReq.undoOption,
          showTimers: gameReq.showTimers,
          fastModeOption: gameReq.fastModeOption,

          corporateEra: gameReq.corporateEra,
          venusNextExtension: gameReq.venusNext,
          coloniesExtension: gameReq.colonies,
          preludeExtension: gameReq.prelude,
          turmoilExtension: gameReq.turmoil,
          aresExtension: gameReq.aresExtension,
          aresHazards: true, // Not a runtime option.
          politicalAgendasExtension: gameReq.politicalAgendasExtension,
          societyExpansion: gameReq.societyExpansion,
          moonExpansion: gameReq.moonExpansion,
          promoCardsOption: gameReq.promoCardsOption,
          communityCardsOption: gameReq.communityCardsOption,
          colosseumVariant: gameReq.colosseumVariant,
          solarPhaseOption: gameReq.solarPhaseOption,
          silverCubeVariant: gameReq.silverCubeVariant,

          draftVariant: gameReq.draftVariant,
          initialDraftVariant: gameReq.initialDraft,
          startingCorporations: gameReq.startingCorporations,
          shuffleMapOption: gameReq.shuffleMapOption,
          randomMA: gameReq.randomMA,
          randomTurmoil: gameReq.randomTurmoil,
          soloTR: gameReq.soloTR,
          customCorporationsList: gameReq.customCorporationsList,
          cardsBlackList: gameReq.cardsBlackList,
          customColoniesList: gameReq.customColoniesList,
          requiresVenusTrackCompletion: gameReq.requiresVenusTrackCompletion,
          requiresMoonTrackCompletion: gameReq.requiresMoonTrackCompletion,
          escapeVelocityMode: gameReq.escapeVelocityMode,
          escapeVelocityThreshold: gameReq.escapeVelocityThreshold,
          escapeVelocityPeriod: gameReq.escapeVelocityPeriod,
          escapeVelocityPenalty: gameReq.escapeVelocityPenalty,
        };

        if (gameOptions.clonedGamedId !== undefined && !gameOptions.clonedGamedId.startsWith('#')) {
          Database.getInstance().loadCloneableGame(gameOptions.clonedGamedId, (err, serialized) => {
            Cloner.clone(gameId, players, firstPlayerIdx, err, serialized, (err, game) => {
              if (err) {
                throw err;
              }
              if (game === undefined) {
                throw new Error(`game ${gameOptions.clonedGamedId} not cloned`); // how to nest errs in the way Java nests exceptions?
              }
              GameLoader.getInstance().add(game);
              ctx.route.writeJson(res, Server.getGameModel(game));
            });
          });
        } else {
          const seed = Math.random();
          const game = Game.newInstance(gameId, players, players[firstPlayerIdx], gameOptions, seed, spectatorId);
          GameLoader.getInstance().add(game);
          ctx.route.writeJson(res, Server.getGameModel(game));
        }
      } catch (error) {
        ctx.route.internalServerError(req, res, error);
      }
    });
  }
}

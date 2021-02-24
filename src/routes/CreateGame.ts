import * as http from 'http';
import {Handler} from './Handler';
import {IContext} from './IHandler';
import {Database} from '../database/Database';
import {BoardName} from '../boards/BoardName';
import {Cloner} from '../database/Cloner';
import {GameLoader} from '../database/GameLoader';
import {Game, GameId} from '../Game';
import {Player} from '../Player';
import {Server} from '../server/ServerModel';

// A copy from server.ts. Please dedupe.
function generateRandomId(): GameId {
  // 281474976710656 possible values.
  return Math.floor(Math.random() * Math.pow(16, 12)).toString(16);
}

export class CreateGame extends Handler {
  public static readonly INSTANCE = new CreateGame();
  private constructor() {
    super();
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
        const gameId = generateRandomId();
        const players = gameReq.players.map((obj: any) => {
          return new Player(
            obj.name,
            obj.color,
            obj.beginner,
            Number(obj.handicap), // For some reason handicap is coming up a string.
            generateRandomId(),
          );
        });
        let firstPlayerIdx: number = 0;
        for (let i = 0; i < gameReq.players.length; i++) {
          if (gameReq.players[i].first === true) {
            firstPlayerIdx = i;
            break;
          }
        }

        if (gameReq.board === 'random') {
          let boards = Object.values(BoardName);
          const communityBoards = [BoardName.AMAZONIS, BoardName.ARABIA_TERRA, BoardName.VASTITAS_BOREALIS];
          if (!gameReq.communityCardsOption) boards = boards.filter((b) => !communityBoards.includes(b));

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
          const game = Game.newInstance(gameId, players, players[firstPlayerIdx], gameOptions, seed);
          GameLoader.getInstance().add(game);
          ctx.route.writeJson(res, Server.getGameModel(game));
        }
      } catch (error) {
        ctx.route.internalServerError(req, res, error);
      }
    });
  }
}

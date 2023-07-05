import * as http from 'http';
import {Server} from '../models/ServerModel';
import {Phase} from '../Phase';
import {Handler} from './Handler';
import {IContext} from './IHandler';

export class ApiPlayer extends Handler {
  public static readonly INSTANCE = new ApiPlayer();

  private constructor() {
    super();
  }

  public get(req: http.IncomingMessage, res: http.ServerResponse, ctx: IContext): void {
    const playerId = String(ctx.url.searchParams.get('id'));
    const incomingPassword = String(ctx.url.searchParams.get('password'));
    const incomingServerId = String(ctx.url.searchParams.get('serverId'));

    ctx.gameLoader.getByPlayerId(playerId, (game) => {
      if (game === undefined) {
        ctx.route.notFound(req, res);
        return;
      }
      try {
        ctx.ipTracker.addParticipant(playerId, ctx.ip);
        const player = game.getPlayerById(playerId);

        // Don't bother with password for solo mode
        if (game.isSoloMode()) {
          ctx.route.writeJson(res, Server.getPlayerModel(player));
        } else {
          if (player.password === undefined) {
            player.password = Math.floor(Math.random() * Math.pow(16, 12)).toString(16);
            ctx.route.writeJson(res, Server.getPlayerModel(player));
            return;
          } else if (player.password === incomingPassword || incomingServerId === process.env.SERVER_ID || game.phase === Phase.END) {
            ctx.route.writeJson(res, Server.getPlayerModel(player));
          } else if (player.password !== incomingPassword) {
            ctx.route.incorrectPassword(res);
          } else {
            ctx.route.notFound(req, res);
          }
        }
      } catch (err) {
        console.warn(`unable to find player ${playerId}`, err);
        ctx.route.notFound(req, res);
        return;
      }
    });
  }
}

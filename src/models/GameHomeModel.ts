
import {Color} from '../Color';
import {GameId, SpectatorId} from '../Game';
import {Phase} from '../Phase';
import {PlayerId} from '../Player';
import {GameOptionsModel} from '../models/GameOptionsModel';

export interface GameHomeModel {
    activePlayer: Color;
    id: GameId;
    phase: Phase;
    players: Array<GameHomePlayerModel>;
    gameOptions: GameOptionsModel;
    lastSoloGeneration: number;
    spectatorId: SpectatorId | undefined;
}

interface GameHomePlayerModel {
    color: Color;
    id: PlayerId;
    name: string;
}

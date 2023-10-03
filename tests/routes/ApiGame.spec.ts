import * as http from 'http';
import {expect} from 'chai';
import {ApiGame} from '../../src/routes/ApiGame';
import {Game} from '../../src/Game';
import {MockResponse} from './HttpMocks';
import {IContext} from '../../src/routes/IHandler';
import {TestPlayers} from '../TestPlayers';
import {TestingUtils} from '../TestingUtils';

describe('ApiGame', () => {
  let req: http.IncomingMessage;
  let res: MockResponse;
  let ctx: IContext;

  // Strictly speaking |parameters| can also accept a fragment.
  const setRequest = function(parameters: string) {
    req.url = parameters;
    ctx.url = new URL('http://boo.com' + parameters);
  };

  beforeEach(() => {
    req = {} as http.IncomingMessage;
    res = new MockResponse();
    ctx = TestingUtils.mockContext();
  });

  it('no parameter', () => {
    setRequest('/api/game');
    ApiGame.INSTANCE.get(req, res.hide(), ctx);
    expect(res.statusCode).eq(404);
    expect(res.content).eq('Not found: id parameter missing');
  });

  it('invalid id', () => {
    const player = TestPlayers.BLACK.newPlayer();
    ctx.gameLoader.add(Game.newInstance('validId', [player], player));
    setRequest('/api/game?id=invalidId');
    ApiGame.INSTANCE.get(req, res.hide(), ctx);
    expect(res.statusCode).eq(404);
    expect(res.content).eq('Not found: game not found');
  });

  it('valid id', () => {
    const player = TestPlayers.BLACK.newPlayer();
    ctx.gameLoader.add(Game.newInstance('validId', [player], player));
    setRequest('/api/game?id=validId');
    ApiGame.INSTANCE.get(req, res.hide(), ctx);
    // This test is probably brittle.
    expect(JSON.parse(res.content)).deep.eq(
      {
        'activePlayer': 'black',
        'id': 'validId',
        'lastSoloGeneration': 14,
        'phase': 'research',
        'players': [
          {
            'color': 'black',
            'id': 'black-id',
            'name': 'player-black',
          },
        ],
        'gameOptions': {
          'altVenusBoard': false, 'aresExtension': false, 'boardName': 'tharsis', 'cardsBlackList': [], 'coloniesExtension': false, 'communityCardsOption': false, 'colosseumVariant': false, 'twoCorpsVariant': false, 'newOpsExpansion': false, 'aresExtremeVariant': false, 'corporateEra': true, 'draftVariant': false, 'fastModeOption': false, 'initialDraftVariant': false, 'leadersExpansion': false, 'archaeologyExtension': false, 'automaSoloVariant': false, 'preludeTwoExtension': false, 'moonExpansion': false, 'preludeExtension': false, 'promoCardsOption': false, 'politicalAgendasExtension': 'Standard', 'showTimers': true, 'shuffleMapOption': false, 'shuffleMoonMapOption': false, 'societyExpansion': false, 'silverCubeVariant': false, 'singleTradeVariant': false, 'equalOpportunityVariant': false, 'solarPhaseOption': false, 'soloTR': false, 'randomMA': 'No randomization', 'randomTurmoil': false, 'turmoilExtension': false, 'venusNextExtension': false, 'requiresVenusTrackCompletion': false, 'escapeVelocityMode': false,
        },
        'globalsPerGeneration': [],
      },
    );
  });
});

import { expect } from "chai";
import { RegoPlastics } from "../../../src/cards/promo/RegoPlastics";
import { Color } from "../../../src/Color";
import { Game } from "../../../src/Game";
import { Player } from "../../../src/Player";

describe("RegoPlastics", function () {
    let card : RegoPlastics, player : Player, game: Game;

    beforeEach(function() {
        card = new RegoPlastics();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player], player);
    });

    it("Should play", function () {
        card.play(player);
        expect(player.getSteelValue(game)).to.eq(3);
    });

    it("Should give victory points", function () {
        card.play(player);
        expect(card.getVictoryPoints()).to.eq(1);
    });
});
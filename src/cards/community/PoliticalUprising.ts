import { Tags } from "../Tags";
import { Player } from "../../Player";
import { PreludeCard } from "../prelude/PreludeCard";
import { IProjectCard } from "../IProjectCard";
import { CardName } from '../../CardName';
import { Game } from "../../Game";
import { SelectParty } from "../../interrupts/SelectParty";
import { ALL_TURMOIL_PROJECTS_CARDS } from "../../Dealer";

export class PoliticalUprising extends PreludeCard implements IProjectCard {
    public tags: Array<Tags> = [];
    public name: CardName = CardName.POLITICAL_UPRISING;

    public play(player: Player, game: Game) {
        if (game.gameOptions.turmoilExtension) {
            this.drawTurmoilCard(player, game);

            for (let i = 0; i < 4; i++) {
                game.addInterrupt(new SelectParty(player, game, "Select where to send delegate", 1, undefined, undefined, false));
            }
        }

        return undefined;
    }

    private drawTurmoilCard(player: Player, game: Game) {
        if (game.gameOptions.turmoilExtension) {
            const turmoilCards = ALL_TURMOIL_PROJECTS_CARDS.map((c) => c.cardName);
            const drawnCard = game.dealer.deck.find((card) => turmoilCards.includes(card.name));

            if (drawnCard) {
                player.cardsInHand.push(drawnCard);
                game.newLog("${0} drew ${1}", b => b.player(player).card(drawnCard));
            }
        }

        return undefined;
    }
}
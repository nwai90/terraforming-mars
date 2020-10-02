import { CorporationCard } from "../corporation/CorporationCard";
import { Player } from "../../Player";
import { Tags } from "../Tags";
import { CardName } from '../../CardName';

export class Midas implements CorporationCard {
    public name: CardName =  CardName.MIDAS;
    public tags: Array<Tags> = [];
    public startingMegaCredits: number = 150;

    public play(player: Player) {
        player.decreaseTerraformRatingSteps(9);
        return undefined;
    }
}

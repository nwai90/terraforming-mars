
import { ICard } from "../cards/ICard";
import { IProjectCard } from "../cards/IProjectCard";
import { Tags } from "../cards/Tags";
import { LogHelper } from "../components/LogHelper";
import { Game } from "../Game";
import { OrOptions } from "../inputs/OrOptions";
import { SelectCard } from "../inputs/SelectCard";
import { SelectOption } from "../inputs/SelectOption";
import { ISpace } from "../ISpace";
import { Player } from "../Player";
import { Resources } from "../Resources";
import { ResourceType } from "../ResourceType";
import { TileType } from "../TileType";
import { PartyName } from "../turmoil/parties/PartyName";
import { Policy } from "./Policy";

export class ForestRebate implements Policy {
    party = PartyName.GREENS;
    id = "g01";

    onTilePlaced(player: Player, space: ISpace, _game: Game) {
        if (space.tile?.tileType === TileType.GREENERY) {
            player.setResource(Resources.MEGACREDITS, 4);
        }
    };
}

export class FertilizingResearch implements Policy {
    id = "g02";
    party = PartyName.GREENS;

    onTilePlaced(player: Player, _space: ISpace, _game: Game) {
        player.setResource(Resources.PLANTS);
    };
}

export class BioSponsors implements Policy {
    party = PartyName.GREENS;
    id = "g03";

    onCardPlayed(player: Player, _game: Game, card: IProjectCard) {
        const tags = [Tags.ANIMAL, Tags.PLANT, Tags.MICROBES];
        const tagCount = card.tags.filter((tag) => tags.includes(tag)).length;

        player.setResource(Resources.MEGACREDITS, tagCount * 2);
    }
}

export class GMOTransmutation implements Policy {
    party = PartyName.GREENS;
    id = "g04";
    
    canAct(player: Player) {
        return player.plants >= 3;
    }

    action(player: Player, game: Game) {
        player.plants -= 3;

        const availableMicrobeCards = player.getResourceCards(ResourceType.MICROBE);
        const availableAnimalCards = player.getResourceCards(ResourceType.ANIMAL);
        let orOptions = new OrOptions();

        if (availableMicrobeCards.length === 1) {
            orOptions.options.push(new SelectOption("Add 2 microbes to" + availableMicrobeCards[0].name, "Confirm", () => {
                player.addResourceTo(availableMicrobeCards[0], 2);
                LogHelper.logAddResource(game, player, availableMicrobeCards[0], 2);

                return undefined;
            }));
        } else if (availableMicrobeCards.length > 1) {
            orOptions.options.push(new SelectOption("Add 2 microbes to a card", "Confirm", () => {
                return new SelectCard("Select card to add 2 microbes", "Add microbes", availableMicrobeCards, (foundCards: Array<ICard>) => {
                    player.addResourceTo(foundCards[0], 2);
                    LogHelper.logAddResource(game, player, foundCards[0], 2);
                    return undefined;
                });
            }));
        }

        if (availableAnimalCards.length === 1) {
            orOptions.options.push(new SelectOption("Add 1 animal to" + availableAnimalCards[0].name, "Confirm", () => {
                player.addResourceTo(availableAnimalCards[0]);
                LogHelper.logAddResource(game, player, availableAnimalCards[0]);

                return undefined;
            }));
        } else if (availableAnimalCards.length > 1) {
            orOptions.options.push(new SelectOption("Add 1 animal to a card", "Confirm", () => {
                return new SelectCard("Select card to add 1 animal", "Add animal", availableAnimalCards, (foundCards: Array<ICard>) => {
                    player.addResourceTo(foundCards[0]);
                    LogHelper.logAddResource(game, player, foundCards[0]);
                    return undefined;
                });
            }));
        }

        if (orOptions.options.length === 0) return undefined;
        
        return orOptions;
    }
}
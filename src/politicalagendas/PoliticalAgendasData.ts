import { Bonus } from "./Bonus";
import { Policy } from "./Policy";

export interface PoliticalAgendasData {
    // Depending on how the implementation goes, this will contain
    // a list of the set of bonuses and policies in place for the
    // whole game, or be selectable one at a time.
    bonus: Bonus | undefined;
    policy: Policy | undefined;
}

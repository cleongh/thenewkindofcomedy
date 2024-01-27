import { BabyTalkManualCombination } from "./BabyTalk";

/** Combinaciones permitidas en el manual con la acción que deberá realizar
 * el jugador para librarse del bebé.
 */
export const babyTalkManualCombinations: BabyTalkManualCombination[] = [
  { syllables: ["Ga", "Gui", "Ma"], correctAction: "Sácale los Gases" },
  { syllables: ["Gui", "Bi", "Be"], correctAction: "Dale de Comer" },
  { syllables: ["Mu", "Me", "Be"], correctAction: "Échale a Dormir" },
  { syllables: ["Gui", "Pi", "Bi"], correctAction: "Dale Juguetes" },
  { syllables: ["Mu", "Pu", "Pu"], correctAction: "Llévale al Baño" },
  { syllables: ["Mu", "Be", "Be"], correctAction: "Ponle el Chupete" },
];

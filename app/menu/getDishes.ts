import FusionCollection from "fusionable/FusionCollection";

export async function getDishes() {
  const collection = new FusionCollection();
  await collection.loadFromDir("app/menu/content/menu-offer/");
  return collection.getItemsArray();
}

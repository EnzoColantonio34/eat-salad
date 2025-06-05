import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {params} : {params: Promise<{slug: string}>}
) {

  const searchParams = request.nextUrl.searchParams
  const queryType = searchParams.get('type')
  // on chercher à récupérer la valeur du paramètre dans l'URL

  const veggies = [
    "salad",
    "olives",
    "pickles"
  ];

  const proteins = [
    "tuna",
    "eggs",
    "tofu"
  ];

  const sauces = [
    "mustard",
    "vinegar",
    "lemon"
  ];

  let listIngredients = null;

  switch(queryType) {
    case "proteins":
      listIngredients = proteins
      break;
    case "veggies":
      listIngredients = veggies
      break;
    case "sauces":
      listIngredients = sauces
      break;    
    default:
    listIngredients = {veggies, proteins, sauces};
  }

  return new Response(JSON.stringify(listIngredients), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

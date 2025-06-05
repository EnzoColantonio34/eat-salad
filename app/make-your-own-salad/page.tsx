"use client";

import { useActionState, useState } from 'react';
import sendOrder from "@/actions/sendOrder";
import ListOfIngredientsPerType from "@/component/ListOfIngredientsPerType";

export default function MakeYourOwnSaladPage() {
  const [state, formAction, isPending] = useActionState(sendOrder, { 
    orderStatus: false, 
    message: "" 
  });
  const [selectedVeggie, setSelectedVeggie] = useState('');
  const [selectedProtein, setSelectedProtein] = useState('');
  const [selectedSauce, setSelectedSauce] = useState('');

  const isFormValid = selectedVeggie && selectedProtein && selectedSauce;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Composer votre salade
        </h1>
        <p className="text-lg text-gray-700">
          Suivez les 3 étapes pour créer votre salade personnalisée
        </p>
      </div>

      <form action={formAction} className="bg-white rounded-xl shadow-lg p-8 space-y-8">
        {/* Étape 1: Choisir un légume */}
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-600">
            🥗 Étape 1 : Choisissez votre légume
          </h2>
          <ListOfIngredientsPerType 
            type="veggies"
            selectedValue={selectedVeggie}
            onSelect={setSelectedVeggie}
          />
          <input type="hidden" name="veggie" value={selectedVeggie} />
        </div>

        {/* Étape 2: Choisir une protéine */}
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-600">
            🥩 Étape 2 : Choisissez votre protéine
          </h2>
          <ListOfIngredientsPerType 
            type="proteins"
            selectedValue={selectedProtein}
            onSelect={setSelectedProtein}
          />
          <input type="hidden" name="protein" value={selectedProtein} />
        </div>

        {/* Étape 3: Choisir une sauce */}
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-600">
            🍯 Étape 3 : Choisissez votre sauce
          </h2>
          <ListOfIngredientsPerType 
            type="sauces"
            selectedValue={selectedSauce}
            onSelect={setSelectedSauce}
          />
          <input type="hidden" name="sauce" value={selectedSauce} />
        </div>

        {/* Bouton de validation */}
        <button 
          type="submit" 
          disabled={!isFormValid || isPending}
          className={`w-full py-4 px-8 rounded-lg text-lg font-semibold uppercase tracking-wide transition-colors duration-300 ${
            !isFormValid || isPending 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
          }`}
        >
          {isPending ? "Validation en cours..." : "Envoyer votre commande"}
        </button>
      </form>

      {/* Affichage du statut de la commande */}
      {state.orderStatus && (
        <div className="bg-green-100 border-2 border-green-600 text-green-800 p-6 rounded-lg mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">✅ {state.message}</h3>
          <p className="mb-4">Numéro de commande : <strong>{state.orderNumber}</strong></p>
          
          {/* Résumé de la commande */}
          <div className="bg-white bg-opacity-70 p-6 rounded-lg mt-6 text-left">
            <h4 className="text-green-800 font-semibold text-center text-lg mb-4">
              📋 Résumé de votre salade
            </h4>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <span className="mr-2">🥗</span>
                <strong>Légume :</strong>
                <span className="ml-2 capitalize">
                  {selectedVeggie}
                </span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <span className="mr-2">🥩</span>
                <strong>Protéine :</strong>
                <span className="ml-2 capitalize">
                  {selectedProtein}
                </span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <span className="mr-2">🍯</span>
                <strong>Sauce :</strong>
                <span className="ml-2 capitalize">
                  {selectedSauce}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {state.orderStatus === false && state.message && (
        <div className="bg-red-100 border-2 border-red-500 text-red-800 p-6 rounded-lg mt-6 text-center">
          <h3 className="text-lg font-semibold">❌ {state.message}</h3>
        </div>
      )}
    </div>
  );
}

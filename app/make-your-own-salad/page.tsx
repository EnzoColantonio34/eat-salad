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
    <main style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '2rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#2c5530', 
        marginBottom: '1rem',
        fontSize: '2.5rem'
      }}>
        Composer votre salade
      </h1>
      <p style={{ 
        textAlign: 'center', 
        color: '#555', 
        fontSize: '1.1rem',
        marginBottom: '2rem'
      }}>
        Suivez les 3 étapes pour créer votre salade personnalisée :
      </p>

      <form action={formAction} style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        margin: '2rem 0',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        {/* Étape 1: Choisir un légume */}
        <div style={{
          marginBottom: '2.5rem',
          padding: '2rem',
          background: '#fafafa',
          borderRadius: '10px',
          borderLeft: '4px solid #6b8e23'
        }}>
          <h2 style={{
            color: '#2c5530',
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            borderBottom: '2px solid #6b8e23',
            paddingBottom: '0.75rem'
          }}>
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
        <div style={{
          marginBottom: '2.5rem',
          padding: '2rem',
          background: '#fafafa',
          borderRadius: '10px',
          borderLeft: '4px solid #6b8e23'
        }}>
          <h2 style={{
            color: '#2c5530',
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            borderBottom: '2px solid #6b8e23',
            paddingBottom: '0.75rem'
          }}>
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
        <div style={{
          marginBottom: '2.5rem',
          padding: '2rem',
          background: '#fafafa',
          borderRadius: '10px',
          borderLeft: '4px solid #6b8e23'
        }}>
          <h2 style={{
            color: '#2c5530',
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            borderBottom: '2px solid #6b8e23',
            paddingBottom: '0.75rem'
          }}>
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
          style={{
            background: !isFormValid || isPending 
              ? 'linear-gradient(135deg, #cccccc 0%, #999999 100%)'
              : 'linear-gradient(135deg, #6b8e23 0%, #5a7a1f 100%)',
            color: 'white',
            padding: '1.25rem 2.5rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.2rem',
            fontWeight: '600',
            cursor: !isFormValid || isPending ? 'not-allowed' : 'pointer',
            width: '100%',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease'
          }}
        >
          {isPending ? "Validation en cours..." : "Envoyer votre commande"}
        </button>
      </form>

      {/* Affichage du statut de la commande */}
      {state.orderStatus && (
        <div style={{
          background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
          border: '2px solid #6b8e23',
          color: '#155724',
          padding: '1.5rem',
          borderRadius: '10px',
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <h3>✅ {state.message}</h3>
          <p>Numéro de commande : <strong>{state.orderNumber}</strong></p>
          
          {/* Résumé de la commande */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginTop: '1.5rem',
            textAlign: 'left'
          }}>
            <h4 style={{
              color: '#2c5530',
              marginBottom: '1rem',
              textAlign: 'center',
              fontSize: '1.2rem'
            }}>
              📋 Résumé de votre salade
            </h4>
            <div style={{
              display: 'grid',
              gap: '0.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                background: 'rgba(107, 142, 35, 0.1)',
                borderRadius: '6px'
              }}>
                <span style={{ marginRight: '0.5rem' }}>🥗</span>
                <strong>Légume :</strong>
                <span style={{ marginLeft: '0.5rem', textTransform: 'capitalize' }}>
                  {selectedVeggie}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                background: 'rgba(107, 142, 35, 0.1)',
                borderRadius: '6px'
              }}>
                <span style={{ marginRight: '0.5rem' }}>🥩</span>
                <strong>Protéine :</strong>
                <span style={{ marginLeft: '0.5rem', textTransform: 'capitalize' }}>
                  {selectedProtein}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                background: 'rgba(107, 142, 35, 0.1)',
                borderRadius: '6px'
              }}>
                <span style={{ marginRight: '0.5rem' }}>🍯</span>
                <strong>Sauce :</strong>
                <span style={{ marginLeft: '0.5rem', textTransform: 'capitalize' }}>
                  {selectedSauce}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {state.orderStatus === false && state.message && (
        <div style={{
          background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
          border: '2px solid #dc3545',
          color: '#721c24',
          padding: '1.5rem',
          borderRadius: '10px',
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <h3>❌ {state.message}</h3>
        </div>
      )}
    </main>
  );
}

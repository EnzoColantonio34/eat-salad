// actions/sendOrder.tsx

type OrderState = {
  orderStatus: boolean;
  message: string;
  orderNumber?: number;
};

export default async function sendOrder(currState: OrderState, formData: FormData): Promise<OrderState> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const veggie = formData.get('veggie') as string;
  const protein = formData.get('protein') as string;
  const sauce = formData.get('sauce') as string;
  
  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "Utilisateur",
        email: "user@example.com",
        ingredientsList: { veggie, protein, sauce }
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      return {
        orderStatus: true,
        orderNumber: result.id,
        message: "Commande envoyée avec succès !"
      };
    } else {
      return {
        orderStatus: false,
        message: "Erreur lors de l'envoi de la commande"
      };
    }
  } catch (error) {
    return {
      orderStatus: false,
      message: "Erreur de connexion"
    };
  }
}

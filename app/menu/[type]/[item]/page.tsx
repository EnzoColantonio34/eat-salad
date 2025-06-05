import { useParams } from 'next/navigation';

export default function ItemPage() {
  // Les params seront accessibles côté serveur via generateStaticParams ou côté client via useParams
  return (
    <main>
      <h1>Détail de l'item</h1>
      <p>Affichage d'une salade ou d'un plat chaud spécifique.</p>
    </main>
  );
}

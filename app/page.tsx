import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-[60vh] bg-green-50 rounded-2xl shadow-lg p-8">
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="bg-white rounded-full shadow-md p-6 flex items-center justify-center">
          <Image
            src="/images/menu/logo-eat.png"
            alt="Logo Eat Salad"
            width={100}
            height={50}
            className="rounded-full object-contain"
          />
        </div>
        <div className="relative">
          <Image
            src="/images/menu/chicken-caesar-salad.jpeg"
            alt="Salade Caesar au poulet"
            width={340}
            height={340}
            className="rounded-xl shadow-xl object-cover border-4 border-white -ml-8 md:-ml-12 z-10"
            style={{ marginTop: 18 }}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start gap-6 mt-8 md:mt-0">
        <h1 className="font-bold text-2xl md:text-3xl">
          Composez votre salade sur-mesure
        </h1>
        <p className="text-lg text-gray-700">
          Fraîcheur, saveur et créativité dans votre assiette. Découvrez notre
          menu ou créez votre propre salade !
        </p>
        <Link href="/menu">
          <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg text-xl font-semibold shadow transition">
            Voir le menu
          </button>
        </Link>
      </div>
    </section>
  );
}

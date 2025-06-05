import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-[60vh]">
      <div className="flex-1 flex justify-center">
        <Image
          src="/images/logo-eat.png"
          alt="Image de garde"
          width={100}
          height={50}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="flex-1 flex flex-col items-start gap-6">
        <h1 className="font-bold">Composez votre salade sur-mesure</h1>
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

import Header from "@/components/shared/Header/Header";

export default function WebpageLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main>
      <Header isSolid={true} />
      <section className="mt-[110px]">
        { children }
      </section>
    </main>
  );
}
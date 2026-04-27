import Link from "next/link";

export default function NotFound() {
  return (
    <main className="rpg-main">
      <div className="rpg-sheet" style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <h1 className="rpg-title">
          <span className="rpg-title-gradient">Quest Not Found</span>
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[1.5rem] text-[#d4e6ff] mt-6">
          This page does not exist on the map.
        </p>
        <p className="font-[family-name:var(--font-heading)] text-[0.6rem] text-[#9dc1ff] tracking-widest mt-4">
          ⚔️ ERROR CODE: 404 — UNKNOWN REALM
        </p>
        <Link
          href="/"
          className="rpg-tab rpg-tab--active inline-block mt-8 no-underline"
        >
          🏰 Return to Character Sheet
        </Link>
      </div>
    </main>
  );
}

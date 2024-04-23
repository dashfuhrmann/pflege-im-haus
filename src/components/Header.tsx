import { createClient } from "@/prismicio";
import Navbar from "@/components/Navbar";
export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <div>
      <Navbar settings={settings} />
    </div>
  );
}

import Admin from "@repo/ui/admin";  
import { Heading } from "@repo/ui/heading";
export default function Home() {
  return (
    <div>
      <Heading prop="web heading"/>
      <Admin appName="web home section"/>
    </div>
  );
}

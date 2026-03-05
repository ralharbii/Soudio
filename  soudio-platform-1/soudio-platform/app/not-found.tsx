import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center">
        <Container>
          <div className="text-center py-20">
            <div className="text-8xl mb-6">😕</div>
            <h1 className="text-4xl font-black text-neutral-900 mb-4">الصفحة غير موجودة</h1>
            <p className="text-neutral-500 text-lg mb-8">عذراً، لا يمكننا إيجاد الصفحة التي تبحث عنها.</p>
            <Link href="/">
              <Button size="lg">العودة إلى الرئيسية</Button>
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

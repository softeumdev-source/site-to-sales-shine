import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#top" className="flex items-center gap-2">
              <img src={logo} alt="Softeum" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-lg font-bold leading-none">Softeum</span>
            </a>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Pedidos por e-mail viram pedidos no seu ERP. Sem digitar.
              IA, validação automática e integração via API ou exportação personalizada.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#como-funciona" className="hover:text-foreground">Como funciona</a></li>
              <li><a href="#funcionalidades" className="hover:text-foreground">Funcionalidades</a></li>
              <li><a href="#beneficios" className="hover:text-foreground">Benefícios</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Contato</h4>
            <ul className="space-y-2 break-words text-sm text-muted-foreground">
              <li><a href="mailto:comercial@softeum.com.br" className="hover:text-foreground">comercial@softeum.com.br</a></li>
              <li><a href="#demo" className="hover:text-foreground">Agendar demo</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Softeum. Todos os direitos reservados.</p>
          <p>Feito para liberar sua equipe da digitação de pedidos.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-foreground">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Termos de Uso
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

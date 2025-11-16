import { Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-border/50 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-foreground font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all text-sm"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all text-sm"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all text-sm"
                >
                  Fees
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all text-sm"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all text-sm"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-card transition-all"
              >
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-accent transition-all" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-card transition-all"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-accent transition-all" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-card transition-all"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-accent transition-all" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2025 HydraStake. All rights reserved.
          </p>{" "}
        </div>
      </div>
    </footer>
  );
};
export default Footer;

import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-foreground">SDKs</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://npmjs.com/package/@theonecrawl/js" className="hover:text-foreground transition-colors">JavaScript</a></li>
              <li><a href="https://pypi.org/project/theonecrawl/" className="hover:text-foreground transition-colors">Python</a></li>
              <li><a href="https://npmjs.com/package/@theonecrawl/cli" className="hover:text-foreground transition-colors">CLI</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://github.com/jpthegeek/theonecrawl" className="hover:text-foreground transition-colors">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span>Privacy Policy</span></li>
              <li><span>Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/[0.06] text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TheOneCrawl. Open source under AGPL-3.0.
        </div>
      </div>
    </footer>
  );
}

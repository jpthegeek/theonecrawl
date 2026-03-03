import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/pricing" className="hover:text-gray-900 dark:hover:text-gray-100">Pricing</Link></li>
              <li><Link to="/docs" className="hover:text-gray-900 dark:hover:text-gray-100">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">SDKs</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="https://npmjs.com/package/@theonecrawl/js" className="hover:text-gray-900 dark:hover:text-gray-100">JavaScript</a></li>
              <li><a href="https://pypi.org/project/theonecrawl/" className="hover:text-gray-900 dark:hover:text-gray-100">Python</a></li>
              <li><a href="https://npmjs.com/package/@theonecrawl/cli" className="hover:text-gray-900 dark:hover:text-gray-100">CLI</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="https://github.com/jpthegeek/theonecrawl" className="hover:text-gray-900 dark:hover:text-gray-100">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><span>Privacy Policy</span></li>
              <li><span>Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TheOneCrawl. Open source under AGPL-3.0.
        </div>
      </div>
    </footer>
  );
}

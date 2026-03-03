import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="relative group rounded-lg bg-gray-950 dark:bg-gray-900 overflow-hidden">
      {language && (
        <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-800">
          {language}
        </div>
      )}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} />
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

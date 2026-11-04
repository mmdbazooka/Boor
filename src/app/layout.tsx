// The locale layout owns the document so lang and dir are rendered on the server.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

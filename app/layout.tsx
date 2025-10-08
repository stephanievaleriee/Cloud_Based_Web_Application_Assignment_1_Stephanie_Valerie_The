import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

export const metadata = {
  title: 'Assignment 1',
  description: 'Next.js Assignment for CSE3CWA/CSE5006',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <main className="min-h-screen p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

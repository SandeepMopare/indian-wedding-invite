import './globals.css';

export const metadata = {
  title: 'Royal Wedding Invitation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

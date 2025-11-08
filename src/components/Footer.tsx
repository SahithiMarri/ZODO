export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-100 to-pink-100 border-t-2 border-purple-200 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-purple-600">
        <p>© {new Date().getFullYear()} ZODO - Made with 💜 for awesome kids!</p>
      </div>
    </footer>
  );
}

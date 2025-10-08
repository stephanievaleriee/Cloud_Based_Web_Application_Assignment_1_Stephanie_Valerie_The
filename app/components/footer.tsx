export default function Footer() {
    const date = new Date().toLocaleDateString();
  
    return (
      <footer className="bg-gray-900 text-white text-center p-4 mt-6">
        <p>© 2025 Your Name | Student No: 12345678 | {date}</p>
      </footer>
    );
  }
  
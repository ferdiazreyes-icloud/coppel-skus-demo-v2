import { ChevronUp } from 'lucide-react'

const footerColumns = [
  { title: 'Conócenos', links: ['Enlace 1 de la sección 1'] },
  { title: 'Enlaces útiles', links: ['Enlace 1 de la sección 2'] },
  { title: 'Publicaciones', links: ['Enlace 1 de la sección 3'] },
  { title: 'Atención a clientes', links: ['Enlace 1 de la sección 4'] },
  { title: 'Contacto', links: ['Contacto 1'] },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-coppel-navy text-white mt-auto">
      {/* Back to top */}
      <div className="flex justify-center py-3 border-b border-white/10">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors"
        >
          Ir al inicio
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {/* Columns */}
      <div className="max-w-[1440px] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-5 gap-8">
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3 className="font-sans text-sm font-semibold mb-3">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal */}
      <div className="border-t border-white/10 py-4 flex justify-center gap-6 text-xs text-white/60">
        <a href="#" className="hover:text-white transition-colors">Términos y condiciones</a>
        <a href="#" className="hover:text-white transition-colors">Aviso de privacidad</a>
      </div>
    </footer>
  )
}

import { useState, useEffect, useRef } from 'react'
import './styles.css'

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress((scrolled / maxScroll) * 100)

      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const services = [
    { num: '01', title: 'Strategia Digitale', desc: 'Definiamo la tua presenza nel mondo digitale con precisione chirurgica.' },
    { num: '02', title: 'Design & Branding', desc: 'Identità visive che raccontano storie indimenticabili.' },
    { num: '03', title: 'Sviluppo Web', desc: 'Esperienze digitali che superano ogni aspettativa.' },
    { num: '04', title: 'Marketing & Growth', desc: 'Strategie data-driven per una crescita esponenziale.' },
  ]

  const projects = [
    { name: 'Moda Milano', category: 'E-Commerce', year: '2024' },
    { name: 'Ristorante Stelle', category: 'Branding', year: '2024' },
    { name: 'Tech Startup Roma', category: 'Web App', year: '2023' },
    { name: 'Galleria Firenze', category: 'Digital Experience', year: '2023' },
  ]

  return (
    <div className="app">
      {/* Custom Cursor */}
      <div
        className="cursor"
        style={{
          left: mousePos.x - 10,
          top: mousePos.y - 10,
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: mousePos.x - 30,
          top: mousePos.y - 30,
        }}
      />

      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="logo-text">DIVERSO</span>
          <span className="logo-dot">.</span>
        </div>
        <div className="nav-section-indicator">
          {['Home', 'Servizi', 'Progetti', 'Chi Siamo', 'Contatti'][activeSection]}
        </div>
        <button className="nav-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`menu-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`menu-line ${isMenuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Full Screen Menu */}
      <div className={`fullscreen-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          {['Home', 'Servizi', 'Progetti', 'Chi Siamo', 'Contatti'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="menu-item"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="menu-num">0{i + 1}</span>
              <span className="menu-text">{item}</span>
            </a>
          ))}
        </div>
        <div className="menu-footer">
          <p>Milano, Italia</p>
          <p>ciao@diverso.studio</p>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-noise" />
          <div className="hero-lines">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="hero-line" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-tag">
            <span className="tag-line" />
            <span>Studio Creativo Digitale</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line">
              <span className="title-word" style={{ animationDelay: '0.2s' }}>Creiamo</span>
            </span>
            <span className="title-line">
              <span className="title-word" style={{ animationDelay: '0.4s' }}>Esperienze</span>
            </span>
            <span className="title-line accent">
              <span className="title-word" style={{ animationDelay: '0.6s' }}>Memorabili</span>
              <span className="title-accent-dot" />
            </span>
          </h1>

          <p className="hero-subtitle">
            Siamo un collettivo di designer, sviluppatori e strateghi
            che trasformano le visioni in realtà digitali straordinarie.
          </p>

          <div className="hero-cta">
            <button className="cta-primary">
              <span>Inizia un Progetto</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="cta-secondary">
              <span>Scopri i Lavori</span>
            </button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">150+</span>
            <span className="stat-label">Progetti</span>
          </div>
          <div className="stat">
            <span className="stat-num">8</span>
            <span className="stat-label">Anni</span>
          </div>
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Passione</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servizi" className="services">
        <div className="section-header">
          <span className="section-tag">Cosa Facciamo</span>
          <h2 className="section-title">
            Servizi<span className="title-outline"> Eccellenti</span>
          </h2>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div key={i} className="service-card">
              <span className="service-num">{service.num}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="progetti" className="projects">
        <div className="section-header">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">
            Progetti<span className="title-outline"> Selezionati</span>
          </h2>
        </div>

        <div className="projects-list">
          {projects.map((project, i) => (
            <div key={i} className="project-item">
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3 className="project-name">{project.name}</h3>
              </div>
              <div className="project-meta">
                <span className="project-year">{project.year}</span>
                <div className="project-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="project-line" />
            </div>
          ))}
        </div>

        <button className="view-all-btn">
          <span>Vedi Tutti i Progetti</span>
          <div className="btn-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </section>

      {/* About Section */}
      <section id="chi-siamo" className="about">
        <div className="about-content">
          <div className="about-left">
            <span className="section-tag">Chi Siamo</span>
            <h2 className="about-title">
              Un team di <em>visionari</em> con base a Milano
            </h2>
          </div>
          <div className="about-right">
            <p className="about-text">
              Siamo più di un'agenzia. Siamo partner creativi che credono nel potere
              del design per trasformare i business. Dal 2016, abbiamo aiutato brand
              italiani e internazionali a distinguersi nel panorama digitale.
            </p>
            <p className="about-text">
              Il nostro approccio combina strategia, creatività e tecnologia
              per creare soluzioni che non solo appaiono straordinarie,
              ma generano risultati concreti.
            </p>
            <div className="about-awards">
              <div className="award">
                <span className="award-icon">★</span>
                <span>Awwwards SOTD</span>
              </div>
              <div className="award">
                <span className="award-icon">★</span>
                <span>CSS Design Awards</span>
              </div>
              <div className="award">
                <span className="award-icon">★</span>
                <span>FWA Nominee</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-marquee">
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="marquee-text">
                CREATIVITÀ • INNOVAZIONE • ECCELLENZA • PASSIONE •
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contatti" className="contact">
        <div className="contact-content">
          <span className="section-tag">Contatti</span>
          <h2 className="contact-title">
            Hai un progetto<br />in mente?
          </h2>
          <a href="mailto:ciao@diverso.studio" className="contact-email">
            ciao@diverso.studio
          </a>
          <div className="contact-details">
            <div className="contact-block">
              <span className="contact-label">Indirizzo</span>
              <p>Via Tortona 27<br />20144 Milano, Italia</p>
            </div>
            <div className="contact-block">
              <span className="contact-label">Social</span>
              <div className="social-links">
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
                <a href="#">Behance</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-logo">DIVERSO<span>.</span></div>
          <p className="footer-tagline">Creiamo il futuro, un pixel alla volta.</p>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Diverso Studio. Tutti i diritti riservati.</p>
          <p className="footer-credit">Requested by <a href="https://twitter.com/VladVrince" target="_blank" rel="noopener noreferrer">@VladVrince</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a></p>
        </div>
      </footer>
    </div>
  )
}

export default App
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, ShieldCheck, Truck, 
  ChevronDown, Star, ArrowRight, Instagram, Mail, X, Trash2, PlayCircle, Quote,
  Gift, Clock, Shield, MapPin, 
  CreditCard, CheckCircle, QrCode, Settings, ChevronLeft, ChevronRight, UploadCloud, Image as ImageIcon,
  Menu, Lock
} from 'lucide-react';

// ==========================================
// MOCK DATA INICIAL
// ==========================================
const PRODUTOS_INICIAIS = [
  { 
    id: 1, nome: "Abstrato em Ouro Metálico", preco: 890.00, estoque: 5, 
    imagem: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    imagens: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    tag: "Mais Vendido" 
  },
  { 
    id: 2, nome: "Minimalismo Geométrico", preco: 650.00, estoque: 12, 
    imagem: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    imagens: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    tag: "Lançamento" 
  },
  { 
    id: 3, nome: "Textura Escandinava", preco: 1200.00, estoque: 2, 
    imagem: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    imagens: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    tag: "Premium" 
  }
];

const DEPOIMENTOS = [
  { id: 1, nome: "Carolina Mendes", papel: "Arquiteta de Interiores", texto: "Os quadros da Lumina Art elevaram o nível dos meus projetos. A qualidade da impressão é impecável.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, nome: "Roberto Almeida", papel: "Cliente Verificado", texto: "Comprei o 'Minimalismo Geométrico' para meu escritório e superou todas as expectativas. Recomendo muito!", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, nome: "Juliana Silva", papel: "Decoradora", texto: "A textura da tela canvas dá uma sensação de pintura original maravilhosa. Recomendo de olhos fechados.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
];

const FAQS = [
  { pergunta: "Como os quadros são embalados para não quebrar?", resposta: "Utilizamos embalagem blindada com plástico bolha de alta densidade e cantoneiras rígidas." },
  { pergunta: "A cor do quadro é exatamente como na tela?", resposta: "Sim! Nossas impressões possuem fidelidade de 99% às cores originais, calibradas com equipamentos de ponta." },
  { pergunta: "Qual é o prazo de entrega?", resposta: "Produzimos e enviamos sua obra em até 5 dias úteis. O tempo de transporte varia conforme o seu CEP." }
];

const formatarPreco = (valor) => Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatarParcela = (valor) => `12x de ${(Number(valor || 0) / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

const rolarParaProdutos = () => { 
  const el = document.getElementById('sessao-produtos');
  if(el) {
    const yOffset = -70; 
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  }
};

// ==========================================
// COMPONENTE: TELA DE LOGIN DO ADMINISTRADOR
// ==========================================
const AdminLogin = ({ onLogin, onCancel }) => {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === "1234567") {
      onLogin();
    } else {
      setErro(true);
      setSenha("");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card glow-wrapper">
        <div className="glow-inner" style={{ padding: 'clamp(30px, 5vw, 40px)', textAlign: 'center' }}>
          <Lock size={48} color="var(--terracota)" style={{ marginBottom: '16px' }} />
          <h2 style={{ marginBottom: '8px', color: 'var(--text-dark)', fontSize: '24px' }}>Acesso Restrito</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>Digite a senha para acessar o painel</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input 
                type="password" 
                value={senha}
                onChange={(e) => { setSenha(e.target.value); setErro(false); }}
                placeholder="********"
                className="fake-input"
                style={{ textAlign: 'center', fontSize: '18px', letterSpacing: '4px' }}
                autoFocus
              />
              {erro && <p style={{ color: '#C05A46', fontSize: '13px', marginTop: '8px', fontWeight: '500' }}>Senha incorreta. Tente novamente.</p>}
            </div>
            
            <button type="submit" className="btn-primary-large" style={{ width: '100%', padding: '12px' }}>Entrar</button>
            <button type="button" className="btn-outline" onClick={onCancel} style={{ width: '100%', padding: '12px' }}>Voltar para a Loja</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE: ÁREA DO ADMINISTRADOR
// ==========================================
const AdminArea = ({ produtos, setProdutos, setModoVisualizacao, onLogout }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.match('image.*')) {
      alert("Por favor, envie apenas arquivos de imagem (JPG, PNG).");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const novoProduto = {
        id: Date.now(),
        nome: "Nome da Nova Obra",
        preco: 199.90,
        estoque: 1,
        imagem: reader.result, 
        imagens: [reader.result],
        tag: "Novo"
      };
      setProdutos([novoProduto, ...produtos]);
    };
    reader.readAsDataURL(file);
  };

  const atualizarProduto = (id, campo, valor) => {
    setProdutos(produtos.map(p => p.id === id ? { ...p, [campo]: valor } : p));
  };

  const removerProduto = (id) => {
    if(window.confirm("Certeza que deseja remover esta obra da galeria?")) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <div className="lp-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Painel de <span>Administração</span></h2>
          <button className="btn-outline" style={{ borderColor: '#FFF', color: '#FFF' }} onClick={() => { setModoVisualizacao('loja'); onLogout(); }}>
            <ArrowRight size={18} style={{marginRight: '8px'}} className="desk-only" /> Sair
          </button>
        </div>
      </div>

      <div className="lp-container admin-body">
        <div className="admin-section">
          <h3>Adicionar Nova Obra</h3>
          <div 
            className={`dropzone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
            <UploadCloud size={48} color={dragActive ? "var(--terracota)" : "var(--text-muted)"} />
            <p>{dragActive ? "Solte a imagem aqui!" : "Arraste uma imagem para cá ou clique para fazer upload"}</p>
          </div>
        </div>

        <div className="admin-section">
          <h3>Obras na Galeria ({produtos.length})</h3>
          <div className="admin-products-grid">
            {produtos.map(p => (
              <div key={p.id} className="admin-product-card">
                <div className="admin-card-img" style={{ backgroundImage: `url(${p.imagem})` }}>
                  <button className="btn-delete" onClick={() => removerProduto(p.id)}><Trash2 size={16}/></button>
                </div>
                <div className="admin-card-content">
                  <div className="form-group">
                    <label>Nome da Obra</label>
                    <input type="text" value={p.nome} onChange={(e) => atualizarProduto(p.id, 'nome', e.target.value)} />
                  </div>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Preço (R$)</label>
                      <input type="number" step="0.01" value={p.preco} onChange={(e) => atualizarProduto(p.id, 'preco', Number(e.target.value))} />
                    </div>
                    <div className="form-group">
                      <label>Estoque</label>
                      <input type="number" value={p.estoque} onChange={(e) => atualizarProduto(p.id, 'estoque', Number(e.target.value))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Tag Promocional (Opcional)</label>
                    <input type="text" value={p.tag || ""} placeholder="Ex: Mais Vendido" onChange={(e) => atualizarProduto(p.id, 'tag', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SUBCOMPONENTES DA LOJA
// ==========================================
const Header = ({ qtdCarrinho, abrirCarrinho, abrirSobreMim }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMobileNav = (action) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="lp-header">
      <div className="lp-container header-content">
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <h1 className="logo">Lumina<span>Art</span></h1>
        
        <nav className="header-nav desk-only">
          <button onClick={abrirSobreMim} className="btn-link-nav">Sobre mim</button>
          <span className="nav-divider">|</span>
          <a href="mailto:contato@LuminaArt.com">e-mail contato@LuminaArt.com</a>
          <span className="nav-divider">|</span>
          <a href="https://wa.me/5571987772415" target="_blank" rel="noreferrer">cell 71 98777-2415</a>
        </nav>

        <div className="header-actions">
          <button className="btn-outline header-btn-desk desk-only" onClick={rolarParaProdutos}>Ver Coleção</button>
          <div className="cart-icon-wrapper" onClick={abrirCarrinho}>
            <ShoppingCart size={24} color="#2D2B2A" />
            {qtdCarrinho > 0 && <span className="cart-badge">{qtdCarrinho}</span>}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-nav-menu">
          <button onClick={() => handleMobileNav(abrirSobreMim)} className="btn-link-nav" style={{fontSize: '18px'}}>Sobre mim</button>
          <a href="mailto:contato@LuminaArt.com" onClick={() => setIsMobileMenuOpen(false)}>📧 contato@LuminaArt.com</a>
          <a href="https://wa.me/5571987772415" target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)}>📱 71 98777-2415</a>
          <button className="btn-primary-large w-100" onClick={() => handleMobileNav(rolarParaProdutos)} style={{padding: '12px', marginTop: '10px'}}>
            Ver Coleção
          </button>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section className="hero-section">
    <div className="hero-bg-image"></div>
    <div className="hero-overlay"></div>
    <div className="lp-container hero-content">
      <h2 className="hero-title">A Arte que Transforma o Seu Ambiente</h2>
      <p className="hero-subtitle">
        Quadros decorativos em canvas com qualidade de museu e acabamento premium para lares sofisticados.
      </p>
      <div className="hero-cta-group">
        <button className="btn-primary-large" onClick={rolarParaProdutos}>
          Garantir Meu Quadro <ArrowRight size={20} />
        </button>
        <p className="safe-checkout"><ShieldCheck size={16} /> Compra 100% Segura</p>
      </div>
    </div>
  </section>
);

const ShowcaseMedia = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <div className="showcase-container">
      <section className="showcase-section">
        <div className="lp-container showcase-grid">
          <div className="showcase-content">
            <h2 className="showcase-title">Mais do que decoração, <br className="desk-only"/><span className="gold-text">uma experiência.</span></h2>
            <p className="showcase-description">Nossas obras são pensadas para se tornarem o centro das atenções do seu ambiente.</p>
            <ul className="benefits-list">
              <li><ShieldCheck size={24} color="#C05A46" className="shrink-0" /> <span>Design exclusivo e autoral</span></li>
              <li><Truck size={24} color="#C05A46" className="shrink-0" /> <span>Envio garantido e rastreado</span></li>
              <li><Star size={24} color="#C05A46" className="shrink-0" /> <span>Acabamento artesanal feito à mão</span></li>
            </ul>
          </div>
          <div className="showcase-media-wrapper" onClick={() => setIsVideoOpen(true)}>
            <img src="https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Quadro em ambiente" className="showcase-image"/>
            <div className="play-overlay"><PlayCircle size={72} color="white" strokeWidth={1.5} /></div>
          </div>
        </div>
      </section>
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <button className="btn-close-video" onClick={() => setIsVideoOpen(false)}>
            <X size={32} color="white" />
          </button>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls autoPlay className="real-video-player" />
          </div>
        </div>
      )}
    </div>
  );
};

const IrresistibleOffer = () => {
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { hours, minutes, seconds };
  };
  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <section className="offer-section">
      <div className="lp-container">
        <div className="glow-wrapper offer-card-margin">
          <div className="glow-inner offer-card-inner">
            <div className="offer-left">
              <div className="offer-badge"><Clock size={16} /> Oferta por Tempo Limitado</div>
              <h2 className="offer-title">Condição VIP de Lançamento</h2>
              <p className="offer-desc">Compre qualquer quadro hoje e leve um pacote de benefícios exclusivo.</p>
              <div className="countdown-timer">
                <div className="countdown-box"><span className="countdown-num">{String(hours).padStart(2, '0')}</span><span className="countdown-label">Horas</span></div><span className="countdown-separator">:</span>
                <div className="countdown-box"><span className="countdown-num">{String(minutes).padStart(2, '0')}</span><span className="countdown-label">Minutos</span></div><span className="countdown-separator">:</span>
                <div className="countdown-box"><span className="countdown-num">{String(seconds).padStart(2, '0')}</span><span className="countdown-label">Segundos</span></div>
              </div>
            </div>
            <div className="offer-right">
              <ul className="offer-benefits-list">
                <li><Truck size={24} color="#C05A46" className="shrink-0"/><div><strong>Frete Expresso Grátis</strong><span>Enviamos para todo o Brasil sem custo.</span></div></li>
                <li><Gift size={24} color="#C05A46" className="shrink-0"/><div><strong>Kit Instalação <span className="line-through">R$ 149,00</span> (Grátis)</strong><span>Gabarito e buchas de alta fixação.</span></div></li>
                <li><Shield size={24} color="#C05A46" className="shrink-0"/><div><strong>Garantia de 30 Dias</strong><span>Se não combinar, devolvemos seu dinheiro.</span></div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CardImageSlider = ({ produto }) => {
  const imagensLista = produto.imagens || [produto.imagem];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="product-image-wrapper">
      {produto.tag && <span className="product-tag">{produto.tag}</span>}
      <img src={imagensLista[currentIndex]} alt={produto.nome} className="product-image" loading="lazy" draggable="false" />
      {imagensLista.length > 1 && (
        <div className="slider-controls">
          <div className="inner-slider-dots">
            {imagensLista.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`} 
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setCurrentIndex(idx); }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductGallery = ({ produtos, adicionarAoCarrinho }) => {
  const carouselRef = useRef(null);

  return (
    <section id="sessao-produtos" className="gallery-section">
      <div className="carousel-outer-container">
        <h2 className="section-title">Obras Mais Desejadas</h2>
        {produtos.length === 0 ? (
          <p className="text-center text-muted">Nenhum produto cadastrado no momento.</p>
        ) : (
          <div className="carousel-wrapper">
            <div className="products-slider" ref={carouselRef}>
              {produtos.map(produto => (
                <div key={produto.id} className="product-card glow-wrapper">
                  <div className="glow-inner card-inner-flex">
                    <CardImageSlider produto={produto} />
                    <div className="product-info">
                      <div className="stars">
                        <Star size={16} fill="#C05A46" color="#C05A46"/><Star size={16} fill="#C05A46" color="#C05A46"/><Star size={16} fill="#C05A46" color="#C05A46"/><Star size={16} fill="#C05A46" color="#C05A46"/><Star size={16} fill="#C05A46" color="#C05A46"/>
                      </div>
                      <h3 className="product-name">{produto.nome}</h3>
                      <p className="product-price">{formatarPreco(produto.preco)}</p>
                      <p className="product-installments">{formatarParcela(produto.preco)}</p>
                      <p className={`estoque-texto ${produto.estoque > 0 ? 'em-estoque' : 'esgotado'}`}>
                        {produto.estoque > 0 ? `${produto.estoque} em estoque` : 'Esgotado'}
                      </p>
                      <button className="btn-buy" onClick={() => adicionarAoCarrinho(produto)} disabled={produto.estoque <= 0}>
                        <ShoppingCart size={18} /> {produto.estoque > 0 ? 'Adicionar ao Carrinho' : 'Sem Estoque'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// COMPONENTE OTIMIZADO DE DEPOIMENTOS
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // ESTADO PARA PAUSAR ANIMAÇÃO

  useEffect(() => {
    if (isHovered) return; // Pausa o loop se o mouse estiver em cima
    
    const interval = setInterval(() => { 
      setCurrentIndex((prevIndex) => (prevIndex + 1) % DEPOIMENTOS.length); 
    }, 4000); // 4 segundos
    
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextTestimonial = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % DEPOIMENTOS.length);
  const prevTestimonial = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? DEPOIMENTOS.length - 1 : prevIndex - 1));
  const depoimentoAtual = DEPOIMENTOS[currentIndex];

  return (
    <section className="testimonials-section">
      <div className="lp-container">
        <div className="testimonials-header">
          <h2 className="section-title">Aprovado por quem exige o melhor</h2>
          <div className="trust-badge-header">
            <div className="stars justify-center">
              <Star size={24} fill="#C05A46" color="#C05A46"/><Star size={24} fill="#C05A46" color="#C05A46"/><Star size={24} fill="#C05A46" color="#C05A46"/><Star size={24} fill="#C05A46" color="#C05A46"/><Star size={24} fill="#C05A46" color="#C05A46"/>
            </div>
            <p>Classificação <strong>4.9/5</strong> baseada em +500 clientes.</p>
          </div>
        </div>
        
        <div 
          className="carousel-wrapper testimonial-carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button className="carousel-btn prev-btn force-flex desk-only" onClick={prevTestimonial}><ChevronLeft size={24} /></button>
          <div className="testimonial-single-wrapper">
            <div className="testimonial-card glow-wrapper">
              <div className="glow-inner testimonial-inner">
                <Quote size={32} color="rgba(192, 90, 70, 0.1)" className="quote-icon" />
                <div className="stars mb-4">
                  <Star size={14} fill="#C05A46" color="#C05A46"/><Star size={14} fill="#C05A46" color="#C05A46"/><Star size={14} fill="#C05A46" color="#C05A46"/><Star size={14} fill="#C05A46" color="#C05A46"/><Star size={14} fill="#C05A46" color="#C05A46"/>
                </div>
                <p className="testimonial-text">"{depoimentoAtual.texto}"</p>
                <div className="testimonial-author">
                  <img src={depoimentoAtual.avatar} alt={depoimentoAtual.nome} className="author-avatar" />
                  <div><h4 className="author-name">{depoimentoAtual.nome}</h4><p className="author-role">{depoimentoAtual.papel}</p></div>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-btn next-btn force-flex desk-only" onClick={nextTestimonial}><ChevronRight size={24} /></button>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);
  return (
    <section className="faq-section">
      <div className="lp-container faq-container">
        <h2 className="section-title">Dúvidas Frequentes</h2>
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
              <div className="faq-question"><h4>{faq.pergunta}</h4><ChevronDown size={20} className="faq-icon" /></div>
              <div className="faq-answer"><p>{faq.resposta}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// MODAL MÁGICO SOBRE MIM
// ==========================================
const SobreMimModal = ({ fecharModal }) => (
  <div className="cart-overlay" style={{ justifyContent: 'center', alignItems: 'center' }} onClick={fecharModal}>
    <div className="glow-wrapper modal-sobre-mim-wrapper" onClick={e => e.stopPropagation()}>
      <div className="glow-inner" style={{ padding: 'clamp(20px, 5vw, 40px)', position: 'relative', textAlign: 'center' }}>
        <button className="btn-close-cart" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={fecharModal}>
          <X size={24} color="#2D2B2A" />
        </button>
        
        <h2 className="section-title" style={{ marginBottom: '20px', fontSize: 'clamp(24px, 5vw, 32px)' }}>Sobre a Lumina Art</h2>
        
        <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          Nascida da paixão por transformar ambientes, a Lumina Art busca trazer exclusividade e sofisticação para o seu lar. Curadoria minuciosa, materiais de alta durabilidade e amor pela arte definem cada peça que entregamos.
        </p>
        
        <img 
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Ambiente Lumina Art" 
          className="modal-sobre-img"
        />
      </div>
    </div>
  </div>
);

const Footer = ({ setModoVisualizacao, abrirSobreMim }) => (
  <footer className="lp-footer">
    <div className="lp-container footer-content">
      <div className="footer-brand"><h2>Lumina<span>Art</span></h2><p>Elevando o padrão da decoração.</p></div>
      <div className="footer-links">
        <button onClick={abrirSobreMim} className="btn-link-footer">Sobre mim</button>
        <a href="mailto:contato@LuminaArt.com"><Mail size={18} /> E-mail</a>
        <a href="https://wa.me/5571987772415" target="_blank" rel="noreferrer">📱 WhatsApp</a>
      </div>
    </div>
    <div className="lp-container footer-bottom">
      <p>@Direitos reservados MarcosSoftwareEngineering_ | <a href="https://www.marvinsitbilders.com/" target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'underline'}}>https://www.marvinsitbilders.com/</a></p>
      <button className="admin-btn-link" onClick={() => setModoVisualizacao('admin')}>
        <Settings size={14} /> Área do Administrador
      </button>
    </div>
  </footer>
);

export default function LandingPageQuadros() {
  const [modoVisualizacao, setModoVisualizacao] = useState('loja'); 
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); 

  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem('lumina_produtos');
    return produtosSalvos ? JSON.parse(produtosSalvos) : PRODUTOS_INICIAIS; 
  });

  useEffect(() => { localStorage.setItem('lumina_produtos', JSON.stringify(produtos)); }, [produtos]);

  const [carrinho, setCarrinho] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSobreOpen, setIsSobreOpen] = useState(false); 
  const [checkoutStep, setCheckoutStep] = useState(0); 

  const adicionarAoCarrinho = (produto) => {
    if (produto.estoque <= 0) return; 
    setCarrinho(prev => {
      const existe = prev.find(item => item.id === produto.id);
      if (existe) {
        if(existe.qtde >= produto.estoque) { alert("Limite de estoque atingido."); return prev; }
        return prev.map(item => item.id === produto.id ? { ...item, qtde: item.qtde + 1 } : item);
      }
      return [...prev, { ...produto, qtde: 1 }];
    });
    setCheckoutStep(0); 
    setIsCartOpen(true);
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
    if (carrinho.length === 1) setCheckoutStep(0); 
  };

  const fecharCarrinho = () => {
    setIsCartOpen(false);
    if(checkoutStep === 3) setCarrinho([]); 
    setTimeout(() => setCheckoutStep(0), 300); 
  };

  const totalCarrinho = carrinho.reduce((acc, item) => acc + (item.preco * item.qtde), 0);
  const quantidadeItens = carrinho.reduce((acc, item) => acc + item.qtde, 0);

  return (
    <div className="landing-page-wrapper">
      {modoVisualizacao === 'admin' ? (
        isAdminAuthenticated ? (
          <AdminArea 
            produtos={produtos} 
            setProdutos={setProdutos} 
            setModoVisualizacao={setModoVisualizacao} 
            onLogout={() => setIsAdminAuthenticated(false)} 
          />
        ) : (
          <AdminLogin 
            onLogin={() => setIsAdminAuthenticated(true)} 
            onCancel={() => setModoVisualizacao('loja')} 
          />
        )
      ) : (
        <div className="main-content-wrapper">
          <Header 
            qtdCarrinho={quantidadeItens} 
            abrirCarrinho={() => setIsCartOpen(true)} 
            abrirSobreMim={() => setIsSobreOpen(true)} 
          />
          <main>
            <Hero />
            <ShowcaseMedia />
            <IrresistibleOffer />
            <ProductGallery produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho} />
            <Testimonials />
            <FAQ />
          </main>
          <Footer 
            setModoVisualizacao={setModoVisualizacao} 
            abrirSobreMim={() => setIsSobreOpen(true)}
          />
        </div>
      )}

      {isSobreOpen && modoVisualizacao === 'loja' && (
        <SobreMimModal fecharModal={() => setIsSobreOpen(false)} />
      )}

      {isCartOpen && modoVisualizacao === 'loja' && (
        <div className="cart-overlay" onClick={fecharCarrinho}>
          <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>
                {checkoutStep === 0 ? `Seu Carrinho (${quantidadeItens})` : 
                 checkoutStep === 1 ? 'Pagamento Seguro' : 'Pedido Confirmado'}
              </h2>
              <button className="btn-close-cart" onClick={fecharCarrinho}><X size={24} color="#2D2B2A" /></button>
            </div>
            
            <div className="cart-body">
              {checkoutStep === 0 && (
                carrinho.length === 0 ? (
                  <div className="cart-empty">
                    <ShoppingCart size={48} color="#858078" />
                    <p style={{marginTop: '16px', color: 'var(--text-muted)'}}>Seu carrinho está vazio.</p>
                  </div>
                ) : (
                  <div className="cart-items-list">
                    {carrinho.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={(item.imagens && item.imagens.length > 0) ? item.imagens[0] : item.imagem} alt={item.nome} className="cart-item-img" />
                        <div className="cart-item-info">
                          <h4>{item.nome}</h4>
                          <p className="cart-item-price">{formatarPreco(item.preco)}</p>
                          <p className="cart-item-qty">Qtd: {item.qtde}</p>
                        </div>
                        <button className="btn-remove-item" onClick={() => removerDoCarrinho(item.id)}><Trash2 size={18} color="#C05A46" /></button>
                      </div>
                    ))}
                  </div>
                )
              )}

              {checkoutStep === 1 && (
                <div className="checkout-simulation">
                  <p className="checkout-total-display">Total a pagar: <strong>{formatarPreco(totalCarrinho)}</strong></p>
                  <div className="payment-methods">
                    <label className="payment-method-card">
                      <input type="radio" name="payment" defaultChecked />
                      <div className="payment-method-content">
                        <QrCode size={24} color="var(--terracota)" />
                        <div><strong>Pix</strong><span>Aprovação imediata (5% de desconto)</span></div>
                      </div>
                    </label>
                    <label className="payment-method-card">
                      <input type="radio" name="payment" />
                      <div className="payment-method-content">
                        <CreditCard size={24} color="var(--terracota)" />
                        <div><strong>Cartão de Crédito</strong><span>Até 12x sem juros</span></div>
                      </div>
                    </label>
                  </div>
                  <div className="fake-form">
                    <input type="text" placeholder="Nome Impresso no Cartão" className="fake-input" />
                    <input type="text" placeholder="Número do Cartão" className="fake-input" />
                    <div style={{display: 'flex', gap: '10px'}}>
                      <input type="text" placeholder="Validade (MM/AA)" className="fake-input" />
                      <input type="text" placeholder="CVV" className="fake-input" />
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 2 && (
                <div className="checkout-success">
                  <CheckCircle size={64} color="#5b6b4e" />
                  <h3>Pagamento Aprovado!</h3>
                  <p>Seu pedido foi confirmado e já está sendo preparado para o envio.</p>
                  <p className="order-number">Pedido: #LM-{Math.floor(Math.random() * 10000)}</p>
                </div>
              )}
            </div>

            <div className="cart-footer">
              {checkoutStep === 0 && carrinho.length > 0 && (
                <div className="cart-footer-actions">
                  <div className="cart-total"><span>Total:</span><span>{formatarPreco(totalCarrinho)}</span></div>
                  <button className="btn-primary-large w-100" onClick={() => setCheckoutStep(1)}>Finalizar Compra Segura</button>
                </div>
              )}
              {checkoutStep === 1 && (
                <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
                  <button className="btn-primary-large w-100" onClick={() => setCheckoutStep(2)}><ShieldCheck size={20} /> Confirmar Pagamento</button>
                  <button className="btn-outline w-100" onClick={() => setCheckoutStep(0)}>Voltar ao Carrinho</button>
                </div>
              )}
              {checkoutStep === 2 && (
                <button className="btn-primary-large w-100" onClick={fecharCarrinho}>Continuar Navegando</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CSS GLOBAL RESPONSIVO DO PROJETO - OTIMIZADO                              */}
      {/* ========================================================================= */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 1. RESET E VARIÁVEIS BASE */
        #root { max-width: 100% !important; width: 100% !important; margin: 0 !important; padding: 0 !important; display: block !important; text-align: left !important; }
        :root { --terracota: #c05a46; --terracota-hover: #a34a38; --olive: #5b6b4e; --beige-bg: #f4f0ea; --ivory-bg: #faf9f6; --text-dark: #2d2b2a; --text-muted: #858078; --border-light: rgba(45, 43, 42, 0.1); }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        html, body { overflow-x: hidden; width: 100%; max-width: 100vw; background-color: var(--beige-bg); scroll-behavior: smooth; }
        .landing-page-wrapper { color: var(--text-dark); width: 100%; overflow-x: hidden; display: block; }
        .lp-container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 24px); width: 100%; }

        .text-center { text-align: center; } .text-muted { color: var(--text-muted); } .justify-center { justify-content: center; } .mb-4 { margin-bottom: 16px; } .shrink-0 { flex-shrink: 0; } .w-100 { width: 100%; } .gold-text { color: var(--terracota); } .line-through { text-decoration: line-through; font-size: 12px; color: var(--text-muted); }

        /* HEADER E NAVEGAÇÃO BÁSICA */
        .btn-link-nav { background: none; border: none; font-size: 14px; font-weight: 500; color: var(--text-dark); cursor: pointer; transition: 0.3s; padding: 0; font-family: inherit; }
        .btn-link-nav:hover { color: var(--terracota); }
        .btn-link-footer { background: none; border: none; font-size: 16px; color: #FFF; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: color 0.2s; font-family: inherit; }
        .btn-link-footer:hover { color: var(--terracota); }

        .lp-header { background: rgba(250, 249, 246, 0.95); backdrop-filter: blur(10px); position: fixed; top: 0; left: 0; width: 100%; z-index: 100; border-bottom: 1px solid var(--border-light); }
        .header-content { display: flex; justify-content: space-between; align-items: center; height: 70px; }
        .logo { font-size: clamp(20px, 5vw, 26px); font-weight: 800; color: var(--text-dark); } .logo span { color: var(--terracota); }
        
        .header-nav { display: flex; gap: 12px; align-items: center; font-size: 14px; font-weight: 500; }
        .header-nav a { color: var(--text-dark); text-decoration: none; transition: 0.3s; }
        .header-nav a:hover { color: var(--terracota); }
        .nav-divider { color: #ccc; }

        .header-actions { display: flex; align-items: center; gap: 20px; }
        .cart-icon-wrapper { position: relative; cursor: pointer; display: flex; align-items: center; }
        .cart-badge { position: absolute; top: -8px; right: -10px; background: var(--terracota); color: #FFF; font-size: 11px; font-weight: bold; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }

        /* MENU MOBILE (INICIALMENTE ESCONDIDO) */
        .mobile-menu-btn { display: none; background: none; border: none; color: var(--text-dark); cursor: pointer; padding: 4px; }
        .mobile-nav-menu { position: absolute; top: 70px; left: 0; width: 100%; background: var(--ivory-bg); display: flex; flex-direction: column; padding: 24px; gap: 16px; border-bottom: 1px solid var(--border-light); box-shadow: 0 10px 20px rgba(0,0,0,0.05); z-index: 99; animation: slideDown 0.3s ease-out; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .mobile-nav-menu a { font-size: 16px; font-weight: 500; color: var(--text-dark); text-decoration: none; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.05);}
        .mobile-nav-menu .btn-link-nav { text-align: left; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }

        /* ANIMAÇÕES */
        @keyframes moverCoresGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes vibrarSutil { 0% { transform: translate(0, 0); } 25% { transform: translate(0.3px, 0.3px); } 50% { transform: translate(-0.3px, -0.3px); } 75% { transform: translate(0.3px, -0.3px); } 100% { transform: translate(0, 0); } }

        /* BOTÕES GERAIS */
        .btn-primary-large {
          background: linear-gradient(270deg, var(--terracota), #df57df, #e1c070, var(--terracota));
          background-size: 400% 400%; color: #FFF; border: none; padding: clamp(14px, 3vw, 18px) clamp(24px, 5vw, 40px); font-size: clamp(16px, 4vw, 18px); font-weight: bold; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          animation: moverCoresGradient 8s ease infinite, vibrarSutil 0.8s ease-in-out infinite; transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary-large:hover:not(:disabled) { transform: scale(1.03) translateY(-2px); box-shadow: 0 8px 25px rgba(192, 90, 70, 0.4); }
        .btn-primary-large:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }

        .btn-outline { background: transparent; border: 1px solid var(--terracota); color: var(--terracota); padding: 8px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-outline:hover { background: var(--terracota); color: #fff; }

        .btn-buy { margin-top: auto; width: 100%; background: #fff; border: 1px solid var(--terracota); color: var(--terracota); padding: 14px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; animation: vibrarSutil 1s ease-in-out infinite; transition: all 0.3s; }
        .btn-buy:hover:not(:disabled) { background: linear-gradient(270deg, var(--terracota), #df57df, #e1c070, var(--terracota)); background-size: 400% 400%; border-color: transparent; color: #FFF; animation: moverCoresGradient 4s ease infinite, vibrarSutil 0.4s ease-in-out infinite; }
        .btn-buy:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }

        /* HERO SECTION */
        @keyframes panBackground { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .hero-section { position: relative; padding: clamp(100px, 18vh, 180px) 0 clamp(60px, 10vh, 100px); text-align: center; background: var(--text-dark); overflow: hidden; }
        .hero-bg-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat; animation: panBackground 20s ease-in-out infinite; z-index: 0; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(45,43,42,0.4), rgba(45,43,42,0.8)); z-index: 1; }
        .hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; padding: 0 16px; }
        .hero-title { font-size: clamp(28px, 6vw, 56px); line-height: 1.2; margin-bottom: 20px; font-weight: 800; max-width: 900px; color: #FFF; }
        .hero-subtitle { font-size: clamp(14px, 4vw, 20px); color: rgba(255,255,255,0.8); margin-bottom: 40px; line-height: 1.5; max-width: 600px; }
        .safe-checkout { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px; font-size: 14px; color: rgba(255,255,255,0.6); }

        /* SHOWCASE */
        .showcase-section { padding: clamp(50px, 8vh, 100px) 0; background: var(--ivory-bg); border-top: 1px solid var(--border-light); }
        .showcase-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(30px, 6vw, 80px); align-items: center; }
        .showcase-title { font-size: clamp(28px, 5vw, 42px); margin-bottom: 20px; line-height: 1.2; color: var(--text-dark); }
        .showcase-description { font-size: clamp(16px, 3vw, 18px); color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; }
        .benefits-list { display: flex; flex-direction: column; gap: 16px; list-style: none; }
        .benefits-list li { display: flex; align-items: center; gap: 16px; font-size: clamp(14px, 3vw, 16px); font-weight: 500; color: var(--text-dark); }
        .showcase-media-wrapper { border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; box-shadow: 0 20px 40px rgba(0,0,0,0.1); width: 100%; max-width: 600px; margin: 0 auto; }
        .showcase-image { width: 100%; display: block; object-fit: cover; aspect-ratio: 4/3; }
        .play-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; }

        /* VÍDEO MODAL RESPONSIVO */
        .video-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .btn-close-video { position: absolute; top: clamp(10px, 3vw, 24px); right: clamp(10px, 3vw, 32px); background: transparent; border: none; cursor: pointer; transition: transform 0.3s; z-index: 10000; }
        .btn-close-video:hover { transform: scale(1.2); }
        .video-modal-content { width: 100%; max-width: 1000px; aspect-ratio: 16/9; background: #000; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); display: flex; }
        .real-video-player { width: 100%; height: 100%; object-fit: cover; outline: none; }

        /* OFERTA COM GLOW BORDER - OTIMIZADO PARA NÃO CAUSAR LOOP DE GPU */
        .offer-section { padding: clamp(40px, 6vw, 60px) 0; background: var(--beige-bg); }
        .glow-wrapper { position: relative; padding: 2px; border-radius: 18px; z-index: 1; display: flex; flex-direction: column; width: 100%; transition: transform 0.3s ease; }
        .offer-card-margin { margin: 10px auto; max-width: 1000px; }

        .glow-wrapper::before { 
          content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
          border-radius: 18px; 
          background: linear-gradient(45deg, var(--terracota), #e1c070, var(--terracota)); 
          z-index: -2; 
        }
        .glow-wrapper::after { 
          content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; 
          border-radius: 20px; 
          background: transparent; 
          box-shadow: 0 0 15px rgba(192, 90, 70, 0.3); 
          z-index: -2; 
          transition: box-shadow 0.3s ease;
        }
        .glow-wrapper:hover::after { box-shadow: 0 0 25px rgba(192, 90, 70, 0.6); } 
        .glow-inner { background: #FFF; border-radius: 16px; position: relative; z-index: 1; width: 100%; height: 100%; }
        .card-inner-flex { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        .offer-card-inner { padding: clamp(24px, 5vw, 48px); display: grid; grid-template-columns: 1fr 1.5fr; gap: clamp(20px, 5vw, 40px); align-items: center; }
        .offer-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(192, 90, 70, 0.1); color: var(--terracota); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
        .offer-title { font-size: clamp(24px, 5vw, 36px); font-weight: bold; line-height: 1.2; margin-bottom: 12px; color: var(--text-dark); }
        .offer-desc { color: var(--text-muted); margin-bottom: 24px; line-height: 1.5; font-size: clamp(14px, 3vw, 16px); }
        .countdown-timer { display: flex; gap: clamp(8px, 2vw, 12px); align-items: center; flex-wrap: wrap; }
        .countdown-box { background: var(--ivory-bg); border: 1px solid var(--border-light); border-radius: 8px; padding: 10px 12px; text-align: center; min-width: 70px; flex: 1; }
        .countdown-num { display: block; font-size: clamp(20px, 4vw, 28px); font-weight: bold; color: var(--terracota); }
        .countdown-label { display: block; font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-top: 4px; }
        .countdown-separator { font-size: 24px; font-weight: bold; color: var(--text-muted); }
        
        .offer-benefits-list { display: flex; flex-direction: column; gap: 20px; list-style: none; }
        .offer-benefits-list li { display: flex; gap: 16px; align-items: flex-start;}
        .offer-benefits-list strong { display: block; font-size: clamp(16px, 3vw, 18px); margin-bottom: 4px; color: var(--text-dark); }
        .offer-benefits-list span { color: var(--text-muted); font-size: clamp(13px, 2.5vw, 15px); line-height: 1.4; }

        /* GALERIA DE PRODUTOS */
        .gallery-section { padding: clamp(40px, 8vw, 80px) 0; background: var(--ivory-bg); overflow: hidden; }
        .carousel-outer-container { max-width: 1400px; margin: 0 auto; padding: 0 16px; }
        .section-title { text-align: center; font-size: clamp(26px, 6vw, 36px); margin-bottom: clamp(24px, 5vw, 40px); font-weight: 800; color: var(--text-dark); }
        
        .products-slider { display: flex; gap: clamp(16px, 3vw, 28px); overflow-x: auto; scroll-behavior: smooth; scroll-snap-type: x mandatory; padding: 15px 5px 45px 5px; width: 100%; align-items: stretch; justify-content: flex-start; -webkit-overflow-scrolling: touch; }
        .products-slider::-webkit-scrollbar { height: 8px; display: block; }
        .products-slider::-webkit-scrollbar-track { background: rgba(45, 43, 42, 0.05); border-radius: 10px; margin: 0 20px; }
        .products-slider::-webkit-scrollbar-thumb { background: var(--terracota); border-radius: 10px; cursor: pointer; }
        
        .product-card { flex: 0 0 auto; width: clamp(260px, 80vw, 320px); scroll-snap-align: start; transition: transform 0.3s ease; }
        .product-card:hover { transform: translateY(-5px); }

        .product-image-wrapper { position: relative; height: clamp(280px, 60vw, 350px); overflow: hidden; flex-shrink: 0; cursor: pointer; border-radius: 16.5px 16.5px 0 0; }
        .product-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s; }
        .glow-wrapper:hover .product-image { transform: scale(1.05); }
        .product-tag { position: absolute; top: 16px; left: 16px; background: var(--olive); color: #FFF; padding: 4px 12px; font-size: 12px; font-weight: bold; border-radius: 6px; z-index: 10; }
        
        .inner-slider-dots { position: absolute; bottom: 12px; left: 0; width: 100%; display: flex; justify-content: center; gap: 5px; z-index: 20;}
        .inner-slider-dots .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); transition: 0.3s; cursor: pointer; }
        .inner-slider-dots .dot.active { background: #FFF; transform: scale(1.3); }

        .product-info { padding: clamp(20px, 4vw, 30px); flex: 1; display: flex; flex-direction: column; }
        .product-name { font-size: clamp(18px, 4vw, 20px); margin-bottom: 8px; color: var(--text-dark); font-weight: 600; }
        .product-price { font-size: clamp(20px, 5vw, 24px); font-weight: bold; color: var(--terracota); margin-bottom: 4px; }
        .product-installments { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }
        .estoque-texto { font-size: 12px; margin-bottom: 16px; }
        .em-estoque { color: var(--olive); } .esgotado { color: var(--terracota); }

        /* DEPOIMENTOS */
        .testimonials-section { padding: clamp(40px, 8vw, 80px) 0; background: var(--beige-bg); }
        .testimonial-carousel-container { max-width: 800px; margin: 30px auto 0; position: relative; padding: 0 clamp(10px, 5vw, 60px); }
        .testimonial-single-wrapper { width: 100%; max-width: 600px; margin: 0 auto; padding: 10px 0;}
        .testimonial-inner { padding: clamp(20px, 5vw, 30px); position: relative; display: flex; flex-direction: column; text-align: left; } 
        .quote-icon { position: absolute; top: 15px; right: 15px; opacity: 0.1; width: clamp(24px, 6vw, 32px); height: auto; }
        .testimonial-text { color: var(--text-dark); font-size: clamp(14px, 3vw, 16px); line-height: 1.6; font-style: italic; margin-bottom: 24px; }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .author-avatar { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid var(--terracota); }
        .author-name { font-size: 15px; font-weight: bold; margin-bottom: 2px; color: var(--text-dark); }
        .author-role { font-size: 12px; color: var(--terracota); }
        
        .carousel-btn { position: absolute; z-index: 10; top: calc(50% - 20px); background: #FFF; border: 1px solid var(--border-light); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--terracota); box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: 0.3s; }
        .carousel-btn:hover { background: var(--terracota); color: #FFF; border-color: var(--terracota); transform: scale(1.1); }
        .carousel-btn.prev-btn { left: 0px; } .carousel-btn.next-btn { right: 0px; }

        /* FAQ & FOOTER */
        .faq-section { padding: clamp(40px, 8vw, 80px) 0; background: var(--ivory-bg); border-top: 1px solid var(--border-light); }
        .faq-container { max-width: 800px; margin: 0 auto; }
        .faq-item { background: #FFF; border: 1px solid var(--border-light); border-radius: 8px; margin-bottom: 12px; overflow: hidden; cursor: pointer; transition: 0.3s; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .faq-question { padding: clamp(16px, 4vw, 24px); display: flex; justify-content: space-between; align-items: center; gap: 16px;}
        .faq-question h4 { font-size: clamp(15px, 3vw, 18px); font-weight: 500; color: var(--text-dark); line-height: 1.4;}
        .faq-icon { color: var(--terracota); transition: transform 0.3s; flex-shrink: 0; }
        .faq-item.active .faq-icon { transform: rotate(180deg); }
        .faq-answer { max-height: 0; padding: 0 24px; color: var(--text-muted); line-height: 1.6; transition: all 0.3s ease-out; font-size: clamp(14px, 3vw, 16px);}
        .faq-item.active .faq-answer { max-height: 300px; padding: 0 24px 24px; }

        /* FOOTER */
        .lp-footer { background: var(--olive); padding: clamp(40px, 8vw, 60px) 0 20px; color: #FFF; text-align: center; }
        .footer-content { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px; margin-bottom: 30px; }
        .footer-brand h2 { color: #FFF; font-size: 28px;} .footer-brand span { color: var(--beige-bg); } .footer-brand p { color: rgba(255,255,255,0.7); margin-top: 8px; font-size: 14px;}
        .footer-links { display: flex; justify-content: center; flex-wrap: wrap; gap: clamp(16px, 4vw, 24px); } .footer-links a { color: #FFF; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: color 0.2s; font-size: 15px;} .footer-links a:hover { color: var(--terracota); }
        .footer-bottom { display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); font-size: 13px; gap: 12px; text-align: center;}
        .admin-btn-link { background: none; border: none; color: rgba(255,255,255,0.6); cursor: pointer; display: flex; align-items: center; gap: 8px; }

        /* CARRINHO & MODAL SOBRE MIM */
        .cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 999; display: flex; justify-content: flex-end; }
        .cart-sidebar { width: 100%; max-width: 450px; background: var(--ivory-bg); height: 100%; display: flex; flex-direction: column; box-shadow: -10px 0 30px rgba(0,0,0,0.1); animation: slideLeft 0.3s ease-out; }
        @keyframes slideLeft { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .cart-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); }
        .cart-header h2 { color: var(--text-dark); font-size: 18px; } .btn-close-cart { background: none; border: none; cursor: pointer; color: var(--text-dark); }
        .cart-body { padding: 20px; flex-grow: 1; overflow-y: auto; }
        .cart-item { display: flex; gap: 12px; background: #FFF; padding: 10px; border-radius: 8px; margin-bottom: 12px; align-items: center; border: 1px solid var(--border-light); }
        .cart-item-img { width: 60px; height: 60px; border-radius: 6px; object-fit: cover; } .cart-item-info { flex-grow: 1; } .cart-item-info h4 { font-size: 13px; margin-bottom: 4px; color: var(--text-dark); } .cart-item-price { color: var(--terracota); font-weight: bold; margin-bottom: 4px; font-size: 14px;} .cart-item-qty { font-size: 12px; color: var(--text-muted); } .btn-remove-item { background: none; border: none; padding: 8px; cursor: pointer; }
        .cart-footer { padding: 20px; border-top: 1px solid var(--border-light); background: #FFF; }
        .cart-total { display: flex; justify-content: space-between; font-size: 20px; font-weight: bold; margin-bottom: 20px; color: var(--text-dark); }
        
        .modal-sobre-img { width: 100%; height: clamp(150px, 40vw, 250px); object-fit: cover; border-radius: 12px; margin-top: 24px; }
        .modal-sobre-mim-wrapper { width: 90%; max-width: 600px; margin: 20px; max-height: 90vh; overflow-y: auto; }
        .modal-sobre-mim-wrapper::-webkit-scrollbar { width: 6px; }
        .modal-sobre-mim-wrapper::-webkit-scrollbar-thumb { background: var(--terracota); border-radius: 4px; }

        /* CHECOUT FORM */
        .checkout-total-display { font-size: 16px; margin-bottom: 20px; text-align: center; background: rgba(192, 90, 70, 0.05); padding: 12px; border-radius: 8px; border: 1px dashed var(--terracota); color: var(--text-dark); }
        .payment-methods { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; } .payment-method-card { background: #FFF; border: 1px solid var(--border-light); border-radius: 8px; padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: 0.2s; } 
        .fake-form { display: flex; flex-direction: column; gap: 10px; } .fake-input { width: 100%; padding: 12px 14px; background: #FFF; border: 1px solid var(--border-light); border-radius: 6px; color: var(--text-dark); font-size: 14px; outline: none; }
        
        /* ==========================================
           TELA DE LOGIN E ÁREA DO ADMINISTRADOR
        ========================================== */
        .admin-login-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--beige-bg); padding: 20px; }
        .admin-login-card { width: 100%; max-width: 400px; }

        .admin-wrapper { min-height: 100vh; background: var(--beige-bg); padding-bottom: 60px; }
        .admin-header { background: var(--text-dark); padding: 24px 0; margin-bottom: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .admin-header h2 { color: #FFF; font-size: clamp(20px, 4vw, 28px); font-weight: 800; }
        .admin-header h2 span { color: var(--terracota); }
        .admin-header .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #FFF; color: #FFF; }
        
        .admin-body { display: flex; flex-direction: column; gap: 40px; }
        .admin-section { background: #FFF; padding: clamp(20px, 4vw, 40px); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
        .admin-section h3 { margin-bottom: 24px; font-size: 20px; color: var(--text-dark); border-bottom: 1px solid var(--border-light); padding-bottom: 12px; }
        
        .dropzone { border: 2px dashed var(--border-light); border-radius: 12px; padding: 40px 20px; text-align: center; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 16px; transition: all 0.3s ease; color: var(--text-muted); background: var(--ivory-bg); }
        .dropzone:hover, .dropzone.active { border-color: var(--terracota); background: rgba(192, 90, 70, 0.05); }
        
        .admin-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
        .admin-product-card { background: var(--ivory-bg); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-light); transition: 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
        .admin-product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.06); border-color: rgba(192, 90, 70, 0.3); }
        
        .admin-card-img { height: 180px; background-size: cover; background-position: center; position: relative; }
        .btn-delete { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.9); border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--terracota); box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: 0.3s; }
        .btn-delete:hover { background: var(--terracota); color: #FFF; transform: scale(1.1); }
        
        .admin-card-content { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group-row { display: flex; gap: 16px; }
        .form-group-row .form-group { flex: 1; }
        .form-group label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
        .form-group input { padding: 12px 16px; border: 1px solid var(--border-light); border-radius: 8px; font-size: 15px; color: var(--text-dark); background: #FFF; transition: 0.3s; outline: none; }
        .form-group input:focus { border-color: var(--terracota); box-shadow: 0 0 0 3px rgba(192, 90, 70, 0.1); }

        /* BREAKPOINTS E RESPONSIVIDADE */
        @media (min-width: 1025px) {
          .products-slider { justify-content: center; } 
        }

        @media (max-width: 1024px) {
          .desk-only { display: none !important; }
          .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
          
          .header-content { justify-content: space-between; }
          .logo { position: absolute; left: 50%; transform: translateX(-50%); } 
          
          .showcase-grid { grid-template-columns: 1fr; text-align: center; gap: 40px;} 
          .showcase-title { text-align: center; } 
          .benefits-list { align-items: center; } 
          .benefits-list li { text-align: left; } 
          .showcase-media-wrapper { order: -1; } 
          
          .offer-card-inner { grid-template-columns: 1fr; text-align: center; } 
          .offer-benefits-list { align-items: center; } 
          .offer-benefits-list li { text-align: left; align-items: center;} 
          .countdown-timer { justify-content: center; }
        }

        @media (max-width: 768px) {
          .countdown-box { min-width: 60px; padding: 8px; } 
          .countdown-num { font-size: 20px; } 
          .carousel-btn { display: none; } 
          .testimonial-carousel-container { padding: 0; }
        }

        @media (max-width: 480px) {
          .logo { font-size: 22px; }
          .hero-cta-group { width: 100%; display: flex; flex-direction: column; align-items: stretch; }
          .btn-primary-large { width: 100%; }
          .countdown-timer { flex-wrap: wrap; gap: 8px;} 
          .countdown-box { min-width: 50px; }
          .admin-products-grid { grid-template-columns: 1fr; }
          .footer-links { flex-direction: column; align-items: center; gap: 16px;}
        }
      `}} />
    </div>
  );
}

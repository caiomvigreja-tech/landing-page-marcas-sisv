
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
// @ts-ignore
import securitySeals from './img/Selos-de-SEG.webp';

// Chaves do Supabase fornecidas no código original
const supabaseUrl = 'https://zzewgrcsppjefwypbzzn.supabase.co';
const supabaseKey = 'sb_publishable_hjnxNLq_Lklwwu5Xf3RZ4w_AR6EcOv1';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default function App() {
  // Estados para o formulário
  const [clientName, setClientName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Estados para o FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const formatWhatsapp = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 números (DDD + 9 dígitos)
    const limited = numbers.substring(0, 11);
    
    // Aplica a máscara (00) 00000-0000
    if (limited.length <= 2) {
      return limited.length > 0 ? `(${limited}` : '';
    }
    if (limited.length <= 7) {
      return `(${limited.substring(0, 2)}) ${limited.substring(2)}`;
    }
    return `(${limited.substring(0, 2)}) ${limited.substring(2, 7)}-${limited.substring(7)}`;
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsapp(e.target.value);
    setWhatsapp(formatted);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabaseClient) {
      alert('Erro de Configuração: O cliente Supabase não pôde ser inicializado.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabaseClient
        .from('leads')
        .insert([
          {
            nome_cliente: clientName,
            nome_marca: brandName,
            ramo_atividade: businessType,
            whatsapp: whatsapp.replace(/\D/g, ''), // Envia apenas números para o Supabase
            status: 'entrada'
          },
        ]);

      if (error) throw error;


      // @ts-ignore
      if (window.fbq) {
        // @ts-ignore
        window.fbq('track', 'Lead');
      }

      setIsSubmitted(true);

      // Limpa o formulário
      setClientName('');
      setBrandName('');
      setBusinessType('');
      setWhatsapp('');

    } catch (error) {
      console.error('Erro Supabase:', error);
      alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente ou chame no WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-brand-gray flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-100 fade-in-up">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner border border-green-200">
            <i className="fas fa-check"></i>
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-brand-dark mb-4">
            Solicitação Enviada!
          </h1>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Obrigado pelo seu interesse. Nossa equipe de especialistas já recebeu seus dados e iniciará a pesquisa de disponibilidade da sua marca agora mesmo.
          </p>
          <div className="bg-orange-50 rounded-xl p-6 mb-8 border border-orange-100 text-left">
            <h4 className="font-bold text-brand-orange text-sm uppercase tracking-wider mb-2 flex items-center">
              <i className="fas fa-clock mr-2"></i> Próximos Passos
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              Em breve, um de nossos especialistas entrará em contato com você via <strong>WhatsApp</strong> para apresentar o diagnóstico completo da sua marca.
            </p>
          </div>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-brand-dark hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2 group"
          >
            <i className="fas fa-arrow-left text-sm group-hover:-translate-x-1 transition-transform"></i>
            Voltar para a Página Inicial
          </button>
        </div>
        <p className="text-slate-400 text-xs mt-8">
          &copy; 2026 Grupo SISV. Todos os direitos reservados.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <header className="bg-brand-dark py-4 shadow-md relative z-50 sticky top-0">
        <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center" role="navigation">
          <a href="#" className="flex items-center">
            <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2025/06/logoNEGATIVO-1-768x225.png.webp" alt="Logo Sem Isso Sem Vendas" className="h-10 w-auto object-contain" width="136" height="40" fetchpriority="high" />
          </a>
          <div className="hidden lg:flex items-center gap-8">
            <a href="#motivos" className="text-slate-300 hover:text-white font-medium transition text-sm">Por que registrar?</a>
            <a href="#processo" className="text-slate-300 hover:text-white font-medium transition text-sm">Como funciona</a>
            <a href="#sobre" className="text-slate-300 hover:text-white font-medium transition text-sm">Quem somos</a>
            <a href="#faq" className="text-slate-300 hover:text-white font-medium transition text-sm">Dúvidas</a>
          </div>
          <a href="#formulario-topo" className="hidden md:inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md text-sm border border-green-500">
            Consultar Marca
          </a>
        </nav>
      </header>

      <main>

      {/* 1. Hero Section */}
      <header className="relative bg-brand-gray pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10 fade-in-up md:pr-8">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-brand-orange-dark font-bold text-sm md:text-base mb-4 tracking-wide uppercase border border-orange-200">
                <i className="fas fa-check-circle mr-2" aria-hidden="true"></i>Registro de Marca e Patentes
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark leading-tight mb-6">
                A sua marca pertence <span className="text-brand-orange italic">legalmente</span> a você?
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Ter um CNPJ não garante a posse da sua marca. Se você não tem o registro oficial no INPI, qualquer pessoa pode registrar o nome primeiro e te proibir de usar sua própria marca amanhã.
              </p>
              <div className="hidden md:block text-slate-500 font-medium">
                <i className="fas fa-arrow-right text-brand-orange mr-2"></i> Preencha o formulário ao lado para verificar.
              </div>
            </div>

            <div id="formulario-topo" className="relative z-10 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-8 border border-slate-100 transform transition hover:scale-[1.01]">
                <div className="text-center mb-6">
                  <h3 className="font-heading text-2xl font-bold text-brand-dark">Diagnóstico Gratuito</h3>
                  <p className="text-slate-500 text-sm mt-1">Verifique a disponibilidade da sua marca agora.</p>
                </div>
                <form id="consultationForm" onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <div>
                    <label htmlFor="clientName" className="block text-sm font-semibold text-slate-700 mb-1">Seu Nome</label>
                    <input id="clientName" name="clientName" type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Ex: João da Silva" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition bg-slate-50" />
                  </div>
                  <div>
                    <label htmlFor="brandName" className="block text-sm font-semibold text-slate-700 mb-1">Nome da Marca</label>
                    <input id="brandName" name="brandName" type="text" required value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Ex: Padaria Doce Sabor" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition bg-slate-50" />
                  </div>
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-semibold text-slate-700 mb-1">Ramo de Atuação</label>
                    <select id="businessType" name="businessType" required value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition bg-slate-50">
                      <option value="" disabled>Selecione seu ramo...</option>
                      <option value="Comércio e Varejo">Comércio e Varejo</option>
                      <option value="Prestação de Serviços">Prestação de Serviços</option>
                      <option value="Infoprodutos e Conteúdo Digital">Infoprodutos e Conteúdo Digital</option>
                      <option value="Tecnologia e Startups">Tecnologia e Startups</option>
                      <option value="Indústria e Manufatura">Indústria e Manufatura</option>
                      <option value="Agronegócio">Agronegócio</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-700 mb-1">Seu WhatsApp (com DDD)</label>
                    <input id="whatsapp" name="whatsapp" type="tel" required value={whatsapp} onChange={handleWhatsappChange} placeholder="(00) 90000-0000" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition bg-slate-50" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-heading font-bold text-lg py-4 rounded-lg shadow-lg transition duration-300 flex items-center justify-center gap-2 mt-4 border-b-4 border-green-800 disabled:opacity-70">
                    {loading ? <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i> : 'Consultar Disponibilidade'}
                    {!loading && <i className="fas fa-search text-sm" aria-hidden="true"></i>}
                  </button>
                  <p className="text-xs text-center text-slate-400 mt-2">
                    <i className="fas fa-lock mr-1"></i> Seus dados estão 100% seguros.
                  </p>
                </form>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-dark rounded-full opacity-10 blur-xl -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-orange rounded-full opacity-10 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </header>

      {/* SEÇÃO: MOTIVOS */}
      <section id="motivos" className="py-24 bg-white relative">
        <div className="absolute left-1/2 top-24 bottom-24 w-px bg-slate-100 hidden md:block -z-0"></div>
        <div className="max-w-6xl mx-auto px-6 space-y-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-slate-100 group">
                <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2026/01/CNPJ-nao-garante.webp" alt="Argumento 1 - CNPJ não garante exclusividade de marca" className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105" loading="lazy" width="623" height="340" />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition duration-500"></div>
              </div>
            </div>
            <div className="order-2 text-left md:pl-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-lg mb-6 text-xl">
                <i className="fas fa-file-invoice"></i>
              </div>
              <h2 className="font-heading text-3xl font-bold text-brand-dark mb-4 leading-tight">O CNPJ não protege o nome da sua marca</h2>
              <p className="text-lg text-slate-600 leading-relaxed">O CNPJ é apenas o seu registro para pagar impostos e emitir notas. Para ser dono do nome e do logotipo em todo o Brasil, a lei exige o <strong>Registro de Marca</strong>. Sem isso, você está investindo tempo e dinheiro em um nome que juridicamente "não tem dono".</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-left md:pr-8 md:text-right">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 text-red-600 rounded-lg mb-6 text-xl md:ml-auto">
                <i className="fas fa-ban"></i>
              </div>
              <h2 className="font-heading text-3xl font-bold text-brand-dark mb-4 leading-tight">Existe o risco de ter que mudar tudo, da noite para o dia</h2>
              <p className="text-lg text-slate-600 leading-relaxed">Se outra empresa registrar seu nome antes de você, ela ganha o direito de te obrigar judicialmente a apagar suas redes sociais, trocar sua fachada, seus uniformes e descartar todas as suas embalagens. É um prejuízo enorme que pode ser evitado hoje.</p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-slate-100 group">
                <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2026/01/Existe-o-risco.webp" alt="Argumento 2 - Risco de perda da marca" className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105" loading="lazy" width="623" height="340" />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition duration-500"></div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-slate-100 group">
                <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2026/01/Sua-marca-e-patrimonio.webp" alt="Argumento 3 - Marca como patrimônio empresarial" className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105" loading="lazy" width="623" height="340" />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition duration-500"></div>
              </div>
            </div>
            <div className="order-2 text-left md:pl-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 text-green-600 rounded-lg mb-6 text-xl">
                <i className="fas fa-chart-line"></i>
              </div>
              <h2 className="font-heading text-3xl font-bold text-brand-dark mb-4 leading-tight">A sua marca é um patrimônio real, com valor de mercado.</h2>
              <p className="text-lg text-slate-600 leading-relaxed">Uma marca registrada é um bem da sua empresa, como um carro ou um imóvel. Ela valoriza o seu negócio no mercado, pode ser vendida, alugada para terceiros ou usada para criar o seu próprio sistema de franquias.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Como Funciona */}
      <section id="processo" className="py-24 bg-brand-gray overflow-hidden border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark text-center mb-16">Sua jornada até a conquista do certificado oficial</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-slate-200 -z-0 rounded-full">
              <div className="h-full w-full bg-gradient-to-r from-slate-300 via-brand-orange/50 to-brand-orange rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center group hover:-translate-y-1 transition duration-300">
                <div className="w-24 h-24 mx-auto bg-white text-slate-400 border-4 border-slate-200 rounded-full flex items-center justify-center text-3xl mb-6 transition group-hover:border-brand-dark group-hover:text-brand-dark">
                  <i className="fas fa-search-location"></i>
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-dark mb-3">1. Análise de Viabilidade</h3>
                <p className="text-slate-600 text-sm">O ponto de partida. Investigamos se o caminho está livre para você registrar sua marca sem riscos de processos.</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center group hover:-translate-y-1 transition duration-300">
                <div className="w-24 h-24 mx-auto bg-white text-brand-dark border-4 border-slate-200 rounded-full flex items-center justify-center text-3xl mb-6 transition group-hover:border-brand-orange group-hover:text-brand-orange">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-dark mb-3">2. Pedido de Registro</h3>
                <p className="text-slate-600 text-sm">Sua proteção começa aqui. Ao protocolar o pedido, garantimos sua <strong>prioridade legal imediata</strong> contra qualquer um que tente registrar depois.</p>
              </div>
              <div className="bg-gradient-to-b from-orange-50 to-white p-8 rounded-xl border-2 border-brand-orange shadow-lg text-center transform md:-translate-y-4 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-orange text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">Chegada</div>
                <div className="w-24 h-24 mx-auto bg-brand-orange text-white border-4 border-orange-200 ring-4 ring-orange-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg">
                  <i className="fas fa-trophy"></i>
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-orange-dark mb-3">3. Conquista do Registro</h3>
                <p className="text-slate-700 text-sm font-medium">Vitória! Você recebe o Certificado Oficial do INPI e se torna, juridicamente, o único proprietário da sua marca.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. Objeções */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="bg-slate-800/40 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-slate-700 hover:border-red-500/30 transition duration-300">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-slate-600 pb-6 md:pb-0 md:pr-8">
                <div className="flex items-center gap-2 mb-3"><i className="fas fa-times-circle text-red-500 text-xl"></i><span className="text-red-400 font-bold uppercase tracking-widest text-xs">Mito Comum</span></div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight italic opacity-90">"Eu já uso esse nome há anos"</h3>
              </div>
              <div className="md:col-span-7 text-slate-300 leading-relaxed">
                <p className="mb-5 text-lg">Muitos empresários perdem a marca porque acreditam que o tempo de uso garante alguma coisa. <strong>Isso é um mito.</strong></p>
                <div className="bg-brand-dark/50 p-6 rounded-lg border-l-4 border-brand-orange">
                  <p className="text-xl text-white leading-relaxed"><i className="fas fa-info-circle mr-2 text-brand-orange"></i>No Brasil, a regra é clara: dono é quem registra primeiro. Seus anos de história não valem juridicamente contra um certificado novo do INPI.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-slate-700 hover:border-red-500/30 transition duration-300">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-slate-600 pb-6 md:pb-0 md:pr-8">
                <div className="flex items-center gap-2 mb-3"><i className="fas fa-times-circle text-red-500 text-xl"></i><span className="text-red-400 font-bold uppercase tracking-widest text-xs">Pensamento Errado</span></div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight italic opacity-90">"Vou deixar para registrar mais para frente"</h3>
              </div>
              <div className="md:col-span-7 text-slate-300 leading-relaxed">
                <p className="mb-5 text-lg">Achar que o registro é um "gasto extra" agora é o erro mais caro que você pode cometer no futuro.</p>
                <div className="bg-brand-dark/50 p-6 rounded-lg border-l-4 border-red-500">
                  <p className="text-xl text-white leading-relaxed"><i className="fas fa-exclamation-triangle mr-2 text-red-500"></i>Registrar custa uma fração do prejuízo de um processo judicial, multas e de ter que refazer toda a sua marca do zero.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Autoridade */}
      <section id="sobre" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-brand-gray h-96 rounded-2xl flex items-center justify-center border border-slate-200 relative overflow-hidden group shadow-lg">
                <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2026/01/Time-Marcas-e-Patentes-SISV.webp" alt="Equipe de especialistas SISV" className="w-full h-full object-cover" loading="lazy" width="600" height="400" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Quem somos</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mt-2 mb-2">Marcas, Patentes e Inteligência Empresarial.</h2>
              <p className="text-xl font-medium text-slate-500 mb-8">Em um único ecossistema.</p>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Sua marca terá o apoio do <strong>Grupo SISV</strong>, especialista em inteligência de negócios que já acompanhou mais de <strong>500 empresas</strong>.</p>
                <p>Somado a isso, você conta com o corpo técnico do <strong>Grupo SS</strong>, formado por advogados especialistas em propriedade intelectual.</p>
                <p className="font-medium text-brand-dark border-l-4 border-brand-orange pl-4">É a união de quem tem visão de mercado com quem domina as leis para proteger o patrimônio mais valioso da sua empresa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Conversão */}
      <section id="diagnostico" className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white mb-6">Não fique na dúvida. Descubra a situação da sua marca.</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Muitos empresários só descobrem que estão em risco quando recebem uma notificação judicial.</p>
          <a href="#formulario-topo" className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-heading font-bold text-lg py-5 px-10 rounded-lg shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-green-800"><i className="fas fa-arrow-up mr-2"></i> Consultar Disponibilidade</a>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-brand-orange font-bold uppercase tracking-wider text-sm mb-2 block">Tira-dúvidas</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight">Perguntas Frequentes</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">Separamos as principais dúvidas de nossos clientes sobre o processo de registro.</p>
              <a href="#formulario-topo" className="inline-flex items-center text-brand-orange font-bold hover:text-brand-orange-dark transition group">Falar com um especialista<i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition"></i></a>
            </div>
            <div className="md:col-span-8">
              <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                {[
                  { q: "O registro vale por quanto tempo?", a: "Vale por 10 anos e você pode renovar sempre que quiser, indefinidamente. É um patrimônio vitalício se for bem cuidado." },
                  { q: "Posso registrar o nome de um produto?", a: "Sim. O ideal é proteger tanto o nome da sua empresa (Marca Institucional) quanto os nomes dos seus produtos ou serviços principais." },
                  { q: "E se alguém já tiver registrado meu nome?", a: "Não entre em pânico. Nossa equipe jurídica analisará o caso detalhadamente. Em algumas situações, é possível coexistir ou encontraremos a melhor estratégia." }
                ].map((item, idx) => (
                  <div key={idx} className="group">
                    <button className="w-full flex justify-between items-center py-6 text-left focus:outline-none" onClick={() => toggleFaq(idx)}>
                      <span className="font-bold text-brand-dark text-lg pr-8 group-hover:text-brand-orange transition">{item.q}</span>
                      <div className="relative w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full group-hover:bg-brand-orange/10 transition">
                        <i className={`fas fa-plus text-brand-orange text-sm rotate-icon transition-transform duration-300 ${openFaqIndex === idx ? 'active' : ''}`}></i>
                      </div>
                    </button>
                    <div className={`faq-content overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'active' : ''}`} style={{ maxHeight: openFaqIndex === idx ? '200px' : '0', opacity: openFaqIndex === idx ? 1 : 0 }}>
                      <div className="pb-6 text-slate-600 leading-relaxed pr-8">{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* 11. Rodapé */}
      <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-orange">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2025/06/logoNEGATIVO-1-768x225.png.webp" alt="Logo Sem Isso Sem Vendas" className="h-12 mb-6 object-contain" loading="lazy" width="164" height="48" />
              <div className="text-sm text-slate-300 leading-relaxed">
                <p className="font-bold text-white text-lg mb-2">Grupo Sem Isso Sem Vendas</p>
                <p className="mb-1">CNPJ: 58.637.365/0001-01</p>
                <p>R. Nossa Sra. da Paz, 166 - Centro</p>
                <p>Bálsamo - SP, 15140-000</p>
              </div>
            </div>
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <h4 className="text-lg font-heading font-bold text-white mb-6">Fale Conosco</h4>
              <ul className="space-y-5 text-sm text-slate-300 w-full">
                <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-brand-orange shrink-0 border border-slate-700"><i className="fas fa-envelope text-lg"></i></div>
                  <div className="text-center md:text-left"><span className="block text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Email</span><a href="mailto:contato@semissosemvendas.com.br" className="hover:text-white transition text-base block break-all">contato@semissosemvendas.com.br</a></div>
                </li>
                <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-brand-orange shrink-0 border border-slate-700"><i className="fab fa-whatsapp text-xl"></i></div>
                  <div className="text-center md:text-left"><span className="block text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">WhatsApp</span><span className="font-bold text-white text-base">11 91749-6887</span></div>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right flex flex-col items-center md:items-end">
              <h4 className="text-lg font-heading font-bold text-white mb-6">Ambiente Seguro</h4>
              <p className="text-sm text-slate-400 mb-4">Seus dados estão protegidos.</p>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 inline-block">
                <img src={securitySeals} alt="Selos de segurança e certificação" className="h-14 object-contain opacity-90 hover:opacity-100 transition" loading="lazy" width="200" height="56" />
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 mt-8 text-center md:flex md:justify-between items-center text-xs text-slate-500">
            <p>&copy; 2026 Grupo SISV. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0 flex gap-6 justify-center">
              <button onClick={() => setShowTerms(true)} className="hover:text-white transition cursor-pointer">Termos de Uso</button>
              <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition cursor-pointer">Política de Privacidade</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" onClick={() => setShowTerms(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative z-10 animate-fade-in-up">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center">
              <h3 className="font-heading text-xl font-bold text-brand-dark">Termos de Uso</h3>
              <button onClick={() => setShowTerms(false)} className="text-slate-400 hover:text-brand-dark transition"><i className="fas fa-times text-xl"></i></button>
            </div>
            <div className="p-8 text-slate-600 text-sm leading-relaxed space-y-4">
              <p>Bem-vindo ao Grupo SISV. Ao acessar nossa página, você concorda com os seguintes termos:</p>
              <h4 className="font-bold text-brand-dark">1. Objeto</h4>
              <p>Esta landing page tem como objetivo coletar dados de interessados em serviços de registro de marcas e patentes para fins de consultoria inicial gratuita.</p>
              <h4 className="font-bold text-brand-dark">2. Uso do Serviço</h4>
              <p>O preenchimento do formulário não garante o registro da marca, sendo apenas o primeiro passo para uma análise técnica realizada por nossos especialistas.</p>
              <h4 className="font-bold text-brand-dark">3. Propriedade Intelectual</h4>
              <p>Todo o conteúdo deste site (textos, design e logos) é de propriedade do Grupo SISV e não pode ser reproduzido sem autorização.</p>
              <h4 className="font-bold text-brand-dark">4. Responsabilidade</h4>
              <p>O usuário é responsável pela veracidade dos dados informados no formulário de contato.</p>
            </div>
            <div className="sticky bottom-0 bg-slate-50 p-6 border-t border-slate-100 flex justify-end">
              <button onClick={() => setShowTerms(false)} className="bg-brand-dark text-white px-8 py-2 rounded-lg font-bold hover:bg-slate-800 transition">Fechar</button>
            </div>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" onClick={() => setShowPrivacy(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative z-10 animate-fade-in-up">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center">
              <h3 className="font-heading text-xl font-bold text-brand-dark">Política de Privacidade</h3>
              <button onClick={() => setShowPrivacy(false)} className="text-slate-400 hover:text-brand-dark transition"><i className="fas fa-times text-xl"></i></button>
            </div>
            <div className="p-8 text-slate-600 text-sm leading-relaxed space-y-4">
              <p>O Grupo SISV preza pela segurança dos seus dados em conformidade com a LGPD:</p>
              <h4 className="font-bold text-brand-dark">1. Coleta de Dados</h4>
              <p>Coletamos seu nome, nome da marca, ramo de atuação e WhatsApp apenas para realizar a consulta de disponibilidade e entrar em contato com o resultado.</p>
              <h4 className="font-bold text-brand-dark">2. Uso das Informações</h4>
              <p>Suas informações serão utilizadas exclusivamente por nossa equipe comercial e técnica. Não compartilhamos nem vendemos seus dados para terceiros.</p>
              <h4 className="font-bold text-brand-dark">3. Armazenamento</h4>
              <p>Seus dados são armazenados em servidores seguros através da tecnologia Supabase, com criptografia de ponta a ponta.</p>
              <h4 className="font-bold text-brand-dark">4. Seus Direitos</h4>
              <p>Você pode solicitar a exclusão total dos seus dados de nosso banco de dados a qualquer momento entrando em contato pelo e-mail <strong>contato@semissosemvendas.com.br</strong>.</p>
            </div>
            <div className="sticky bottom-0 bg-slate-50 p-6 border-t border-slate-100 flex justify-end">
              <button onClick={() => setShowPrivacy(false)} className="bg-brand-dark text-white px-8 py-2 rounded-lg font-bold hover:bg-slate-800 transition">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

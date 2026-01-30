
import React, { useState, useEffect } from 'react';
// @ts-ignore
import securitySeals from './img/Selos-de-SEG.webp';

// Chaves do Supabase fornecidas no código original
const supabaseUrl = 'https://zzewgrcsppjefwypbzzn.supabase.co';
const supabaseKey = 'sb_publishable_hjnxNLq_Lklwwu5Xf3RZ4w_AR6EcOv1';

export default function App() {
  // Estados para o formulário
  const [clientName, setClientName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados para o FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Cliente Supabase
  const [supabaseClient, setSupabaseClient] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.supabase) {
      // @ts-ignore
      const client = window.supabase.createClient(supabaseUrl, supabaseKey);
      setSupabaseClient(client);
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
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
            whatsapp: whatsapp,
            status: 'entrada'
          },
        ]);

      if (error) throw error;

      alert('✅ Solicitação recebida! Nossa equipe iniciará a pesquisa e entrará em contato em breve.');

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

  return (
    <>
      {/* Navbar */}
      <nav className="bg-brand-dark py-4 shadow-md relative z-50 sticky top-0">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2025/06/logoNEGATIVO-1-768x225.png.webp" alt="Logo Sem Isso Sem Vendas" className="h-10 w-auto object-contain" />
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
        </div>
      </nav>

      {/* 1. Hero Section */}
      <header className="relative bg-brand-gray pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10 fade-in-up md:pr-8">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-brand-orange font-bold text-sm md:text-base mb-4 tracking-wide uppercase border border-orange-200">
                <i className="fas fa-check-circle mr-2"></i>Registro de Marca e Patentes
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
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Seu Nome</label>
                    <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Ex: João da Silva" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nome da Marca / Empresa</label>
                    <input type="text" required value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Ex: Padaria Doce Sabor" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Ramo de Atuação</label>
                    <select required value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition bg-slate-50">
                      <option value="" disabled>Selecione seu ramo...</option>
                      <option value="Comércio (Varejo ou Atacado)">Comércio (Varejo ou Atacado)</option>
                      <option value="Prestação de Serviços">Prestação de Serviços</option>
                      <option value="Indústria / Manufatura">Indústria / Manufatura</option>
                      <option value="Agronegócio">Agronegócio</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Tecnologia / Startup / Fintech">Tecnologia / Startup / Fintech</option>
                      <option value="Negócio Digital">Negócio Digital</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Seu WhatsApp (com DDD)</label>
                    <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(00) 90000-0000" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition bg-slate-50" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-heading font-bold text-lg py-4 rounded-lg shadow-lg transition duration-300 flex items-center justify-center gap-2 mt-4 border-b-4 border-green-800 disabled:opacity-70">
                    {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Consultar Disponibilidade'}
                    {!loading && <i className="fas fa-search text-sm"></i>}
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
                <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2026/01/CNPJ-nao-garante.webp" alt="Argumento 1" className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105" loading="lazy" />
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
                <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2026/01/Existe-o-risco.webp" alt="Argumento 2" className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition duration-500"></div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-slate-100 group">
                <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2026/01/Sua-marca-e-patrimonio.webp" alt="Argumento 3" className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105" loading="lazy" />
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
                <h3 className="font-heading text-xl font-bold text-brand-orangeDark mb-3">3. Conquista do Registro</h3>
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
                <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2026/01/Time-Marcas-e-Patentes-SISV.webp" alt="Equipe" className="w-full h-full object-cover" loading="lazy" />
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
              <a href="#formulario-topo" className="inline-flex items-center text-brand-orange font-bold hover:text-brand-orangeDark transition group">Falar com um especialista<i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition"></i></a>
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

      {/* 11. Rodapé */}
      <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-orange">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <img src="https://www.semissosemvendas.com.br/wp-content/uploads/2025/06/logoNEGATIVO-1-768x225.png.webp" alt="Logo" className="h-12 mb-6 object-contain" loading="lazy" />
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
                  <div className="text-center md:text-left"><span className="block text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">WhatsApp</span><span className="font-bold text-white text-base">(17) 99999-9999</span></div>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right flex flex-col items-center md:items-end">
              <h4 className="text-lg font-heading font-bold text-white mb-6">Ambiente Seguro</h4>
              <p className="text-sm text-slate-400 mb-4">Seus dados estão protegidos.</p>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 inline-block">
                <img src={securitySeals} alt="Selos" className="h-14 object-contain opacity-90 hover:opacity-100 transition" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 mt-8 text-center md:flex md:justify-between items-center text-xs text-slate-500">
            <p>&copy; 2025 Grupo SISV. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0 flex gap-6 justify-center"><a href="#" className="hover:text-white transition">Termos de Uso</a><a href="#" className="hover:text-white transition">Política de Privacidade</a></div>
          </div>
        </div>
      </footer>

      {/* WA Button */}
      <a href="https://wa.me/5517999999999" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110 flex items-center justify-center w-16 h-16 border-2 border-white/20"><i className="fab fa-whatsapp text-3xl"></i></a>
    </>
  );
}

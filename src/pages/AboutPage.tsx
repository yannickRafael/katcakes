
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-katcakes-lightgray">
        <div className="katcakes-container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Sobre KatCakes</h1>
            <p className="text-katcakes-gray text-lg">
              Confeitaria artesanal criando doces memórias em Maputo.
            </p>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-16">
        <div className="katcakes-container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559620192-032c4bc4674e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Fundadora KatCakes" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <span className="block text-sm uppercase tracking-wider mb-2">Nossa História</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">A Jornada KatCakes</h2>
              <p className="text-katcakes-gray mb-4">
                KatCakes começou em 2018 quando Kathy Da Berta Rafael começou a confeitaria na cozinha de sua casa em Maputo. 
                O que começou como uma paixão por criar deliciosas guloseimas para familiares e amigos rapidamente floresceu em uma próspera confeitaria caseira.
              </p>
              <p className="text-katcakes-gray mb-4">
                Motivada pela crença de que cada celebração merece algo especial, Kathy aperfeiçoou sua arte através da experimentação, treinamento e um compromisso inabalável com a qualidade.
              </p>
              <p className="text-katcakes-gray">
                Hoje, KatCakes é conhecida em todo Maputo por sua abordagem artesanal, sabores excepcionais e designs bonitos que trazem alegria para todas as ocasiões.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-katcakes-lightgray">
        <div className="katcakes-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="block text-sm uppercase tracking-wider mb-2">Nossa Filosofia</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">O Que Valorizamos</h2>
            <p className="text-katcakes-gray">
              Na KatCakes, nosso trabalho é guiado por princípios fundamentais que garantem que cada criação supere as expectativas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Ingredientes de Qualidade</h3>
              <p className="text-katcakes-gray">
                Usamos apenas os melhores e mais frescos ingredientes em cada criação. Sem compromissos, sem atalhos.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Abordagem Artesanal</h3>
              <p className="text-katcakes-gray">
                Cada bolo é feito à mão com atenção meticulosa aos detalhes, garantindo um resultado único e especial.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Felicidade do Cliente</h3>
              <p className="text-katcakes-gray">
                Sua satisfação é nossa prioridade. Trabalhamos em estreita colaboração com você para dar vida à sua visão.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet the Baker */}
      <section className="py-16">
        <div className="katcakes-container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="block text-sm uppercase tracking-wider mb-2">Conheça a Confeiteira</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Kathy Da Berta Rafael</h2>
              <p className="text-katcakes-gray mb-4">
                A jornada de Kathy no mundo da confeitaria começou na cozinha de sua avó, onde aprendeu receitas e técnicas tradicionais que formaram a base da KatCakes.
              </p>
              <p className="text-katcakes-gray mb-4">
                Com formação formal em artes de confeitaria e anos de experiência, Kathy combina expertise técnica com toque artístico para criar bolos que são tão bonitos quanto deliciosos.
              </p>
              <p className="text-katcakes-gray">
                "Confeitaria é minha forma de expressão criativa e trazer alegria através das minhas criações é o que me move todos os dias." - Kathy
              </p>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Kathy confeitando" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-katcakes-lightgray">
        <div className="katcakes-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="block text-sm uppercase tracking-wider mb-2">Entre em Contacto</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Contacte-nos</h2>
            <p className="text-katcakes-gray">
              Tem perguntas ou quer fazer um pedido? Adoraríamos ouvir de você!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-6">Informações de Contacto</h3>
              <ul className="space-y-4 text-katcakes-gray">
                <li className="flex items-start">
                  <span className="font-medium mr-2">Endereço:</span>
                  <span>Rua 123, Maputo, Moçambique</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Telefone:</span>
                  <a href="tel:+258123456789" className="hover:text-katcakes-black transition-colors">+258 123 456 789</a>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Email:</span>
                  <a href="mailto:info@katcakes.com" className="hover:text-katcakes-black transition-colors">info@katcakes.com</a>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Horário:</span>
                  <div>
                    <p>Segunda - Sexta: 9h - 18h</p>
                    <p>Sábado: 10h - 16h</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-6">Envie uma Mensagem</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-katcakes-black"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-katcakes-black"
                    placeholder="Seu email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-katcakes-black"
                    placeholder="Sua mensagem"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-katcakes-black text-white py-2 rounded hover:bg-katcakes-darkgray transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;

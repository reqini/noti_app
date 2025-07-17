import { News, Journalist } from '../contexts/GlobalContext';
import i18n from '../utils/i18n';

const BASE_URL = 'https://jsonplaceholder.org';

const newsByLang: Record<string, News[]> = {
  es: [
    {
      id: 1,
      title: 'Descubrimiento importante en tecnología',
      content: 'Científicos han realizado un descubrimiento revolucionario en computación cuántica...',
      image: 'https://picsum.photos/400/300?random=1',
      journalistId: 1,
      journalist: { id: 1, name: 'Juan Pérez', email: 'juan.perez@noticias.com', phone: '+34-555-0101' },
      publishedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'La economía global muestra signos de recuperación',
      content: 'Indicadores recientes sugieren una tendencia positiva en los mercados globales...',
      image: 'https://picsum.photos/400/300?random=2',
      journalistId: 2,
      journalist: { id: 2, name: 'Ana García', email: 'ana.garcia@noticias.com', phone: '+34-555-0102' },
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      title: 'Avances en medicina regenerativa',
      content: 'Nuevos tratamientos prometen revolucionar la recuperación de tejidos humanos...',
      image: 'https://picsum.photos/400/300?random=3',
      journalistId: 1,
      journalist: { id: 1, name: 'Juan Pérez', email: 'juan.perez@noticias.com', phone: '+34-555-0101' },
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      title: 'Innovación en energías renovables',
      content: 'Empresas españolas lideran el desarrollo de paneles solares de alta eficiencia...',
      image: 'https://picsum.photos/400/300?random=4',
      journalistId: 2,
      journalist: { id: 2, name: 'Ana García', email: 'ana.garcia@noticias.com', phone: '+34-555-0102' },
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 5,
      title: 'El arte urbano transforma ciudades',
      content: 'Murales y esculturas revitalizan barrios en Madrid y Barcelona...',
      image: 'https://picsum.photos/400/300?random=5',
      journalistId: 1,
      journalist: { id: 1, name: 'Juan Pérez', email: 'juan.perez@noticias.com', phone: '+34-555-0101' },
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 6,
      title: 'Educación digital en aumento',
      content: 'El aprendizaje online crece exponencialmente en escuelas y universidades...',
      image: 'https://picsum.photos/400/300?random=6',
      journalistId: 2,
      journalist: { id: 2, name: 'Ana García', email: 'ana.garcia@noticias.com', phone: '+34-555-0102' },
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 7,
      title: 'Deporte femenino gana protagonismo',
      content: 'Equipos y atletas españolas logran récords históricos en 2024...',
      image: 'https://picsum.photos/400/300?random=7',
      journalistId: 1,
      journalist: { id: 1, name: 'Juan Pérez', email: 'juan.perez@noticias.com', phone: '+34-555-0101' },
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 8,
      title: 'Crecimiento del turismo nacional',
      content: 'España experimenta un auge en el turismo interno durante 2024...',
      image: 'https://picsum.photos/400/300?random=8',
      journalistId: 2,
      journalist: { id: 2, name: 'Ana García', email: 'ana.garcia@noticias.com', phone: '+34-555-0102' },
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 9,
      title: 'Innovación en movilidad urbana',
      content: 'Nuevos sistemas de transporte eléctrico llegan a las principales ciudades...',
      image: 'https://picsum.photos/400/300?random=9',
      journalistId: 1,
      journalist: { id: 1, name: 'Juan Pérez', email: 'juan.perez@noticias.com', phone: '+34-555-0101' },
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 10,
      title: 'Cultura digital y redes sociales',
      content: 'El impacto de las redes sociales en la juventud española...',
      image: 'https://picsum.photos/400/300?random=10',
      journalistId: 2,
      journalist: { id: 2, name: 'Ana García', email: 'ana.garcia@noticias.com', phone: '+34-555-0102' },
      publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 11,
      title: 'Desarrollo de inteligencia artificial',
      content: 'España invierte en startups de IA para potenciar la economía...',
      image: 'https://picsum.photos/400/300?random=11',
      journalistId: 1,
      journalist: { id: 1, name: 'Juan Pérez', email: 'juan.perez@noticias.com', phone: '+34-555-0101' },
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 12,
      title: 'Gastronomía española en el mundo',
      content: 'Chefs nacionales triunfan en concursos internacionales...',
      image: 'https://picsum.photos/400/300?random=12',
      journalistId: 2,
      journalist: { id: 2, name: 'Ana García', email: 'ana.garcia@noticias.com', phone: '+34-555-0102' },
      publishedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  en: [
    {
      id: 1,
      title: 'Major Discovery in Technology',
      content: 'Scientists have made a groundbreaking discovery in quantum computing...',
      image: 'https://picsum.photos/400/300?random=1',
      journalistId: 1,
      journalist: { id: 1, name: 'John Doe', email: 'john.doe@news.com', phone: '+1-555-0101' },
      publishedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Global Economy Shows Signs of Recovery',
      content: 'Recent economic indicators suggest a positive trend in global markets...',
      image: 'https://picsum.photos/400/300?random=2',
      journalistId: 2,
      journalist: { id: 2, name: 'Jane Smith', email: 'jane.smith@news.com', phone: '+1-555-0102' },
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      title: 'Breakthroughs in Regenerative Medicine',
      content: 'New treatments promise to revolutionize human tissue recovery...',
      image: 'https://picsum.photos/400/300?random=3',
      journalistId: 1,
      journalist: { id: 1, name: 'John Doe', email: 'john.doe@news.com', phone: '+1-555-0101' },
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      title: 'Innovation in Renewable Energy',
      content: 'US companies lead the development of high-efficiency solar panels...',
      image: 'https://picsum.photos/400/300?random=4',
      journalistId: 2,
      journalist: { id: 2, name: 'Jane Smith', email: 'jane.smith@news.com', phone: '+1-555-0102' },
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 5,
      title: 'Urban Art Transforms Cities',
      content: 'Murals and sculptures revitalize neighborhoods in New York and LA...',
      image: 'https://picsum.photos/400/300?random=5',
      journalistId: 1,
      journalist: { id: 1, name: 'John Doe', email: 'john.doe@news.com', phone: '+1-555-0101' },
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 6,
      title: 'Digital Education on the Rise',
      content: 'Online learning is growing exponentially in schools and universities...',
      image: 'https://picsum.photos/400/300?random=6',
      journalistId: 2,
      journalist: { id: 2, name: 'Jane Smith', email: 'jane.smith@news.com', phone: '+1-555-0102' },
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 7,
      title: 'Women’s Sports Gain Spotlight',
      content: 'US teams and athletes achieve historic records in 2024...',
      image: 'https://picsum.photos/400/300?random=7',
      journalistId: 1,
      journalist: { id: 1, name: 'John Doe', email: 'john.doe@news.com', phone: '+1-555-0101' },
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 8,
      title: 'National Tourism Growth',
      content: 'Spain experiences a surge in domestic tourism in 2024...',
      image: 'https://picsum.photos/400/300?random=8',
      journalistId: 2,
      journalist: { id: 2, name: 'Jane Smith', email: 'jane.smith@news.com', phone: '+1-555-0102' },
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 9,
      title: 'Urban Mobility Innovation',
      content: 'New electric transportation systems arrive in major cities...',
      image: 'https://picsum.photos/400/300?random=9',
      journalistId: 1,
      journalist: { id: 1, name: 'John Doe', email: 'john.doe@news.com', phone: '+1-555-0101' },
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 10,
      title: 'Digital Culture and Social Media',
      content: 'The impact of social media on Spanish youth...',
      image: 'https://picsum.photos/400/300?random=10',
      journalistId: 2,
      journalist: { id: 2, name: 'Jane Smith', email: 'jane.smith@news.com', phone: '+1-555-0102' },
      publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 11,
      title: 'Artificial Intelligence Development',
      content: 'Spain invests in AI startups to boost the economy...',
      image: 'https://picsum.photos/400/300?random=11',
      journalistId: 1,
      journalist: { id: 1, name: 'John Doe', email: 'john.doe@news.com', phone: '+1-555-0101' },
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 12,
      title: 'Spanish Gastronomy in the World',
      content: 'Spanish chefs triumph in international competitions...',
      image: 'https://picsum.photos/400/300?random=12',
      journalistId: 2,
      journalist: { id: 2, name: 'Jane Smith', email: 'jane.smith@news.com', phone: '+1-555-0102' },
      publishedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  pt: [
    {
      id: 1,
      title: 'Grande descoberta em tecnologia',
      content: 'Cientistas fizeram uma descoberta revolucionária em computação quântica...',
      image: 'https://picsum.photos/400/300?random=1',
      journalistId: 1,
      journalist: { id: 1, name: 'João Silva', email: 'joao.silva@noticias.com', phone: '+55-555-0101' },
      publishedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Economia global mostra sinais de recuperação',
      content: 'Indicadores recentes sugerem uma tendência positiva nos mercados globais...',
      image: 'https://picsum.photos/400/300?random=2',
      journalistId: 2,
      journalist: { id: 2, name: 'Maria Souza', email: 'maria.souza@noticias.com', phone: '+55-555-0102' },
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      title: 'Avanços em medicina regenerativa',
      content: 'Novos tratamentos prometem revolucionar a recuperação de tecidos humanos...',
      image: 'https://picsum.photos/400/300?random=3',
      journalistId: 1,
      journalist: { id: 1, name: 'João Silva', email: 'joao.silva@noticias.com', phone: '+55-555-0101' },
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      title: 'Inovação em energias renováveis',
      content: 'Empresas brasileiras lideram o desenvolvimento de painéis solares de alta eficiência...',
      image: 'https://picsum.photos/400/300?random=4',
      journalistId: 2,
      journalist: { id: 2, name: 'Maria Souza', email: 'maria.souza@noticias.com', phone: '+55-555-0102' },
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 5,
      title: 'Arte urbana transforma cidades',
      content: 'Murais e esculturas revitalizam bairros em São Paulo e Rio...',
      image: 'https://picsum.photos/400/300?random=5',
      journalistId: 1,
      journalist: { id: 1, name: 'João Silva', email: 'joao.silva@noticias.com', phone: '+55-555-0101' },
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 6,
      title: 'Educação digital em alta',
      content: 'O ensino online cresce exponencialmente em escolas e universidades...',
      image: 'https://picsum.photos/400/300?random=6',
      journalistId: 2,
      journalist: { id: 2, name: 'Maria Souza', email: 'maria.souza@noticias.com', phone: '+55-555-0102' },
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 7,
      title: 'Esporte feminino ganha destaque',
      content: 'Times e atletas brasileiras conquistam recordes históricos em 2024...',
      image: 'https://picsum.photos/400/300?random=7',
      journalistId: 1,
      journalist: { id: 1, name: 'João Silva', email: 'joao.silva@noticias.com', phone: '+55-555-0101' },
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 8,
      title: 'Crescimento do turismo nacional',
      content: 'A Espanha experimenta um auge no turismo interno em 2024...',
      image: 'https://picsum.photos/400/300?random=8',
      journalistId: 2,
      journalist: { id: 2, name: 'Maria Souza', email: 'maria.souza@noticias.com', phone: '+55-555-0102' },
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 9,
      title: 'Inovação em mobilidade urbana',
      content: 'Novos sistemas de transporte elétrico chegam às principais cidades...',
      image: 'https://picsum.photos/400/300?random=9',
      journalistId: 1,
      journalist: { id: 1, name: 'João Silva', email: 'joao.silva@noticias.com', phone: '+55-555-0101' },
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 10,
      title: 'Cultura digital e redes sociais',
      content: 'O impacto das redes sociais na juventude espanhola...',
      image: 'https://picsum.photos/400/300?random=10',
      journalistId: 2,
      journalist: { id: 2, name: 'Maria Souza', email: 'maria.souza@noticias.com', phone: '+55-555-0102' },
      publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 11,
      title: 'Desenvolvimento de inteligência artificial',
      content: 'A Espanha investe em startups de IA para impulsionar a economia...',
      image: 'https://picsum.photos/400/300?random=11',
      journalistId: 1,
      journalist: { id: 1, name: 'João Silva', email: 'joao.silva@noticias.com', phone: '+55-555-0101' },
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 12,
      title: 'Gastronomia espanhola no mundo',
      content: 'Chefs nacionais triunfam em competições internacionais...',
      image: 'https://picsum.photos/400/300?random=12',
      journalistId: 2,
      journalist: { id: 2, name: 'Maria Souza', email: 'maria.souza@noticias.com', phone: '+55-555-0102' },
      publishedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

const transformPostToNews = (post: any, journalists: Journalist[]): News => {
  const randomJournalist = journalists[Math.floor(Math.random() * journalists.length)];
  const randomImage = `https://picsum.photos/400/300?random=${post.id}`;
  
  return {
    id: post.id,
    title: post.title,
    content: post.body,
    image: randomImage,
    journalistId: randomJournalist.id,
    journalist: randomJournalist,
    publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
  };
};

const transformUserToJournalist = (user: any): Journalist => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  };
};

export const apiService = {
  // Fetch journalists (users from JSONPlaceholder)
  async getJournalists(): Promise<Journalist[]> {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch journalists');
      }
      const users = await response.json();
      return users.map(transformUserToJournalist);
    } catch (error) {
      // Fallback data if API fails
      const lang = i18n.language;
      if (lang === 'es') {
        return [
          { id: 1, name: 'Juan Pérez', email: 'juan.perez@noticias.com', phone: '+34-555-0101' },
          { id: 2, name: 'Ana García', email: 'ana.garcia@noticias.com', phone: '+34-555-0102' },
        ];
      }
      if (lang === 'pt') {
        return [
          { id: 1, name: 'João Silva', email: 'joao.silva@noticias.com', phone: '+55-555-0101' },
          { id: 2, name: 'Maria Souza', email: 'maria.souza@noticias.com', phone: '+55-555-0102' },
        ];
      }
      return [
        { id: 1, name: 'John Doe', email: 'john.doe@news.com', phone: '+1-555-0101' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@news.com', phone: '+1-555-0102' },
      ];
    }
  },

  // Fetch news (posts from JSONPlaceholder)
  async getNews(): Promise<News[]> {
    // Simular noticias diferentes por idioma
    const lang = i18n.language;
    if (newsByLang[lang]) {
      return newsByLang[lang];
    }
    // fallback a inglés
    return newsByLang['en'];
  },

  // Get news by ID
  async getNewsById(id: number): Promise<News | null> {
    const lang = i18n.language;
    const newsList = newsByLang[lang] || newsByLang['en'];
    return newsList.find(n => n.id === id) || null;
  },

  // Get journalist by ID
  async getJournalistById(id: number): Promise<Journalist | null> {
    const lang = i18n.language;
    const journalists = await this.getJournalists();
    return journalists.find(j => j.id === id) || null;
  },
}; 
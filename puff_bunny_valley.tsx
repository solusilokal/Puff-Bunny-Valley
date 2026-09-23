import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  MapPin, 
  MessageCircle, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowDown, 
  Share,
  Copy,
  Check,
  Twitter,
  Clock,
  Star,
  Quote,
  Leaf,
  Info,
  History,
  Camera,
  Ticket,
  HelpCircle,
  Carrot,
  Heart
} from 'lucide-react';

const pageData = {
  name: "Puff Bunny Valley",
  phone: "6289529605601",
  address: "Jl. Wisata Alam No. 88, Kawasan Pegunungan, Lembang",
  title: "Taman Bermain Kelinci Paling Menggemaskan!",
  description: "Bebaskan penatmu dan bermainlah bersama ratusan kelinci lucu di alam terbuka yang asri. Destinasi liburan keluarga terbaik untuk edukasi dan interaksi langsung dengan hewan peliharaan.",
  profileImg: "./profile.png",
  heroImg: "./hero-bg.jpg",
  links: {
    instagram: "https://www.instagram.com/solusilokal.id/",
    maps: "https://www.google.com/maps/search/Palangka+Raya", 
    whatsapp: "https://wa.me/6289529605601",
    tiktok: "https://www.tiktok.com/@solusilokal.id"
  },
  about: "Puff Bunny Valley adalah taman ekowisata seluas 2 hektar yang didedikasikan untuk pelestarian dan edukasi tentang kelinci. Kami menciptakan habitat semi-bebas di mana kelinci dapat melompat riang, dan pengunjung dapat berinteraksi langsung dengan penuh kasih sayang.",
  history: "Berawal dari kecintaan keluarga kami terhadap hewan berbulu ini pada tahun 2018, kami mulai merawat belasan kelinci terlantar. Melihat kebahagiaan anak-anak saat bermain bersama mereka, kami membuka area taman belakang kami untuk umum. Kini, Puff Bunny Valley telah berkembang menjadi rumah bagi lebih dari 200 kelinci dari 15 ras berbeda.",
  catalog: [
    { title: "Feeding Time", desc: "Beri makan kelinci langsung dari tanganmu dengan pakan sehat yang kami sediakan.", icon: <Leaf size={24} /> },
    { title: "Petting Zoo", desc: "Area khusus untuk membelai dan berfoto bersama anak kelinci yang baru lahir.", icon: <Heart size={24} /> },
    { title: "Bunny Playground", desc: "Tonton kelinci-kelinci berlarian dan bermain di terowongan serta rintangan mini.", icon: <Carrot size={24} /> },
    { title: "Photo Studio", desc: "Sewa kostum lucu dan abadikan momen bersama kelinci kesayanganmu.", icon: <Camera size={24} /> }
  ],
  pricing: [
    { name: "Tiket Reguler", price: "Rp 35.000", features: ["Akses masuk area taman", "1 cup pakan kelinci standard", "Free akses playground"] },
    { name: "Paket Keluarga", price: "Rp 120.000", features: ["4 Akses masuk (Dewasa/Anak)", "4 cup pakan premium", "1x Cetak foto langsung jadi"] },
    { name: "VIP Explorer", price: "Rp 75.000", features: ["Akses semua area & Petting Zoo", "Pakan premium sepuasnya", "Sewa kostum foto 15 menit"] }
  ],
  faq: [
    { q: "Bolehkah membawa kelinci peliharaan sendiri dari rumah?", a: "Mohon maaf, demi menjaga kesehatan dan menghindari penularan penyakit, pengunjung tidak diizinkan membawa hewan peliharaan dari luar." },
    { q: "Apakah ada batasan umur untuk pengunjung?", a: "Tidak ada batasan umur! Puff Bunny Valley sangat ramah anak dan cocok untuk semua kalangan usia." },
    { q: "Apakah boleh membawa makanan kelinci sendiri?", a: "Tidak diperbolehkan. Kami sudah menyediakan pakan khusus yang nutrisinya disesuaikan dengan kebutuhan kelinci kami." }
  ],
  testimonials: [
    { name: "Keluarga Ananda", rating: 5, text: "Anak-anak senang sekali bisa kasih makan kelinci langsung. Tempatnya bersih dan kelincinya terawat banget!" },
    { name: "Risa Amelia", rating: 5, text: "Healing banget liat yang berbulu lompat-lompat. Stafnya ramah dan edukatif ngejelasin jenis-jenis kelinci." },
    { name: "Bimo & Tasya", rating: 4, text: "Spot fotonya bagus-bagus. Saran aja kalau weekend datang lebih pagi biar ngga terlalu ramai." }
  ],
  galleryPhotos: [
    "./gallery-1.webp",
    "./gallery-2.webp",
    "./gallery-3.webp",
    "./gallery-4.webp",
    "./gallery-5.webp",
  ]
};

export default function App() {
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], currentIndex: 0 });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }));
  };

  const scrollToForm = () => {
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const date = formData.get('date');
    const pax = formData.get('pax');
    const packageType = formData.get('packageType');
    const notes = formData.get('notes');
    
    const text = `Halo Admin ${pageData.name}, saya ${name}. Saya ingin reservasi tiket untuk kunjungan:%0A%0ATanggal: ${date}%0AJumlah Orang: ${pax} Orang%0APaket: ${packageType}%0ACatatan: ${notes || '-'}`;
    const waUrl = `https://wa.me/${pageData.phone}?text=${text}`;
    window.open(waUrl, '_blank');
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleShare = async () => {
    const shareData = { title: pageData.name, text: pageData.title, url: window.location.href };
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try { await navigator.share(shareData); } catch (err) { console.error('Error sharing:', err); }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        
        body {
          background-color: #E8F4F8; /* Soft sky blue from image */
          color: #4A5D4E; /* Dark earthy green */
          margin: 0;
          font-family: 'Nunito', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .blob-shape {
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        }
      `}</style>
      
      <main className="w-full max-w-[480px] mx-auto relative shadow-2xl bg-[#E8F4F8] min-h-screen overflow-hidden pb-32">
        
        {}
        <section className="relative w-full min-h-[90dvh] flex flex-col justify-end pb-12 px-6">
          
          <button
            onClick={handleShare}
            className="absolute top-6 right-6 z-20 p-3 bg-white/30 backdrop-blur-md rounded-full border border-white/40 text-white hover:bg-white/40 transition-all shadow-sm"
          >
            <Share size={20} color="#fff" />
          </button>

          <div className="absolute inset-0 z-0 bg-[#A7D3A6]">
            <img 
              src={pageData.heroImg} 
              alt={pageData.name} 
              className="w-full h-[65%] object-cover object-top rounded-b-[3rem] shadow-sm"
            />
            {/* Soft gradient overlay for text readability */}
            <div className="absolute top-0 left-0 right-0 h-[65%] bg-gradient-to-t from-[#E8F4F8] via-transparent to-black/20 rounded-b-[3rem]"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center mt-32 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-[#BDE0B8] mx-2">
            <div className="w-24 h-24 p-1 bg-white mb-4 shadow-lg rounded-full -mt-16 border-4 border-[#78A962] overflow-hidden">
              <img 
                src={pageData.profileImg} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <h1 className="text-3xl font-black text-[#4A5D4E] mb-2 leading-tight drop-shadow-sm">
              {pageData.name}
            </h1>
            <p className="text-[#6D8A74] font-semibold text-[15px] mb-3">
              {pageData.title}
            </p>
            <p className="text-[#6D8A74] text-sm leading-relaxed mb-6">
              {pageData.description}
            </p>

            <div className="flex flex-col gap-3 w-full mb-6">
              <div className="flex gap-3 w-full">
                <a href={pageData.links.instagram} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-[#FFF0E5] text-[#FF9F43] hover:bg-[#FFE4D6] transition-all border border-[#FF9F43]/20">
                  <Instagram size={22} />
                  <span className="text-[10px] font-bold">Instagram</span>
                </a>
                <a href={pageData.links.tiktok} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-black/5 text-black hover:bg-black/10 transition-all border border-black/10">
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="text-[10px] font-bold">TikTok</span>
                </a>
              </div>
              <a href={pageData.links.maps} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#E6F4E6] text-[#60A561] hover:bg-[#D5EED5] transition-all border border-[#60A561]/20">
                <MapPin size={22} />
                <span className="text-[12px] font-bold">Petunjuk Arah Lokasi</span>
              </a>
            </div>

            <button 
              onClick={scrollToForm}
              className="group flex items-center justify-center gap-2 w-full py-4 bg-[#F29F58] text-white rounded-full font-bold text-[15px] shadow-[0_8px_20px_rgba(242,159,88,0.4)] hover:bg-[#E08A46] hover:-translate-y-1 transition-all border-2 border-[#E08A46]/20"
            >
              <Ticket size={20} />
              Pesan Tiket Sekarang
            </button>
          </div>
        </section>

        {}
        <section className="py-10 px-6">
          <div className="bg-[#F4F9EB] rounded-[2rem] p-6 shadow-sm border border-[#D5E8C9] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F4F8] rounded-bl-[100px] -z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Info className="text-[#78A962]" size={24} />
                <h2 className="text-xl font-extrabold text-[#4A5D4E]">Tentang Kami</h2>
              </div>
              <p className="text-[#6D8A74] text-sm leading-relaxed text-justify">
                {pageData.about}
              </p>
            </div>
          </div>
        </section>

        {}
        <section className="py-4 px-6 mb-8">
          <div className="border-l-4 border-[#F29F58] pl-5 py-2 bg-white/40 rounded-r-2xl border-y border-y-white/50">
            <div className="flex items-center gap-2 mb-2">
              <History className="text-[#F29F58]" size={20} />
              <h2 className="text-lg font-bold text-[#4A5D4E]">Cerita Kami</h2>
            </div>
            <p className="text-[#6D8A74] text-sm leading-relaxed italic">
              "{pageData.history}"
            </p>
          </div>
        </section>

        {}
        <section className="py-10 px-6 bg-white border-y border-[#D5E8C9]">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-extrabold text-[#4A5D4E] mb-2">Aktivitas Seru</h2>
            <p className="text-[#6D8A74] text-sm">Berbagai keseruan yang menantimu di Lembah Kelinci.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {pageData.catalog.map((item, idx) => (
              <div key={idx} className="bg-[#F4F9EB] p-4 rounded-3xl border border-[#D5E8C9] flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#78A962] shadow-sm border border-[#D5E8C9]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#4A5D4E] text-[14px] mb-1">{item.title}</h3>
                  <p className="text-[#6D8A74] text-[11px] leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mini Gallery inside Activities */}
          <div className="mt-8 flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 no-scrollbar">
            {pageData.galleryPhotos.map((img, idx) => (
              <div key={idx} onClick={() => openLightbox(pageData.galleryPhotos, idx)} className="snap-center shrink-0 w-[160px] aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm border-2 border-white">
                <img src={img} alt={`Keseruan ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="py-10 px-6 bg-[#E8F4F8]">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-[#4A5D4E] mb-2">Pilihan Tiket</h2>
            <p className="text-[#6D8A74] text-sm">Pilih paket kunjungan yang paling pas untukmu.</p>
          </div>

          <div className="flex flex-col gap-4">
            {pageData.pricing.map((pkg, idx) => (
              <div key={idx} className={`relative bg-white rounded-[2rem] p-6 shadow-sm border ${idx === 1 ? 'border-[#78A962] shadow-md bg-[#F4F9EB]' : 'border-[#D5E8C9]'}`}>
                {idx === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#78A962] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Paling Populer
                  </div>
                )}
                <div className="flex justify-between items-center mb-4 border-b border-[#D5E8C9] pb-4">
                  <h3 className="font-extrabold text-[#4A5D4E] text-lg">{pkg.name}</h3>
                  <span className="font-black text-[#F29F58] text-xl">{pkg.price}</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#6D8A74]">
                      <Check size={16} className="text-[#78A962] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="py-10 px-6">
          <div className="bg-[#4A5D4E] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
             
             <div className="flex items-center gap-2 mb-6 relative z-10">
              <MapPin className="text-[#F29F58]" size={24} />
              <h2 className="text-xl font-bold">Lokasi & Jam Buka</h2>
            </div>
            
            <div className="relative z-10 flex flex-col gap-4 text-sm text-slate-200">
              <p className="leading-relaxed">{pageData.address}</p>
              
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/5">
                <Clock size={20} className="text-[#F29F58]" />
                <div>
                  <p className="font-bold text-white">Senin - Minggu</p>
                  <p className="text-xs">08:00 - 17:00 WIB</p>
                </div>
              </div>
              
              <a href={pageData.links.maps} target="_blank" rel="noreferrer" className="text-center py-3 w-full bg-[#78A962] text-white font-bold rounded-xl mt-2 hover:bg-[#689454] transition-colors border-2 border-[#8AC071]/50">
                Buka di Google Maps
              </a>
            </div>
          </div>
        </section>

        {}
        <section className="py-8 px-6 bg-white border-y border-[#D5E8C9]">
          <div className="mb-6 flex items-center gap-2">
            <HelpCircle className="text-[#F29F58]" size={24} />
            <h2 className="text-xl font-extrabold text-[#4A5D4E]">Tanya Jawab (FAQ)</h2>
          </div>

          <div className="flex flex-col gap-3">
            {pageData.faq.map((item, idx) => (
              <div key={idx} className="border border-[#D5E8C9] rounded-2xl overflow-hidden bg-[#F4F9EB]/50">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-[#F4F9EB] transition-colors"
                >
                  <span className="font-bold text-[#4A5D4E] text-[14px] pr-4">{item.q}</span>
                  <ChevronDown size={20} className={`text-[#78A962] shrink-0 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 py-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-[#6D8A74] leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="py-10 px-6 bg-[#E8F4F8]">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-extrabold text-[#4A5D4E] mb-2">Kata Pengunjung</h2>
            <p className="text-[#6D8A74] text-sm">Lihat keseruan mereka yang sudah berkunjung ke Puff Bunny Valley.</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 no-scrollbar -mx-6 px-6">
            {pageData.testimonials.map((testi, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[280px] bg-white p-5 rounded-3xl border border-[#D5E8C9] shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#F29F58] text-[#F29F58]" />
                  ))}
                </div>
                <p className="text-[#6D8A74] text-sm leading-relaxed">"{testi.text}"</p>
                <div className="mt-auto pt-4 border-t border-[#D5E8C9] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F4F9EB] flex items-center justify-center text-[#78A962] font-bold text-lg border border-[#D5E8C9]">
                    {testi.name.charAt(0)}
                  </div>
                  <span className="text-[14px] font-bold text-[#4A5D4E]">{testi.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section id="booking-form" className="py-12 px-6">
          <div className="bg-[#78A962] rounded-[2rem] p-6 shadow-xl relative overflow-hidden border-2 border-[#8AC071]">
            {/* Pattern decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Leaf size={100} color="#fff" />
            </div>
            
            <div className="relative z-10 mb-6">
              <h2 className="text-2xl font-extrabold text-white mb-2">Pesan Tiketmu!</h2>
              <p className="text-[#E8F4F8] text-sm">Isi form di bawah untuk reservasi tiket via WhatsApp dengan admin kami.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 relative z-10 bg-[#F4F9EB] p-5 rounded-2xl shadow-sm border border-[#D5E8C9]">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#6D8A74]">Nama Lengkap</label>
                <input 
                  type="text" name="name" required placeholder="Cth: Budi Santoso"
                  className="w-full bg-white border border-[#D5E8C9] rounded-xl px-4 py-3 text-sm text-[#4A5D4E] focus:outline-none focus:border-[#78A962] focus:ring-1 focus:ring-[#78A962]"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 w-1/2">
                  <label className="text-[12px] font-bold text-[#6D8A74]">Rencana Tanggal</label>
                  <input 
                    type="date" name="date" required
                    className="w-full bg-white border border-[#D5E8C9] rounded-xl px-3 py-3 text-sm text-[#4A5D4E] focus:outline-none focus:border-[#78A962]"
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-1/2">
                  <label className="text-[12px] font-bold text-[#6D8A74]">Jumlah Orang</label>
                  <input 
                    type="number" name="pax" min="1" required placeholder="Cth: 2"
                    className="w-full bg-white border border-[#D5E8C9] rounded-xl px-3 py-3 text-sm text-[#4A5D4E] focus:outline-none focus:border-[#78A962]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#6D8A74]">Pilih Paket</label>
                <select 
                  name="packageType" required
                  className="w-full bg-white border border-[#D5E8C9] rounded-xl px-4 py-3 text-sm text-[#4A5D4E] focus:outline-none focus:border-[#78A962]"
                >
                  <option value="">-- Pilih Paket Tiket --</option>
                  <option value="Tiket Reguler">Tiket Reguler</option>
                  <option value="Paket Keluarga">Paket Keluarga</option>
                  <option value="VIP Explorer">VIP Explorer</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#6D8A74]">Catatan (Opsional)</label>
                <textarea 
                  name="notes" rows="2" placeholder="Ada request khusus?"
                  className="w-full bg-white border border-[#D5E8C9] rounded-xl px-4 py-3 text-sm text-[#4A5D4E] focus:outline-none focus:border-[#78A962] resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full mt-2 bg-[#F29F58] text-white font-bold text-[15px] py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#E08A46] transition-colors shadow-md border-2 border-[#E08A46]/20"
              >
                Kirim Pesan WhatsApp
                <MessageCircle size={18} />
              </button>
            </form>
          </div>
        </section>

        {}
        <footer className="pt-8 pb-12 text-center flex flex-col items-center justify-center mx-6">
          <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 p-1 overflow-hidden border-2 border-[#D5E8C9]">
            <img src={pageData.profileImg} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          
          <h3 className="font-extrabold text-[#4A5D4E] text-lg mb-1">{pageData.name}</h3>
          <p className="text-[#6D8A74] text-xs max-w-[250px] mb-6">{pageData.address}</p>

          <p className="text-slate-400 text-[11px] mb-2">
            © {new Date().getFullYear()} {pageData.name}. All rights reserved.
          </p>

          <a 
            href="https://www.solusilokal.id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#78A962] text-[10px] tracking-wide font-medium hover:text-[#4A5D4E] transition-colors hover:underline"
          >
            powered by solusilokal.id
          </a>
        </footer>

        {}
        <div 
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[432px] z-40 transition-all duration-500 ease-out ${
            showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
          }`}
        >
          <button 
            onClick={scrollToForm}
            className="w-full flex items-center justify-between px-6 py-4 bg-[#F29F58] backdrop-blur-xl rounded-full text-white shadow-[0_10px_30px_rgba(242,159,88,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/20"
          >
            <span className="font-bold text-[15px]">Pesan Tiket Kunjungan</span>
            <div className="bg-white/20 p-2 rounded-full">
              <Ticket size={20} />
            </div>
          </button>
        </div>

      </main>

      {/* LIGHTBOX MODAL */}
      {lightbox.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 z-50" onClick={closeLightbox}>
            <X size={24} />
          </button>
          {lightbox.images.length > 1 && (
            <button className="absolute left-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 z-50" onClick={prevImage}>
              <ChevronLeft size={28} />
            </button>
          )}
          <img src={lightbox.images[lightbox.currentIndex]} alt="View" className="max-w-full max-h-[80vh] object-contain" onClick={(e) => e.stopPropagation()} />
          {lightbox.images.length > 1 && (
            <button className="absolute right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 z-50" onClick={nextImage}>
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setShowShareModal(false)}>
          <div className="w-full max-w-[480px] bg-white rounded-t-[2rem] p-6 relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-800 font-bold text-lg">Bagikan ke Teman!</h3>
              <button onClick={() => setShowShareModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
               <div className="flex flex-col items-center gap-2">
                <button onClick={copyToClipboard} className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  {copied ? <Check size={24} className="text-green-500" /> : <Copy size={24} />}
                </button>
                <span className="text-[11px] font-bold text-slate-500">Salin</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => window.open(`https://wa.me/?text=${window.location.href}`)} className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageCircle size={24} className="fill-current" />
                </button>
                <span className="text-[11px] font-bold text-slate-500">WhatsApp</span>
              </div>
               <div className="flex flex-col items-center gap-2">
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`)} className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white">
                  <Twitter size={24} />
                </button>
                <span className="text-[11px] font-bold text-slate-500">Twitter X</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Simple internal component for FAQ chevron
function ChevronDown({ className, size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
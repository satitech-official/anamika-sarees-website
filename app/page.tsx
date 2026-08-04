"use client";

import {
  ArrowRight, ArrowUp, Bookmark, ChevronLeft, ChevronRight, Heart, Plus, MapPin,
  Menu, Phone, ScanSearch, Search, ShieldCheck, ShoppingBasket, Sparkles,
  Star, Truck, UserRound, X, ZoomIn
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const PHONE = "+919111985445";
const MAP = "https://share.google/yHHOGgfJ5vrBq3G6x";
const INSTAGRAM = "https://www.instagram.com/anamika__sarees?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const wa = (message: string) => `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(message)}`;

const heroSlides = [
  {
    eyebrow: "The Wedding Edit · 2026",
    title: "Timeless Elegance,",
    accent: "Woven for You.",
    copy: "Curated sarees and lehengas for weddings, festivities and the moments that become memories.",
    image: "/images/hero-v2/hero-festive.jpg",
    position: "center 34%",
  },
  {
    eyebrow: "The Anamika Bridal Atelier",
    title: "For the Day You’ll",
    accent: "Remember Forever.",
    copy: "A personal edit of regal weaves, exquisite embroidery and celebration-ready silhouettes.",
    image: "/images/hero-v2/hero-bride.jpg",
    position: "center 28%",
  },
  {
    eyebrow: "Tradition, Reimagined",
    title: "Heritage Craft.",
    accent: "Modern Grace.",
    copy: "From luminous silks to contemporary organza, discover a drape for every expression of you.",
    image: "/images/hero-v2/hero-saree.jpg",
    position: "center 30%",
  },
];

const lehengaCollection = [
  { id: "AL-301", name: "Maharani Red Bridal Lehenga", note: "Regal embroidery for the wedding day", fabric: "Embroidered Silk", price: 42900, badge: "Bridal Icon", image: "/images/hero-v2/lehenga-royal.jpg" },
  { id: "AL-302", name: "Zariya Wedding Lehenga", note: "Intricate details with a royal silhouette", fabric: "Silk Blend", price: 36900, badge: "Handcrafted", image: "/images/hero-v2/lehenga-zariya.jpg" },
  { id: "AL-303", name: "Meher Reception Lehenga", note: "Modern glamour for an unforgettable entrance", fabric: "Premium Net", price: 31900, badge: "Celebration Edit", image: "/images/hero-v2/lehenga-meher.jpg" },
  { id: "AL-304", name: "Noor Festive Lehenga", note: "A luminous look for sangeet and festivities", fabric: "Embroidered Georgette", price: 27900, badge: "New Arrival", image: "/images/hero-v2/lehenga-noor.jpg" },
];

const categories = [
  { name: "Banarasi", note: "Opulent zari, timeless grace", image: "/images/catalog-v2/banarasi.jpg" },
  { name: "Kanjivaram", note: "Heirloom silks for grand moments", image: "/images/catalog-v2/kanjivaram.jpg" },
  { name: "Organza", note: "Weightless, luminous, modern", image: "/images/catalog-v2/organza.jpg" },
  { name: "Bridal", note: "Made for your forever moment", image: "/images/catalog-v2/bridal.jpg" },
];

const products = [
  { id: "AS-101", name: "Royal Banarasi Bridal Saree", category: "Bridal Sarees", fabric: "Banarasi Silk", price: 18900, old: 22900, color: "Crimson", badge: "Bestseller", image: "/images/catalog-v2/royal-banarasi.jpg" },
  { id: "AS-114", name: "Gulmohar Designer Organza", category: "Designer Sarees", fabric: "Pure Organza", price: 8950, old: 10950, color: "Rose", badge: "New", image: "/images/catalog-v2/gulmohar-organza.jpg" },
  { id: "AS-126", name: "Noor Premium Silk Saree", category: "Festive Sarees", fabric: "Soft Silk", price: 12400, old: 14900, color: "Wine", badge: "Exclusive", image: "/images/catalog-v2/noor-silk.jpg" },
  { id: "AL-205", name: "Zariya Handcrafted Lehenga", category: "Bridal Lehengas", fabric: "Silk Velvet", price: 34900, old: 41900, color: "Maroon", badge: "Bridal", image: "/images/catalog-v2/zariya-lehenga.jpg" },
  { id: "AS-138", name: "Rani Kanjivaram Celebration", category: "Traditional Sarees", fabric: "Kanjivaram Silk", price: 21900, old: 24900, color: "Ruby", badge: "Heirloom", image: "/images/catalog-v2/rani-kanjivaram.jpg" },
  { id: "AS-142", name: "Aarna Festive Georgette", category: "Party Wear", fabric: "Georgette", price: 7450, old: 8950, color: "Plum", badge: "Just Arrived", image: "/images/catalog-v2/aarna-georgette-v2.jpg" },
];

const occasions = [
  ["The Bride", "A personal bridal curation", "/images/catalog-v2/occasion-bride.jpg"],
  ["Wedding Guest", "Polished elegance, beautifully easy", "/images/catalog-v2/occasion-wedding.jpg"],
  ["Festive Evenings", "Light-catching looks for every celebration", "/images/catalog-v2/occasion-festive.jpg"],
];

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [slide, setSlide] = useState(0);
  const [lehengaIndex, setLehengaIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [quick, setQuick] = useState<(typeof products)[0] | null>(null);
  const [notice, setNotice] = useState("");
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const ready = window.setTimeout(() => setLoading(false), 1450);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = window.setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6500);
    const lehengaTimer = window.setInterval(() => setLehengaIndex((s) => (s + 1) % lehengaCollection.length), 4800);
    return () => {
      window.clearTimeout(ready);
      window.clearInterval(timer);
      window.clearInterval(lehengaTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const visibleProducts = useMemo(() => products.filter((p) =>
    (filter === "All" || p.category.includes(filter)) &&
    `${p.name} ${p.category} ${p.fabric}`.toLowerCase().includes(query.toLowerCase())
  ), [filter, query]);

  const searchResults = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products.slice(0, 4);
    return products.filter((p) =>
      `${p.name} ${p.category} ${p.fabric} ${p.color} ${p.id}`.toLowerCase().includes(term)
    );
  }, [query]);

  const openSearchResult = (product: (typeof products)[0]) => {
    setQuick(product);
    setSearchOpen(false);
  };

  const toggleWishlist = (id: string) => setWishlist((list) => list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  const addCart = (id: string) => {
    setCart((list) => list.includes(id) ? list : [...list, id]);
    setNotice("Added to your WhatsApp enquiry bag");
    window.setTimeout(() => setNotice(""), 2200);
  };
  const cartMessage = `Hello Anamika Sarees, I would like details for:\n${products.filter((p) => cart.includes(p.id)).map((p) => `• ${p.name} (${p.id})`).join("\n")}\nPlease share available colours, additional images and shipping details.`;
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hello Anamika Sarees,\nName: ${form.get("name")}\nMobile: ${form.get("mobile")}\nCity: ${form.get("city")}\nInterested in: ${form.get("collection")}\nOccasion: ${form.get("occasion")}\nBudget: ${form.get("budget")}\nMessage: ${form.get("message")}`;
    setContactSent(true);
    window.open(wa(message), "_blank", "noopener,noreferrer");
    window.setTimeout(() => setContactSent(false), 5000);
  };

  return (
    <main>
      <div className={`site-loader ${loading ? "" : "loaded"}`} aria-hidden={!loading}>
        <div className="loader-mark"><span>अ</span><i /></div>
        <p>Anamika Sarees</p><small>Elegance is being woven</small>
      </div>
      <div className="announcement">Complimentary personal styling assistance <span /> Pan India shipping available</div>
      <header className={`header ${scrolled ? "compact" : ""}`}>
        <button className="icon-btn mobile-only" onClick={() => setMenu(true)} aria-label="Open menu"><Menu /></button>
        <a className="brand" href="#home"><small>इंदौर</small><strong>ANAMIKA</strong><em>SAREES</em></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#home">Home</a><a href="#collections">Sarees</a><a href="#lehengas">Lehengas</a>
          <a href="#bridal">Bridal</a><a href="#new">New Arrivals</a><a href="#story">Our Story</a><a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <button className={`icon-btn ${searchOpen ? "active" : ""}`} onClick={() => setSearchOpen(!searchOpen)} aria-label="Search collection"><ScanSearch /></button>
          <a className="icon-btn desktop-icon brand-icon" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <button className="icon-btn desktop-icon" onClick={() => wishlist.length ? document.querySelector("#new")?.scrollIntoView({ behavior: "smooth" }) : setNotice("Tap the bookmark on a saree to save it")} aria-label={`Saved pieces with ${wishlist.length} items`}><Bookmark fill={wishlist.length ? "currentColor" : "none"} /><b>{wishlist.length || ""}</b></button>
          <button className="icon-btn" onClick={() => cart.length ? window.open(wa(cartMessage), "_blank") : setNotice("Your enquiry bag is empty")} aria-label={`Enquiry basket with ${cart.length} items`}><ShoppingBasket /><b>{cart.length || ""}</b></button>
        </div>
        {searchOpen && <div className="search-panel">
          <div className="search-field"><ScanSearch /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Banarasi, bridal, silk, lehenga..." /><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button></div>
          <div className="search-results">
            <p>{query.trim() ? `${searchResults.length} matching pieces` : "Popular picks"}</p>
            {searchResults.map((product) => <button className="search-result" onClick={() => openSearchResult(product)} key={product.id}><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.category} · {product.fabric}</small></span><b>{money(product.price)}</b><ArrowRight /></button>)}
            {!searchResults.length && <div className="search-empty"><ScanSearch /><span><strong>No matching pieces found</strong>Try “bridal”, “silk”, “Banarasi” or “lehenga”.</span></div>}
          </div>
        </div>}
      </header>

      {menu && <div className="drawer">
        <button className="drawer-close" onClick={() => setMenu(false)} aria-label="Close menu"><X /></button>
        <div className="brand light"><small>इंदौर</small><strong>ANAMIKA</strong><em>SAREES</em></div>
        {["Home", "Sarees", "Lehengas", "Bridal Collection", "New Arrivals", "Lookbook", "Our Story", "Visit Us"].map((item) => <a key={item} onClick={() => setMenu(false)} href={`#${item.split(" ")[0].toLowerCase()}`}>{item}<ArrowRight /></a>)}
        <div className="drawer-social"><a href={`tel:${PHONE}`}><Phone /> Call</a><a href={wa("Hello Anamika Sarees, I would like to explore your latest collection.")} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a></div>
      </div>}

      <section id="home" className="hero">
        {heroSlides.map((item, index) => <div key={item.title} className={`hero-slide ${slide === index ? "active" : ""}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(25,4,12,.82), rgba(25,4,12,.08)), url("${item.image}")`, backgroundPosition: item.position }} />)}
        <div className="hero-content" key={slide}>
          <p className="eyebrow">{heroSlides[slide].eyebrow}</p>
          <h1>{heroSlides[slide].title}<br/><i>{heroSlides[slide].accent}</i></h1>
          <p className="hero-copy">{heroSlides[slide].copy}</p>
          <div className="hero-cta"><a className="btn gold" href="#collections">Explore the collection <ArrowRight /></a><a className="btn ghost" href={wa("Hello Anamika Sarees, I visited your website and would like to know more about your latest saree and lehenga collections.")} target="_blank" rel="noreferrer"><FaWhatsapp /> Shop on WhatsApp</a></div>
        </div>
        <div className="hero-controls"><button onClick={() => setSlide((slide + 2) % 3)} aria-label="Previous slide"><ChevronLeft /></button><span>0{slide + 1} <i /><small>03</small></span><button onClick={() => setSlide((slide + 1) % 3)} aria-label="Next slide"><ChevronRight /></button></div>
      </section>

      <div className="celebration-marquee" aria-label="Anamika collection highlights">
        <div>{[0, 1].map((copy) => <span key={copy}>Bridal Lehengas <b>✦</b> Wedding Sarees <b>✦</b> Festive Edits <b>✦</b> Pan India Shipping <b>✦</b> Personal Styling <b>✦</b></span>)}</div>
      </div>

      <div className="trust-bar">
        <div><Truck /><span><strong>Pan India Shipping</strong>Thoughtfully packed & delivered</span></div>
        <div><Sparkles /><span><strong>Curated Excellence</strong>Premium fabrics & craftsmanship</span></div>
        <div><UserRound /><span><strong>Personal Assistance</strong>Styling help, your way</span></div>
        <div><ShieldCheck /><span><strong>Trusted Store</strong>Visit us in Sitlamata Bazar</span></div>
      </div>

      <section id="collections" className="section collections">
        <div className="section-heading"><div><p className="eyebrow wine">The signature edit</p><h2>Find Your Perfect <i>Drape</i></h2></div><p>From storied handlooms to contemporary silhouettes, each piece is selected for the way it makes you feel.</p></div>
        <div className="category-grid">
          {categories.map((c, index) => <a href="#new" className={`category-card c${index}`} key={c.name}>
            <img src={c.image} alt={`${c.name} saree collection`} loading="lazy" />
            <div><small>0{index + 1}</small><h3>{c.name}</h3><p>{c.note}</p><span>Explore collection <ArrowRight /></span></div>
          </a>)}
        </div>
      </section>

      <section id="bridal" className="bridal-story">
        <div className="bridal-image"><img src="/images/hero-v2/hero-bride.jpg" alt="Indian bride in an intricately embroidered red lehenga" loading="lazy" /><span>Bridal<br/>Atelier</span></div>
        <div className="bridal-copy"><p className="eyebrow">Anamika bridal</p><h2>For the Day You Will <i>Remember Forever</i></h2><p>Discover carefully selected bridal sarees and lehengas that celebrate tradition, craftsmanship, and your unique style. Our team helps you find the one—not simply another outfit.</p><div className="signature">A personal appointment. A beautiful beginning.</div><div className="hero-cta"><a className="btn gold" href={wa("Hello Anamika Sarees, I would like to book a bridal consultation.")} target="_blank">Book bridal consultation <ArrowRight /></a><a className="text-link" href={MAP} target="_blank">Visit our Indore store</a></div></div>
      </section>

      <section id="lehengas" className="lehenga-showcase">
        <div className="lehenga-visual">
          {lehengaCollection.map((item, index) => <img className={index === lehengaIndex ? "active" : ""} key={item.id} src={item.image} alt={item.name} loading="lazy" />)}
          <div className="lehenga-badge">{lehengaCollection[lehengaIndex].badge}</div>
          <div className="lehenga-arrows"><button onClick={() => setLehengaIndex((lehengaIndex + lehengaCollection.length - 1) % lehengaCollection.length)} aria-label="Previous lehenga"><ChevronLeft /></button><button onClick={() => setLehengaIndex((lehengaIndex + 1) % lehengaCollection.length)} aria-label="Next lehenga"><ChevronRight /></button></div>
        </div>
        <div className="lehenga-copy">
          <p className="eyebrow wine">The bridal lehenga edit</p>
          <h2>Made for Your <i>Grand Entrance</i></h2>
          <div className="lehenga-tabs">
            {lehengaCollection.map((item, index) => <button className={index === lehengaIndex ? "active" : ""} onClick={() => setLehengaIndex(index)} key={item.id}><small>0{index + 1}</small><span><strong>{item.name}</strong>{item.note}</span></button>)}
          </div>
          <div className="lehenga-detail"><span>{lehengaCollection[lehengaIndex].fabric}</span><strong>{money(lehengaCollection[lehengaIndex].price)}</strong></div>
          <a className="btn gold" href={wa(`Hello Anamika Sarees, I am interested in ${lehengaCollection[lehengaIndex].name} (${lehengaCollection[lehengaIndex].id}). Please share colours, close-up images and availability.`)} target="_blank" rel="noreferrer"><FaWhatsapp /> Enquire about this lehenga</a>
        </div>
      </section>

      <div className="celebration-marquee reverse" aria-hidden="true">
        <div>{[0, 1].map((copy) => <span key={copy}>Shaadi Season <b>✦</b> Mehendi Magic <b>✦</b> Sangeet Sparkle <b>✦</b> Reception Glam <b>✦</b> Bridal Dreams <b>✦</b></span>)}</div>
      </div>

      <section id="new" className="section product-section">
        <div className="section-heading"><div><p className="eyebrow wine">Curated for you</p><h2>New & <i>Noteworthy</i></h2></div><p>Celebration pieces chosen for exceptional fabric, flattering drape and unforgettable detail.</p></div>
        <div className="shop-toolbar">
          <div className="filters">{["All", "Bridal", "Designer", "Festive", "Traditional"].map((f) => <button className={filter === f ? "active" : ""} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div>
          <label><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search collection" /></label>
        </div>
        <div className="product-grid">
          {visibleProducts.map((p) => <article className="product-card" key={p.id}>
            <div className="product-image"><img src={p.image} alt={p.name} loading="lazy" /><span className="badge">{p.badge}</span><button className={`wish ${wishlist.includes(p.id) ? "active" : ""}`} onClick={() => toggleWishlist(p.id)} aria-label={`Add ${p.name} to wishlist`}><Heart fill={wishlist.includes(p.id) ? "currentColor" : "none"} /></button><button className="quick" onClick={() => setQuick(p)}><ZoomIn /> Quick view</button></div>
            <p className="product-cat">{p.category} · {p.fabric}</p><h3>{p.name}</h3>
            <div className="price"><strong>{money(p.price)}</strong><s>{money(p.old)}</s><span>{Math.round((1-p.price/p.old)*100)}% off</span></div>
            <div className="swatch"><i style={{background: p.color === "Rose" ? "#b6787d" : p.color === "Plum" ? "#57314f" : "#721c30"}} /> {p.color}</div>
            <div className="product-actions"><button onClick={() => addCart(p.id)}><Plus /> Add to enquiry</button><a href={wa(`Hello Anamika Sarees, I am interested in the ${p.name} (${p.id}). Please share available colours, additional images and shipping details.`)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${p.name} on WhatsApp`}><FaWhatsapp /></a></div>
          </article>)}
        </div>
        {!visibleProducts.length && <div className="empty">No pieces match your search. Try another collection or clear the search.</div>}
      </section>

      <section id="occasion" className="occasion-section">
        <div className="center-heading"><p className="eyebrow">Dressed for the moment</p><h2>Shop by <i>Occasion</i></h2></div>
        <div className="occasion-grid">{occasions.map(([name, note, image]) => <a href="#new" key={name} className="occasion-card"><img src={image} alt={`${name} ethnic wear`} loading="lazy" /><div><h3>{name}</h3><p>{note}</p><span>Discover the edit <ArrowRight /></span></div></a>)}</div>
      </section>

      <section id="story" className="craft">
        <div><p className="eyebrow">The Anamika promise</p><h2>Where Every Drape Tells a <i>Beautiful Story</i></h2><p>Anamika Sarees is an Indore destination for premium bridal, wedding and festive fashion. We bring together rich textiles, fine details and warm personal assistance so your shopping experience feels as special as your celebration.</p><a className="text-link light-link" href={wa("Hello Anamika Sarees, please help me choose an outfit for my occasion.")} target="_blank">Speak to a stylist <ArrowRight /></a></div>
        <div className="craft-points"><span><b>01</b> Carefully selected sarees & lehengas</span><span><b>02</b> Personal shopping assistance</span><span><b>03</b> Every occasion, from intimate to grand</span><span><b>04</b> Pan India shipping</span></div>
      </section>

      <section id="lookbook" className="section instagram-section">
        <div className="section-heading"><div><p className="eyebrow wine">From our style journal</p><h2>Follow the <i>Celebration</i></h2></div><a className="insta-link" href={INSTAGRAM} target="_blank" rel="noreferrer"><FaInstagram /> @anamika__sarees <ArrowRight /></a></div>
        <div className="insta-grid">{[
          "/images/catalog-v2/journal-one.jpg","/images/catalog-v2/journal-two.jpg","/images/catalog-v2/journal-three.jpg","/images/catalog-v2/journal-four.jpg"
        ].map((image, i) => <a key={image} href={INSTAGRAM} target="_blank" rel="noreferrer"><img src={image} alt={`Anamika style inspiration ${i + 1}`} loading="lazy" /><span><FaInstagram /> View on Instagram</span></a>)}</div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-intro">
          <p className="eyebrow">Contact & store visit</p>
          <h2>Let us curate something <i>beautiful for you.</i></h2>
          <p>Share a few details and continue directly with our team on WhatsApp. We’ll help with styles, colours, budgets, availability and Pan India delivery.</p>
          <div className="contact-cards">
            <a href={`tel:${PHONE}`}><Phone /><span><small>Call our store</small>+91 91119 85445</span></a>
            <a href={wa("Hello Anamika Sarees, I need shopping assistance.")} target="_blank" rel="noreferrer"><FaWhatsapp /><span><small>Chat instantly</small>WhatsApp assistance</span></a>
            <a href={MAP} target="_blank" rel="noreferrer"><MapPin /><span><small>Visit us</small>Sitlamata Bazar, Indore</span></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitContact}>
          <div><label>Your name<input name="name" required placeholder="Enter your name" /></label><label>Mobile number<input name="mobile" required pattern="[0-9+\s-]{10,15}" placeholder="+91 98765 43210" /></label></div>
          <div><label>City<input name="city" required placeholder="Your city" /></label><label>Interested in<select name="collection" required defaultValue=""><option value="" disabled>Select collection</option><option>Sarees</option><option>Lehengas</option><option>Bridal shopping</option><option>Festive wear</option><option>Store visit</option></select></label></div>
          <div><label>Occasion<input name="occasion" placeholder="Wedding, reception, festival…" /></label><label>Approx. budget<select name="budget" defaultValue=""><option value="">Select budget</option><option>Under ₹10,000</option><option>₹10,000 – ₹25,000</option><option>₹25,000 – ₹50,000</option><option>₹50,000+</option></select></label></div>
          <label>Tell us what you’re looking for<textarea name="message" rows={4} placeholder="Preferred colour, fabric, date or any special requirement…" /></label>
          <button className="btn gold" type="submit"><FaWhatsapp /> {contactSent ? "Opening WhatsApp…" : "Send enquiry on WhatsApp"} <ArrowRight /></button>
          <small>By submitting, your entered details are used only to prepare your WhatsApp enquiry.</small>
        </form>
      </section>

      <section id="visit" className="map-section">
        <div className="map-frame"><iframe title="Anamika Sarees store location in Indore" src="https://www.google.com/maps?q=16%2F1%2C%20Sitlamata%20Bazar%20Main%20Road%2C%20Indore%2C%20Madhya%20Pradesh&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        <div className="map-copy"><p className="eyebrow wine">Anamika Sarees · Indore</p><h2>Come, experience the collection <i>in person.</i></h2><p><MapPin />16/1, Sitlamata Bazar Main Road, Indore, Madhya Pradesh, India</p><div className="store-notes"><span><strong>Store assistance</strong>Personal styling & bridal curation</span><span><strong>Shipping</strong>Available across India</span></div><div className="hero-cta"><a className="btn gold" href={MAP} target="_blank" rel="noreferrer"><MapPin /> Open in Google Maps</a><a className="btn wine-outline" href={`tel:${PHONE}`}><Phone /> Call before visiting</a></div></div>
      </section>

      <footer>
        <div className="footer-brand"><div className="brand light"><small>इंदौर</small><strong>ANAMIKA</strong><em>SAREES</em></div><p>Premium sarees and lehengas with Pan India shipping.</p><div><a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a><a href={wa("Hello Anamika Sarees, I would like to know more about your collection.")} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a><span className="disabled-social" title="Facebook link will be added when provided" aria-label="Facebook coming soon"><FaFacebookF /></span><a href={`tel:${PHONE}`} aria-label="Call"><Phone /></a></div></div>
        <div><h4>Collections</h4><a href="#collections">Bridal Sarees</a><a href="#collections">Designer Sarees</a><a href="#lehengas">Wedding Lehengas</a><a href="#new">New Arrivals</a></div>
        <div><h4>Customer Care</h4><a href="#visit">Shipping information</a><a href="#visit">Frequently asked questions</a><a href="#visit">Contact & location</a><a href="#story">About Anamika</a></div>
        <div><h4>Connect</h4><a href={`tel:${PHONE}`}>+91 91119 85445</a><a href={MAP} target="_blank">Sitlamata Bazar, Indore</a><a href={INSTAGRAM} target="_blank">@anamika__sarees</a></div>
        <div className="copyright">© 2026 Anamika Sarees. All rights reserved.<span>Elegance Woven for Every Celebration.</span></div>
      </footer>

      <a className="floating-wa" href={wa("Hello Anamika Sarees, I visited your website and would like to know more about your latest saree and lehenga collections.")} target="_blank" rel="noreferrer" aria-label="Chat with Anamika Sarees"><FaWhatsapp /><span>Chat with us</span></a>
      <button className={`back-to-top ${scrolled ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp /></button>
      <div className="mobile-bar"><a href={`tel:${PHONE}`}><Phone />Call</a><a href={wa("Hello Anamika Sarees, I would like to know more about your collection.")} target="_blank" rel="noreferrer"><FaWhatsapp />WhatsApp</a><a href={MAP} target="_blank" rel="noreferrer"><MapPin />Directions</a><a href={INSTAGRAM} target="_blank" rel="noreferrer"><FaInstagram />Instagram</a></div>
      {notice && <div className="toast">{notice}</div>}

      {quick && <div className="modal-backdrop" onClick={() => setQuick(null)}>
        <div className="quick-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setQuick(null)} aria-label="Close quick view"><X /></button><img src={quick.image} alt={quick.name}/><div><p className="eyebrow wine">{quick.category}</p><h2>{quick.name}</h2><p>{quick.fabric} · {quick.color}</p><div className="price large"><strong>{money(quick.price)}</strong><s>{money(quick.old)}</s></div><p className="detail-copy">An occasion-ready piece selected for its elegant drape, refined finish and timeless appeal. Contact our team for colour options, blouse details and close-up images.</p><a className="btn gold" href={wa(`Hello Anamika Sarees, I am interested in ${quick.name} (${quick.id}). Please share price, colours, additional images and shipping details.`)} target="_blank" rel="noreferrer"><FaWhatsapp /> Enquire on WhatsApp</a></div></div>
      </div>}
    </main>
  );
}
